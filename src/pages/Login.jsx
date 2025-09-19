import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter, FaLock, FaUser, FaEnvelope, FaSpinner } from 'react-icons/fa'
import FirebaseAuthService from '../services/firebaseAuth'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authSuccess, setAuthSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle success/redirect logic here
      console.log('Form submitted:', formData)
    }, 1500)
  }

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setAuthError('')
    setAuthSuccess('')
    
    try {
      // Sign in with Firebase
      const firebaseResult = await FirebaseAuthService.signInWithGoogle()
      
      if (firebaseResult.success) {
        setAuthSuccess('Google sign-in successful! Authenticating with server...')
        
        // Authenticate with backend using auth context
        const backendResult = await login(firebaseResult.user)
        
        if (backendResult.success) {
          setAuthSuccess('Authentication successful! Redirecting...')
          
          // Redirect to home page after successful authentication
          setTimeout(() => {
            navigate('/')
          }, 1500)
        } else {
          setAuthError(backendResult.error || 'Failed to authenticate with server')
        }
      } else {
        setAuthError(firebaseResult.error || 'Failed to sign in with Google')
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      setAuthError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const socialProviders = [
    { 
      name: 'Google', 
      icon: FaGoogle, 
      color: 'bg-red-500 hover:bg-red-600',
      onClick: handleGoogleSignIn,
      disabled: false
    },
    { 
      name: 'Facebook', 
      icon: FaFacebook, 
      color: 'bg-gray-400 cursor-not-allowed',
      onClick: () => setAuthError('Facebook login coming soon'),
      disabled: true
    },
    { 
      name: 'Twitter', 
      icon: FaTwitter, 
      color: 'bg-gray-400 cursor-not-allowed',
      onClick: () => setAuthError('Twitter login coming soon'),
      disabled: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-blue-600 mb-6 inline-block">
            Silent Voices
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Join our community and start sharing your voice' 
              : 'Sign in to your account to continue'
            }
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-3">
            {socialProviders.map((provider, index) => {
              const Icon = provider.icon
              return (
                <button
                  key={index}
                  onClick={provider.onClick}
                  disabled={provider.disabled || isLoading}
                  className={`${provider.color} text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed relative`}
                >
                  {isLoading && provider.name === 'Google' ? (
                    <FaSpinner className="text-lg animate-spin" />
                  ) : (
                    <Icon className="text-lg" />
                  )}
                </button>
              )
            })}
          </div>
          
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>
        </div>

        {/* Auth Messages */}
        {authError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{authError}</p>
          </div>
        )}
        
        {authSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{authSuccess}</p>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name (Sign Up only) */}
            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={isSignUp}
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={isSignUp}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {/* Remember Me / Forgot Password */}
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isSignUp ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>

            {/* Terms (Sign Up only) */}
            {isSignUp && (
              <p className="text-xs text-gray-600 text-center">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </p>
            )}
          </form>
        </div>

        {/* Toggle Sign Up / Sign In */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h4>
          <p className="text-xs text-gray-600">
            Email: demo@silentvoices.com<br />
            Password: demo123
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login