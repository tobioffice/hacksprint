import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  BookOpenIcon, 
  UserIcon, 
  ClockIcon, 
  SparklesIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface Book {
  _id: string
  title: string
  author: string
  genre: string
  availableCopies: number
  totalCopies: number
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null)
  const [recommendations, setRecommendations] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token) {
      navigate('/login')
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Fetch user data
      axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
      })
    }

    // Fetch recommendations
    fetchRecommendations()
  }, [navigate])

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/recommendations')
      setRecommendations(response.data.slice(0, 6)) // Show only 6 recommendations
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      title: 'Browse Books',
      description: 'Explore our extensive collection',
      icon: BookOpenIcon,
      href: '/books',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'My Borrowings',
      description: 'View your borrowed books',
      icon: ClockIcon,
      href: '/borrowings',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    ...(user.role === 'admin' ? [{
      title: 'Admin Panel',
      description: 'Manage users and system',
      icon: UserIcon,
      href: '/admin',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }] : [])
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <BookOpenIcon className="h-8 w-8 text-indigo-600 mr-2" />
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  LibraryPro
                </span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link 
                  to="/dashboard" 
                  className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors hover:text-indigo-600"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/books" 
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                >
                  Books
                </Link>
                <Link 
                  to="/borrowings" 
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                >
                  My Borrowings
                </Link>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -ml-16 -mb-16"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-lg text-purple-100 mb-6 max-w-2xl">
                Ready to dive into your literary journey? Explore our vast collection, manage your borrowings, 
                and discover new favorites.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/books"
                  className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20 group"
                >
                  Explore Books
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/borrowings"
                  className="inline-flex items-center px-6 py-3 bg-transparent hover:bg-white hover:bg-opacity-10 rounded-xl font-semibold transition-all duration-200 border border-white border-opacity-30"
                >
                  My Borrowings
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
                <div className="mt-4 inline-flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-700">
                  Get started
                  <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <SparklesIcon className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
            </div>
            <Link
              to="/books"
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
            >
              View all books →
            </Link>
          </div>
          
          {recommendations.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No recommendations available at the moment.</p>
              <Link
                to="/books"
                className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Browse all books
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((book) => (
                <div 
                  key={book._id} 
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
                      <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                        {book.genre}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-medium ${book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {book.availableCopies > 0 ? 'Available' : 'Not Available'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {book.availableCopies}/{book.totalCopies} copies
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                      ></div>
                    </div>
                    <Link
                      to="/books"
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 transform group-hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard