// Backend Authentication API Service
import axiosPublic from '../api/axiosPublic'
import { setToken, setUserData } from '../utils/authToken'
import { sessionManager } from '../utils/sessionManager'

export class BackendAuthService {
  /**
   * Authenticate user with backend using Firebase UID
   * @param {string} uid - Firebase user UID
   * @returns {Promise<Object>} Response object with success status and data
   */
  static async authenticateWithBackend(uid) {
    try {
      const response = await axiosPublic.post('/auth', {
        uid: uid
      })

      if (response.data.success) {
        const { token, username, _id, createdAt, updatedAt } = response.data.data
        
        // Save token to session storage
        setToken(token)
        
        // Save user data to session storage
        const userData = {
          id: _id,
          uid: uid,
          username: username,
          createdAt: createdAt,
          updatedAt: updatedAt
        }
        
        setUserData(userData)
        
        // Also save using session manager for additional functionality
        sessionManager.setUserData(userData)
        
        return {
          success: true,
          data: {
            token,
            user: userData
          },
          message: response.data.message
        }
      } else {
        return {
          success: false,
          error: response.data.message || 'Authentication failed'
        }
      }
    } catch (error) {
      console.error('Backend authentication error:', error)
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with an error status
        const errorMessage = error.response.data?.message || 'Server error during authentication'
        return {
          success: false,
          error: errorMessage,
          statusCode: error.response.status
        }
      } else if (error.request) {
        // Network error
        return {
          success: false,
          error: 'Network error. Please check your internet connection.',
          networkError: true
        }
      } else {
        // Other error
        return {
          success: false,
          error: error.message || 'An unexpected error occurred'
        }
      }
    }
  }

  /**
   * Complete authentication flow: Firebase login + Backend authentication
   * @param {Object} firebaseUser - Firebase user object
   * @returns {Promise<Object>} Complete authentication result
   */
  static async completeAuthFlow(firebaseUser) {
    try {
      // Authenticate with backend using Firebase UID
      const backendResult = await this.authenticateWithBackend(firebaseUser.uid)
      
      if (backendResult.success) {
        // Merge Firebase user data with backend user data
        const enhancedUserData = {
          ...backendResult.data.user,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL
        }
        
        // Update session storage with enhanced user data
        setUserData(enhancedUserData)
        sessionManager.setUserData(enhancedUserData)
        
        return {
          success: true,
          data: {
            firebase: firebaseUser,
            backend: {
              ...backendResult.data,
              user: enhancedUserData
            }
          },
          message: 'Authentication successful'
        }
      } else {
        return backendResult
      }
    } catch (error) {
      console.error('Complete auth flow error:', error)
      return {
        success: false,
        error: 'Failed to complete authentication process'
      }
    }
  }

  /**
   * Logout user and clear all session data
   * @returns {Promise<Object>} Logout result
   */
  static async logout() {
    try {
      // Clear all session data
      sessionManager.clearAll()
      
      return {
        success: true,
        message: 'Logged out successfully'
      }
    } catch (error) {
      console.error('Logout error:', error)
      return {
        success: false,
        error: 'Failed to logout properly'
      }
    }
  }

  /**
   * Check if user is authenticated (has valid token and user data)
   * @returns {boolean} Authentication status
   */
  static isAuthenticated() {
    const userData = sessionManager.getUserData()
    const token = sessionManager.get('silent_voices_auth_token')
    
    return !!(userData.id && token)
  }

  /**
   * Get current authenticated user data
   * @returns {Object|null} User data or null if not authenticated
   */
  static getCurrentUser() {
    if (this.isAuthenticated()) {
      return sessionManager.getUserData()
    }
    return null
  }
}

export default BackendAuthService