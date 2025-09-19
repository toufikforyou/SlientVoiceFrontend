import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'

const ErrorAlert = ({ message, onClose, type = 'warning' }) => {
  const baseClasses = "p-4 rounded-lg border flex items-center justify-between mb-4"
  const typeClasses = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="flex items-center space-x-3">
        <FaExclamationTriangle className="flex-shrink-0" />
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
        >
          <FaTimes className="text-sm" />
        </button>
      )}
    </div>
  )
}

export default ErrorAlert