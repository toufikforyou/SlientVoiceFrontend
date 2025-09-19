import { FaSpinner } from 'react-icons/fa'

const LoadingSpinner = ({ size = 'md', color = 'blue', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    blue: 'text-blue-500',
    gray: 'text-gray-500',
    white: 'text-white',
    green: 'text-green-500',
    red: 'text-red-500'
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <FaSpinner 
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin mb-2`}
      />
      {text && (
        <p className="text-gray-600 text-sm">{text}</p>
      )}
    </div>
  )
}

export default LoadingSpinner