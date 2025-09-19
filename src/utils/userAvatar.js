// User Avatar Utility for Silent Voices
// Provides consistent avatar generation and display across components

/**
 * Generate user initials from display name or username
 * @param {Object} user - User object with displayName, username, etc.
 * @returns {string} User initials (2 characters)
 */
export const getUserInitials = (user) => {
  // Try displayName first (from Firebase)
  if (user?.displayName) {
    const names = user.displayName.trim().split(' ')
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase()
    }
    return user.displayName.slice(0, 2).toUpperCase()
  }
  
  // Fallback to username (from backend)
  const username = user?.username
  if (!username) return 'U'
  
  const words = username.split('_').filter(word => word.length > 0)
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return username.slice(0, 2).toUpperCase()
}

/**
 * Get user display name with proper formatting
 * @param {Object} user - User object
 * @returns {string} Formatted display name
 */
export const getUserDisplayName = (user) => {
  // Prefer Firebase displayName if available
  if (user?.displayName) {
    return user.displayName
  }
  
  // Fallback to username processing
  if (!user?.username) return 'User'
  
  // Convert ANONYMOUS_MFQBK16I9N3FVI to "Anonymous User"
  if (user.username.startsWith('ANONYMOUS_')) {
    return 'Anonymous User'
  }
  
  // Convert username to display name (replace underscores with spaces, capitalize)
  return user.username
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Get avatar URL with fallbacks
 * @param {Object} user - User object
 * @returns {string|null} Avatar URL or null if should use initials
 */
export const getAvatarUrl = (user) => {
  // Firebase photo URL (highest priority)
  if (user?.photoURL) {
    return user.photoURL
  }
  
  // Custom avatar URL
  if (user?.avatar) {
    return user.avatar
  }
  
  // Generate DiceBear avatar as fallback
  if (user?.uid || user?.id || user?.username) {
    const seed = user.uid || user.id || user.username
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=transparent`
  }
  
  return null
}

/**
 * Get user profile data with consistent formatting
 * @param {Object} user - User object
 * @returns {Object} Formatted user profile
 */
export const getUserProfile = (user) => {
  return {
    id: user?.uid || user?.id || 'anonymous',
    displayName: getUserDisplayName(user),
    initials: getUserInitials(user),
    avatarUrl: getAvatarUrl(user),
    username: user?.username || user?.uid || 'anonymous',
    email: user?.email || null,
    verified: user?.verified || false
  }
}

/**
 * Avatar component props generator
 * @param {Object} user - User object
 * @param {string} size - Size class (e.g., 'w-10 h-10', 'w-12 h-12')
 * @returns {Object} Props for avatar component
 */
export const getAvatarProps = (user, size = 'w-10 h-10') => {
  const profile = getUserProfile(user)
  
  return {
    profile,
    size,
    className: `${size} rounded-full object-cover border-2 border-gray-200`,
    fallbackClassName: `${size} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-gray-200`
  }
}

export default {
  getUserInitials,
  getUserDisplayName,
  getAvatarUrl,
  getUserProfile,
  getAvatarProps
}