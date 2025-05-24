import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { siteConfig } from '../../data/siteConfig';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-pink-600">
              tutto<span className="text-black">moda</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-pink-600 transition-colors">
              Inicio
            </Link>
            <Link to="/category/1" className="text-gray-800 hover:text-pink-600 transition-colors">
              Vestidos
            </Link>
            <Link to="/category/2" className="text-gray-800 hover:text-pink-600 transition-colors">
              Pantalones
            </Link>
            <Link to="/category/3" className="text-gray-800 hover:text-pink-600 transition-colors">
              Blusas
            </Link>
            <Link to="/category/4" className="text-gray-800 hover:text-pink-600 transition-colors">
              Accesorios
            </Link>
          </nav>
          
          {/* Cart & Admin Links */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingBag className="h-6 w-6 text-gray-800 hover:text-pink-600 transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link to="/admin/login" className="p-2">
              <User className="h-6 w-6 text-gray-800 hover:text-pink-600 transition-colors" />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-800 hover:text-pink-600 transition-colors">
                Inicio
              </Link>
              <Link to="/category/1" className="text-gray-800 hover:text-pink-600 transition-colors">
                Vestidos
              </Link>
              <Link to="/category/2" className="text-gray-800 hover:text-pink-600 transition-colors">
                Pantalones
              </Link>
              <Link to="/category/3" className="text-gray-800 hover:text-pink-600 transition-colors">
                Blusas
              </Link>
              <Link to="/category/4" className="text-gray-800 hover:text-pink-600 transition-colors">
                Accesorios
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;