/**
 * Session management utility for Silent Voices application
 * Uses sessionStorage instead of localStorage for temporary session data
 */

// Session keys
const SESSION_KEYS = {
  AUTH_TOKEN: 'silent_voices_auth_token',
  USER_DATA: 'silent_voices_user_data',
  PREFERENCES: 'silent_voices_preferences',
  DRAFT_POST: 'silent_voices_draft_post'
}

export const sessionManager = {
  // Generic session storage methods
  set: (key, value) => {
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value)
      sessionStorage.setItem(key, serializedValue)
    } catch (error) {
      console.error('Error setting session data:', error)
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const value = sessionStorage.getItem(key)
      if (value === null) return defaultValue
      
      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    } catch (error) {
      console.error('Error getting session data:', error)
      return defaultValue
    }
  },

  remove: (key) => {
    try {
      sessionStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing session data:', error)
    }
  },

  // Specific methods for app data
  setUserData: (userData) => {
    sessionManager.set(SESSION_KEYS.USER_DATA, userData)
  },

  getUserData: () => {
    return sessionManager.get(SESSION_KEYS.USER_DATA, {})
  },

  setPreferences: (preferences) => {
    sessionManager.set(SESSION_KEYS.PREFERENCES, preferences)
  },

  getPreferences: () => {
    return sessionManager.get(SESSION_KEYS.PREFERENCES, {})
  },

  // Draft post management (for unsaved posts)
  saveDraftPost: (postData) => {
    sessionManager.set(SESSION_KEYS.DRAFT_POST, {
      ...postData,
      timestamp: new Date().toISOString()
    })
  },

  getDraftPost: () => {
    return sessionManager.get(SESSION_KEYS.DRAFT_POST, null)
  },

  clearDraftPost: () => {
    sessionManager.remove(SESSION_KEYS.DRAFT_POST)
  },

  // Session utilities
  clearAll: () => {
    try {
      sessionStorage.clear()
      console.log('All session data cleared')
    } catch (error) {
      console.error('Error clearing session storage:', error)
    }
  },

  getStorageInfo: () => {
    try {
      const keys = Object.keys(sessionStorage)
      const data = {}
      keys.forEach(key => {
        data[key] = sessionStorage.getItem(key)?.length || 0
      })
      return {
        totalKeys: keys.length,
        keyDetails: data,
        approximateSize: JSON.stringify(data).length
      }
    } catch (error) {
      console.error('Error getting storage info:', error)
      return null
    }
  },

  // Check if session storage is available
  isAvailable: () => {
    try {
      const testKey = '__session_test__'
      sessionStorage.setItem(testKey, 'test')
      sessionStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  }
}

// Export session keys for use in other modules
export { SESSION_KEYS }

export default sessionManager