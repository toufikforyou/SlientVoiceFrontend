# Session Storage Implementation Guide

## Overview
Silent Voices uses **sessionStorage** instead of localStorage for temporary session data management. This provides better security and privacy as data is cleared when the browser tab/window is closed.

## Key Components

### 1. Authentication Token Management (`authToken.js`)
```javascript
// Token storage using sessionStorage
const getToken = () => sessionStorage.getItem('silent_voices_auth_token')
const setToken = (token) => sessionStorage.setItem('silent_voices_auth_token', token)
const removeToken = () => sessionStorage.removeItem('silent_voices_auth_token')
const clearSession = () => sessionStorage.clear()
```

### 2. Session Manager (`sessionManager.js`)
Comprehensive session management utility with:
- Generic storage methods (set, get, remove)
- User data management
- Draft post saving/loading
- Session utilities and validation

### 3. HTTP Client Integration
Axios interceptors automatically include session tokens:
```javascript
// Request interceptor adds token from sessionStorage
axiosPublic.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## Features

### Auto-Save Draft Posts
- Automatically saves post drafts as user types
- Restores draft content on page reload within same session
- Clears draft when post is successfully submitted

### Session Management
- Token management for API authentication
- User preferences storage
- Session validation and cleanup

### Security Benefits
- Data cleared on tab/window close
- No persistent storage of sensitive information
- Session-based authentication state

## Usage Examples

### Basic Token Management
```javascript
import { getToken, setToken, removeToken } from './utils/authToken'

// Set authentication token
setToken('your_jwt_token_here')

// Get current token
const currentToken = getToken()

// Remove token (logout)
removeToken()
```

### Session Manager
```javascript
import { sessionManager } from './utils/sessionManager'

// Save user data
sessionManager.setUserData({ id: 1, name: 'John Doe' })

// Get user data
const userData = sessionManager.getUserData()

// Save draft post
sessionManager.saveDraftPost({ title: 'Draft', content: 'Content...' })

// Clear all session data
sessionManager.clearAll()
```

## API Integration

### Authentication Headers
All API requests automatically include authentication headers from sessionStorage:

```javascript
// Automatic token inclusion in API calls
const response = await axiosPublic.get('/api/v1/post')
// Header: Authorization: Bearer <token_from_session>
```

### Post Creation with Images
```javascript
// Create post with uploaded images
const postData = {
  title: 'My Post',
  content: 'Post content...',
  images: ['https://i.ibb.co/image1.jpg', 'https://i.ibb.co/image2.jpg']
}

const response = await axiosPublic.post('/api/v1/post', postData)
```

## Environment Configuration

### ImageBB API Integration
```env
VITE_IMGBB_API_KEY=your_imgbb_api_key_here
```

### Session Keys
Predefined session storage keys:
- `silent_voices_auth_token` - Authentication token
- `silent_voices_user_data` - User profile data
- `silent_voices_preferences` - User preferences
- `silent_voices_draft_post` - Draft post content

## Best Practices

1. **Token Management**
   - Always check token existence before API calls
   - Clear session on logout
   - Handle token expiration gracefully

2. **Draft Saving**
   - Auto-save frequently to prevent data loss
   - Clear drafts after successful submission
   - Restore drafts on component mount

3. **Session Validation**
   - Verify sessionStorage availability
   - Handle storage quota exceeded errors
   - Implement fallback mechanisms

4. **Security**
   - Never store sensitive data long-term
   - Clear session on application errors
   - Validate session data integrity

## Development Notes

### Testing Session Storage
```javascript
// Check if sessionStorage is available
if (sessionManager.isAvailable()) {
  // Use session storage
} else {
  // Fallback to memory storage or show error
}
```

### Debugging Session Data
```javascript
// Get storage information
const info = sessionManager.getStorageInfo()
console.log('Session storage info:', info)
```

### Error Handling
```javascript
try {
  sessionManager.set('key', 'value')
} catch (error) {
  console.error('Session storage error:', error)
  // Handle quota exceeded or other errors
}
```

## Migration from localStorage

If migrating from localStorage:

1. Replace all `localStorage` calls with `sessionStorage`
2. Update import statements to use session utilities
3. Consider data migration for existing users
4. Test session behavior across page reloads
5. Update documentation and user guides

## Production Deployment

### Environment Variables
Ensure proper environment variables are set:
- `VITE_IMGBB_API_KEY` for image uploads
- API endpoints configured correctly

### Build Configuration
```bash
npm run build  # Builds optimized production bundle
npm run preview  # Preview production build locally
```

### Server Configuration
- Ensure API CORS settings allow your domain
- Configure proper authentication endpoints
- Set up image hosting service (ImageBB)

## Troubleshooting

### Common Issues
1. **Session data not persisting**: SessionStorage is cleared on tab close - this is expected behavior
2. **Token not included in requests**: Check axios interceptor configuration
3. **Draft not loading**: Verify sessionManager import and usage
4. **Image upload fails**: Check ImageBB API key configuration

### Debug Commands
```javascript
// Check current session state
console.log('Session storage:', Object.keys(sessionStorage))
console.log('Current token:', getToken())
console.log('Draft post:', sessionManager.getDraftPost())
```

This implementation provides a robust, secure, and user-friendly session management system for the Silent Voices social media application.