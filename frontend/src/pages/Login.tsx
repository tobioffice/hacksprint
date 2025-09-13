import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpenIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' })
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login'
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/dashboard')
    } catch (error) {
      alert('Error: ' + (error as any).response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white bg-opacity-5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm border border-white border-opacity-20">
              <BookOpenIcon className="h-8 w-8 text-white" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-purple-100">
            {isRegister ? 'Join our library community' : 'Sign in to your account'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name field (only for register) */}
            {isRegister && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 border border-white border-opacity-30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 border border-white border-opacity-30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white bg-opacity-20 border border-white border-opacity-30 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white hover:text-gray-200 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Role selection (only for register) */}
            {isRegister && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                  Role
                </label>
                <select
                  name="role"
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 border border-white border-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                >
                  <option value="student" className="text-gray-900">Student</option>
                  <option value="librarian" className="text-gray-900">Librarian</option>
                  <option value="admin" className="text-gray-900">Admin</option>
                </select>
              </div>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isRegister ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  isRegister ? 'Create Account' : 'Sign In'
                )}
              </button>
            </div>

            {/* Toggle auth mode */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-purple-100 hover:text-white transition-colors duration-200 text-sm"
              >
                {isRegister 
                  ? 'Already have an account? Sign In' 
                  : 'Need an account? Create one'
                }
              </button>
            </div>
          </form>
        </div>

        {/* Back to home link */}
        <div className="text-center">
          <Link 
            to="/" 
            className="text-purple-100 hover:text-white transition-colors duration-200 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login