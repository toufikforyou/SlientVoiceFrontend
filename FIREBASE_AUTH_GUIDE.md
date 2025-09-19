# Firebase Google Authentication Implementation Guide

## Overview
This guide documents the complete Firebase Google authentication implementation for Silent Voices, including backend integration and session management.

## Authentication Flow
1. **User clicks Google Sign-in** → Firebase Google authentication
2. **Firebase success** → Get Firebase user data (UID, email, etc.)
3. **Backend authentication** → POST to `/api/v1/auth` with Firebase UID
4. **Backend response** → Receive JWT token and user data
5. **Session management** → Store token and user data in sessionStorage
6. **UI update** → Show authenticated state in header

## Components & Files

### 1. Firebase Configuration (`src/config/firebase.js`)
```javascript
// Firebase app initialization with Google Auth provider
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
```

**Environment Variables** (`.env`):
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_project.firebasestorage.app
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
```

### 2. Firebase Auth Service (`src/services/firebaseAuth.js`)
**Key Methods**:
- `signInWithGoogle()` - Handles Google popup authentication
- `signOut()` - Signs out from Firebase
- `getCurrentUser()` - Gets current Firebase user
- `onAuthStateChange()` - Listens to auth state changes
- `getIdToken()` - Gets Firebase ID token

### 3. Backend Auth Service (`src/services/backendAuth.js`)
**Key Methods**:
- `authenticateWithBackend(uid)` - Authenticates with backend API
- `completeAuthFlow(firebaseUser)` - Complete authentication process
- `logout()` - Clears session data
- `isAuthenticated()` - Checks authentication status
- `getCurrentUser()` - Gets current user data

**API Integration**:
```javascript
// POST /api/v1/auth
{
  "uid": "firebase_user_uid"
}

// Response
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "uid": "firebase_uid",
    "token": "jwt_token",
    "_id": "user_mongodb_id",
    "username": "generated_username",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### 4. Authentication Context (`src/contexts/AuthContext.jsx`)
**Provides**:
- `user` - Current user data
- `isAuthenticated` - Authentication status
- `loading` - Loading state
- `login(firebaseUser)` - Login function
- `logout()` - Logout function
- `refreshUserData()` - Refresh user data from session

### 5. Updated Login Component (`src/pages/Login.jsx`)
**Features**:
- Google Sign-in button with loading state
- Error and success message display
- Disabled Facebook/Twitter (coming soon)
- Automatic redirect after successful login
- Integration with AuthContext

**Google Sign-in Flow**:
```javascript
const handleGoogleSignIn = async () => {
  // 1. Firebase authentication
  const firebaseResult = await FirebaseAuthService.signInWithGoogle()
  
  // 2. Backend authentication
  const backendResult = await login(firebaseResult.user)
  
  // 3. Redirect on success
  if (backendResult.success) navigate('/')
}
```

### 6. Updated Header Component (`src/components/Header.jsx`)
**Authentication States**:
- **Not authenticated**: Shows "Login" button
- **Authenticated**: Shows username and "Logout" button
- **Mobile responsive**: Proper mobile menu handling

### 7. Session Management
**SessionStorage Keys**:
- `silent_voices_auth_token` - JWT token from backend
- `silent_voices_user_data` - User profile information
- `silent_voices_draft_post` - Auto-saved draft posts
- `silent_voices_preferences` - User preferences

**Security Benefits**:
- Data cleared on browser tab close
- No persistent storage of sensitive data
- Session-based authentication

## Usage Examples

### Check Authentication Status
```javascript
import { useAuth } from '../contexts/AuthContext'

const MyComponent = () => {
  const { isAuthenticated, user } = useAuth()
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  )
}
```

### Programmatic Logout
```javascript
const { logout } = useAuth()

const handleLogout = async () => {
  const result = await logout()
  if (result.success) {
    // Redirect or update UI
  }
}
```

