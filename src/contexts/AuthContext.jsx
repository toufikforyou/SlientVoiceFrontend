// Authentication Context for Silent Voices
import { createContext, useContext, useState, useEffect, useRef } from 'react'
import FirebaseAuthService from '../services/firebaseAuth'
import BackendAuthService from '../services/backendAuth'
import { sessionManager } from '../utils/sessionManager'
import CrossTabSync from '../utils/crossTabSync'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Create CrossTabSync for cross-tab communication
  const syncRef = useRef(null)

  // Initialize authentication state and setup cross-tab sync
  useEffect(() => {
    const initAuth = () => {
      // Check if user is authenticated in session
      const userData = sessionManager.getUserData()
      const token = sessionManager.get('silent_voices_auth_token')
      
      if (userData.id && token) {
        setUser(userData)
        setIsAuthenticated(true)
      }
      
      setLoading(false)
    }

    // Setup cross-tab synchronization
    const sync = new CrossTabSync()
    syncRef.current = sync
    
    const handleAuthUpdate = (data) => {
      const { type, userData, token } = data
      
      switch (type) {
        case 'LOGIN': {
          if (userData && token) {
            setUser(userData)
            setIsAuthenticated(true)
            // Also update sessionStorage in case it's out of sync
            sessionManager.setUserData(userData)
            sessionManager.set('silent_voices_auth_token', token)
          }
          break
        }
        case 'LOGOUT': {
          setUser(null)
          setIsAuthenticated(false)
          // Clear local sessionStorage
          sessionManager.clearAll()
          break
        }
        case 'SYNC_REQUEST': {
          // Another tab is requesting current auth state
          const currentUserData = sessionManager.getUserData()
          const currentToken = sessionManager.get('silent_voices_auth_token')
          if (currentUserData.id && currentToken) {
            sync.sendAuthState(currentUserData, currentToken)
          }
          break
        }
        case 'SYNC_RESPONSE': {
          // Received auth state from another tab
          const currentUserData = sessionManager.getUserData()
          if (userData && token && !currentUserData.id) {
            setUser(userData)
            setIsAuthenticated(true)
            sessionManager.setUserData(userData)
            sessionManager.set('silent_voices_auth_token', token)
          }
          break
        }
      }
    }

    const removeListener = sync.addListener(handleAuthUpdate)

    // Listen to Firebase auth state changes
    const unsubscribe = FirebaseAuthService.onAuthStateChange((firebaseUser) => {
      if (!firebaseUser) {
        // Firebase user logged out, clear session and notify other tabs
        handleLogout()
        sync.broadcastLogout()
      }
    })

    initAuth()
    
    // Request sync from other tabs in case this is a new tab
    setTimeout(() => {
      sync.requestSync()
    }, 100)
    
    return () => {
      unsubscribe()
      removeListener()
      sync.close()
    }
  }, [])

  const login = async (firebaseUser) => {
    try {
      setLoading(true)
      
      // Authenticate with backend
      const result = await BackendAuthService.completeAuthFlow(firebaseUser)
      
      if (result.success) {
        const { backend } = result.data
        setUser(backend.user)
        setIsAuthenticated(true)
        
        // Notify other tabs about successful login
        if (syncRef.current) {
          syncRef.current.broadcastLogin(
            backend.user,
            sessionManager.get('silent_voices_auth_token')
          )
        }
        
        return { success: true, data: result.data }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      
      // Sign out from Firebase
      await FirebaseAuthService.signOut()
      
      // Clear backend session
      await BackendAuthService.logout()
      
      // Clear local state
      setUser(null)
      setIsAuthenticated(false)
      
      // Notify other tabs about logout
      if (syncRef.current) {
        syncRef.current.broadcastLogout()
      }
      
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, error: 'Logout failed' }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    BackendAuthService.logout()
    setUser(null)
    setIsAuthenticated(false)
    
    // Notify other tabs about logout
    if (syncRef.current) {
      syncRef.current.broadcastLogout()
    }
  }

  const refreshUserData = () => {
    const userData = sessionManager.getUserData()
    if (userData.id) {
      setUser(userData)
      setIsAuthenticated(true)
    } else {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    refreshUserData
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext