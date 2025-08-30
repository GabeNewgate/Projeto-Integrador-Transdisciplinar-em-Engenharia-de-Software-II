import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Cake, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '../contexts/CartContext'

const Header = () => {
  const { getTotalItems } = useCart()
  const location = useLocation()
  const totalItems = getTotalItems()

  return (
    <header className="bg-white shadow-lg border-b-4 border-pink-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
            <Cake className="h-8 w-8" />
            <span>Cupcake Store</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-lg font-medium transition-colors hover:text-pink-600 ${
                location.pathname === '/' ? 'text-pink-600' : 'text-gray-700'
              }`}
            >
              Início
            </Link>
            <Link 
              to="/menu" 
              className={`text-lg font-medium transition-colors hover:text-pink-600 ${
                location.pathname === '/menu' ? 'text-pink-600' : 'text-gray-700'
              }`}
            >
              Cardápio
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Admin */}
            <Link to="/admin/login">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex justify-center space-x-6">
          <Link 
            to="/" 
            className={`text-lg font-medium transition-colors hover:text-pink-600 ${
              location.pathname === '/' ? 'text-pink-600' : 'text-gray-700'
            }`}
          >
            Início
          </Link>
          <Link 
            to="/menu" 
            className={`text-lg font-medium transition-colors hover:text-pink-600 ${
              location.pathname === '/menu' ? 'text-pink-600' : 'text-gray-700'
            }`}
          >
            Cardápio
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

