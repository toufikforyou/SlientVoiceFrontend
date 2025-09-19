/**
 * Authentication token and user data management utility using sessionStorage
 */

const TOKEN_KEY = 'silent_voices_auth_token'
const USER_DATA_KEY = 'silent_voices_user_data'

export const authToken = {
  // Get token from sessionStorage
  get: () => {
    try {
      return sessionStorage.getItem(TOKEN_KEY)
    } catch (error) {
      console.error('Error getting auth token from sessionStorage:', error)
      return null
    }
  },

  // Set token in sessionStorage
  set: (token) => {
    try {
      if (token) {
        sessionStorage.setItem(TOKEN_KEY, token)
      } else {
        sessionStorage.removeItem(TOKEN_KEY)
      }
    } catch (error) {
      console.error('Error setting auth token in sessionStorage:', error)
    }
  },

  // Remove token from sessionStorage
  remove: () => {
    try {
      sessionStorage.removeItem(TOKEN_KEY)
    } catch (error) {
      console.error('Error removing auth token from sessionStorage:', error)
    }
  },

  // Check if token exists in sessionStorage
  exists: () => {
    return Boolean(authToken.get())
  },

  // Generate a placeholder token for development
  generatePlaceholder: () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },

  // Clear session data (useful for logout)
  clearSession: () => {
    try {
      sessionStorage.clear()
      console.log('Session storage cleared')
    } catch (error) {
      console.error('Error clearing session storage:', error)
    }
  }
}

// Convenience exports for direct token access
export const setToken = authToken.set
export const getToken = authToken.get
export const removeToken = authToken.remove

// User data management functions
export const setUserData = (userData) => {
  try {
    sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
  } catch (error) {
    console.error('Error setting user data:', error)
  }
}

export const getUserData = () => {
  try {
    const userData = sessionStorage.getItem(USER_DATA_KEY)
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error('Error getting user data:', error)
    return null
  }
}

export const clearUserData = () => {
  try {
    sessionStorage.removeItem(USER_DATA_KEY)
  } catch (error) {
    console.error('Error clearing user data:', error)
  }
}

export default authToken