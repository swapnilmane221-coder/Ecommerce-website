import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { clearTokens, getAccessToken } from '../utils/auth.js'

function Navbar() {
  const { cartItems } = useCart()
  const navigate = useNavigate()
  const cartcount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const isLoggedIn = !!getAccessToken()

  const handleLogout = () => {
    clearTokens()
    navigate('/login')
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between transition-all duration-300">
      {/* Brand Logo */}
      <Link to="/" className="group flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span className="text-2xl font-black text-slate-800 tracking-tight">
          My<span className="text-blue-600">Store</span>
        </span>
      </Link>

      <div className="flex items-center space-x-8">
        {/* Auth Links */}
        <div className="hidden md:flex items-center space-x-6">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="relative text-slate-600 hover:text-blue-600 font-bold text-sm uppercase tracking-wide transition-colors peer group">
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/signup" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 hover:shadow-lg active:scale-95 transition-all">
                Get Started
              </Link>
            </>
          ) : (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-slate-600 hover:text-red-600 font-bold text-sm uppercase tracking-wide transition-colors group"
            >
              Logout
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </div>

        {/* Cart Icon */}
        <Link 
          to="/cart" 
          className="group relative p-2 bg-slate-50 rounded-full hover:bg-blue-50 transition-colors"
        >
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-slate-700 group-hover:text-blue-600 transition-colors group-active:scale-110" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            {cartcount > 0 && (
              <span className="absolute -top-3 -right-3 bg-blue-600 text-white font-bold rounded-full text-[10px] w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm animate-bounce-short">
                {cartcount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar