// Firebase Authentication Service for Silent Voices
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'

export class FirebaseAuthService {
  // Sign in with Google
  static async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      return {
        success: false,
        error: error.message || 'Failed to sign in with Google'
      }
    }
  }

  // Sign out
  static async signOut() {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      console.error('Sign-out error:', error)
      return {
        success: false,
        error: error.message || 'Failed to sign out'
      }
    }
  }

  // Get current user
  static getCurrentUser() {
    return auth.currentUser
  }

  // Listen to authentication state changes
  static onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback)
  }

  // Get Firebase ID Token for API authentication
  static async getIdToken() {
    try {
      const user = auth.currentUser
      if (user) {
        const token = await user.getIdToken()
        return { success: true, token }
      }
      return { success: false, error: 'No user logged in' }
    } catch (error) {
      console.error('Error getting ID token:', error)
      return { success: false, error: error.message }
    }
  }

  // Check if user is authenticated
  static isAuthenticated() {
    return auth.currentUser !== null
  }
}

export default FirebaseAuthService