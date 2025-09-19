import { Link } from 'react-router-dom'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 space-x-2"
          >
            <FaHome />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try one of these pages:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link to="/about" className="text-blue-600 hover:underline">About</Link>
              <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound