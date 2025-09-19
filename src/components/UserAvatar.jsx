// UserAvatar Component - Reusable avatar display with fallbacks
import { FaUser } from 'react-icons/fa'
import { getAvatarProps } from '../utils/userAvatar'

const UserAvatar = ({ 
  user, 
  size = 'w-10 h-10', 
  className = '', 
  showTooltip = false 
}) => {
  const { profile, fallbackClassName } = getAvatarProps(user, size)
  
  const avatarElement = (
    <>
      {profile.avatarUrl ? (
        <img
          src={profile.avatarUrl}
          alt={`${profile.displayName}'s avatar`}
          className={`${size} rounded-full object-cover border-2 border-gray-200 ${className}`}
          onError={(e) => {
            // If image fails to load, replace with initials
            e.target.style.display = 'none'
            e.target.nextElementSibling.style.display = 'flex'
          }}
        />
      ) : null}
      
      <div 
        className={`${fallbackClassName} ${profile.avatarUrl ? 'hidden' : 'flex'} ${className}`}
        style={{ display: profile.avatarUrl ? 'none' : 'flex' }}
      >
        {profile.initials !== 'U' ? (
          <span className={size.includes('12') ? 'text-sm' : 'text-xs'}>
            {profile.initials}
          </span>
        ) : (
          <FaUser className="text-xs opacity-75" />
        )}
      </div>
    </>
  )

  if (showTooltip) {
    return (
      <div className="relative group">
        {avatarElement}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {profile.displayName}
        </div>
      </div>
    )
  }

  return <div className="relative">{avatarElement}</div>
}

export default UserAvatar