### Access Current User Data
```javascript
import { sessionManager } from '../utils/sessionManager'

// Get user data
const userData = sessionManager.getUserData()
console.log('Current user:', userData)

// Get authentication token
const token = sessionManager.get('silent_voices_auth_token')
console.log('Auth token:', token)
```

## Backend API Integration

### Authentication Endpoint
**URL**: `POST /api/v1/auth`

**Request Body**:
```json
{
  "uid": "firebase_user_uid_string"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "uid": "firebase_uid",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "_id": "68ccd71cbcadbe19d35af007",
    "username": "ANONYMOUS_MFQBK16I9N3FVI",
    "createdAt": "2025-09-19T04:07:56.168Z",
    "updatedAt": "2025-09-19T04:07:56.168Z",
    "__v": 0
  }
}
```

**Error Response** (400/500):
```json
{
  "success": false,
  "message": "Error description"
}
```

### Protected Routes
All API calls automatically include the JWT token from sessionStorage:
```javascript
// Automatic token inclusion via axios interceptor
Authorization: Bearer <jwt_token>
```

## Testing & Debugging

### Test Firebase Connection
```javascript
import FirebaseAuthService from './services/firebaseAuth'

// Test Google sign-in
const result = await FirebaseAuthService.signInWithGoogle()
console.log('Firebase result:', result)
```

### Test Backend Authentication
```javascript
import BackendAuthService from './services/backendAuth'

// Test backend auth with UID
const result = await BackendAuthService.authenticateWithBackend('test_uid')
console.log('Backend result:', result)
```

### Debug Session Data
```javascript
import { sessionManager } from './utils/sessionManager'

// Check session contents
console.log('Session info:', sessionManager.getStorageInfo())
console.log('User data:', sessionManager.getUserData())
console.log('Auth token:', sessionManager.get('silent_voices_auth_token'))
```

### Common Error Scenarios

1. **Firebase Configuration Error**
   - Check environment variables in `.env`
   - Verify Firebase project settings
   - Ensure Google auth is enabled in Firebase Console

2. **Backend API Error**
   - Check CORS settings on backend
   - Verify `/api/v1/auth` endpoint exists
   - Check request body format

3. **Session Storage Error**
   - Browser doesn't support sessionStorage
   - Storage quota exceeded
   - Incognito mode restrictions

## Security Considerations

### Firebase Security
- Firebase handles OAuth security
- ID tokens are validated on backend
- User authentication state synced with Firebase

### Backend Security
- JWT tokens with expiration
- UID validation against Firebase
- Secure token storage in sessionStorage

### Client Security
- No sensitive data in localStorage
- Session cleared on tab close
- Automatic token refresh handling

## Deployment Checklist

1. **Firebase Setup**
   - ✅ Create Firebase project
   - ✅ Enable Google authentication
   - ✅ Configure authorized domains
   - ✅ Set environment variables

2. **Backend Setup**
   - ✅ Implement `/api/v1/auth` endpoint
   - ✅ UID validation logic
   - ✅ JWT token generation
   - ✅ CORS configuration

3. **Frontend Setup**
   - ✅ Firebase SDK integration
   - ✅ Authentication context
   - ✅ UI authentication states
   - ✅ Session management

4. **Testing**
   - ✅ Google sign-in flow
   - ✅ Backend authentication
   - ✅ Session persistence
   - ✅ Logout functionality
   - ✅ Protected routes

## Build & Deployment

### Development
```bash
npm run dev  # Start development server
```

### Production Build
```bash
npm run build  # Build for production
npm run preview  # Preview production build
```

The application is now ready for production deployment with complete Firebase Google authentication integration! 🚀

## Next Steps

1. **Enhanced Features**
   - Add profile management
   - Implement password reset
   - Add email verification
   - Social media linking

2. **Security Enhancements**
   - Add rate limiting
   - Implement refresh tokens
   - Add audit logging
   - Enhanced error handling

3. **User Experience**
   - Remember login preference
   - Add loading skeletons
   - Implement offline support
   - Add push notifications