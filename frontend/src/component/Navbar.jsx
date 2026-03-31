import {Link, useNavigate} from 'react-router-dom'
import {useCart} from '../context/CartContext'
import { clearTokens,getAccessToken } from '../utils/auth.js'

function Navbar() {
  const {cartItems} = useCart()
  const navigate = useNavigate()
  const cartcount=cartItems.reduce((total, item) => total + item.quantity, 0)
  const isLoggedIn = !!getAccessToken()
  const handleLogout = () => {
    clearTokens()
    navigate('/login')
  }
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        MyStore
      </Link>

      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-gray-800 hover:text-gray-600 font-medium">
              Login
            </Link>
            <Link to="/signup" className="text-gray-800 hover:text-gray-600 font-medium">
              Signup
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-gray-800 hover:text-gray-600 font-medium">
            Logout
          </button>
        )}
      </div>

      <Link to="/cart" className="relative text-gray-800 hover:text-gray-600 font-medium">
      🛒 Cart 
        {cartcount > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-600 text-white font-bold rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartcount}
          </span>
        )}
      </Link>
    </nav>
  )
}
export default Navbar