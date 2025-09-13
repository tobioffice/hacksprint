import { Link } from 'react-router-dom'
import { BookOpenIcon, UserGroupIcon, ClockIcon, ShieldCheckIcon, SparklesIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const Home = () => {
  const features = [
    {
      name: 'Digital Library Management',
      description: 'Comprehensive system to manage books, track borrowings, and maintain library records efficiently.',
      icon: BookOpenIcon,
    },
    {
      name: 'Role-Based Access',
      description: 'Secure authentication with different access levels for students, librarians, and administrators.',
      icon: UserGroupIcon,
    },
    {
      name: 'Real-time Tracking',
      description: 'Monitor book availability, due dates, and borrowing history in real-time.',
      icon: ClockIcon,
    },
    {
      name: 'Advanced Security',
      description: 'JWT-based authentication ensures secure access and data protection.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Smart Recommendations',
      description: 'Get personalized book recommendations based on borrowing patterns and preferences.',
      icon: SparklesIcon,
    },
    {
      name: 'Analytics Dashboard',
      description: 'Comprehensive insights into library usage, popular books, and user activity.',
      icon: ChartBarIcon,
    },
  ]

  const stats = [
    { id: 1, name: 'Books Available', value: '10,000+' },
    { id: 2, name: 'Active Users', value: '2,500+' },
    { id: 3, name: 'Books Borrowed Monthly', value: '5,000+' },
    { id: 4, name: 'Library Locations', value: '15' },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <BookOpenIcon className="h-8 w-8 text-white mr-2" />
                <span className="text-xl font-bold text-white">LibraryPro</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Modern Library
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Management System
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your library operations with our comprehensive digital platform. 
              Manage books, track borrowings, and enhance user experience with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/login"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </Link>
              <Link
                to="/demo"
                className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white bg-opacity-5 rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your library
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides comprehensive tools for modern library management with intuitive interfaces and powerful features.
            </p>
          </div>

          <div className="mt-20">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <dt className="relative">
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to transform your library?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-purple-100">
            Join thousands of libraries already using our platform to enhance their operations and user experience.
          </p>
          <Link
            to="/login"
            className="mt-8 w-full inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
          >
            Start Your Journey
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <BookOpenIcon className="h-8 w-8 text-indigo-400 mr-2" />
                <span className="text-xl font-bold text-white">LibraryPro</span>
              </div>
              <p className="text-gray-400 text-base">
                Empowering libraries with modern technology for better management and enhanced user experiences.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Solutions</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Book Management</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">User Analytics</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Digital Catalog</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">About</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Careers</a></li>
                    <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2025 LibraryPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home