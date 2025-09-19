import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaInfo, FaEnvelope, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  const navigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'About', href: '/about', icon: FaInfo },
    { name: 'Contact', href: '/contact', icon: FaEnvelope },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Silent Voices
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    } px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-1`}
                  >
                    <Icon className="text-sm" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Login Button / User Menu */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">
                  Welcome, <span className="font-medium">{user?.username || 'User'}</span>
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2`}
                  >
                    <Icon className="text-sm" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="px-3 py-2 text-sm text-gray-700">
                    Welcome, <span className="font-medium">{user?.username || 'User'}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium flex items-center justify-center space-x-2"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium mt-4"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header