// Cross-tab synchronization utility for authentication state
// Provides fallback for browsers without BroadcastChannel support

export class CrossTabSync {
  constructor() {
    this.listeners = new Set()
    this.channel = null
    this.fallbackKey = 'silent_voices_auth_sync'
    
    // Try to use BroadcastChannel first
    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel('auth-sync-channel')
      this.channel.addEventListener('message', this.handleChannelMessage.bind(this))
    } else {
      // Fallback to localStorage events
      window.addEventListener('storage', this.handleStorageEvent.bind(this))
    }
  }

  handleChannelMessage(event) {
    this.notifyListeners(event.data)
  }

  handleStorageEvent(event) {
    if (event.key === this.fallbackKey && event.newValue) {
      try {
        const data = JSON.parse(event.newValue)
        this.notifyListeners(data)
        
        // Clean up immediately to avoid conflicts
        setTimeout(() => {
          localStorage.removeItem(this.fallbackKey)
        }, 100)
      } catch (error) {
        console.error('Error parsing sync data:', error)
      }
    }
  }

  notifyListeners(data) {
    this.listeners.forEach(listener => {
      try {
        listener(data)
      } catch (error) {
        console.error('Error in sync listener:', error)
      }
    })
  }

  postMessage(data) {
    if (this.channel) {
      // Use BroadcastChannel
      this.channel.postMessage(data)
    } else {
      // Use localStorage fallback
      try {
        localStorage.setItem(this.fallbackKey, JSON.stringify({
          ...data,
          timestamp: Date.now()
        }))
      } catch (error) {
        console.error('Error posting sync message:', error)
      }
    }
  }

  addListener(listener) {
    this.listeners.add(listener)
    
    return () => {
      this.listeners.delete(listener)
    }
  }

  close() {
    if (this.channel) {
      this.channel.removeEventListener('message', this.handleChannelMessage)
      this.channel.close()
    } else {
      window.removeEventListener('storage', this.handleStorageEvent)
    }
    this.listeners.clear()
  }

  // Request sync from other tabs
  requestSync() {
    this.postMessage({ type: 'SYNC_REQUEST' })
  }

  // Send current auth state to requesting tabs
  sendAuthState(userData, token) {
    this.postMessage({
      type: 'SYNC_RESPONSE',
      userData,
      token
    })
  }

  // Broadcast login event
  broadcastLogin(userData, token) {
    this.postMessage({
      type: 'LOGIN',
      userData,
      token
    })
  }

  // Broadcast logout event
  broadcastLogout() {
    this.postMessage({
      type: 'LOGOUT'
    })
  }
}

export default CrossTabSync