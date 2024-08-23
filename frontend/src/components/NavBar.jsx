import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaUserCircle, FaShoppingCart, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { SiStylelint } from "react-icons/si";
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import CartPanel from './CartPanel';

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemCount = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <>
      <nav className="sticky top-0 bg-gray-800 text-white p-4 shadow-md flex items-center justify-between z-50">
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="flex-grow text-center md:flex-grow-0">
          <Link to="/" className="text-2xl font-bold flex items-center justify-center">
            <SiStylelint className="text-2xl mr-2" />
            <span>StellarWear</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/new-in" className="hover:text-gray-300">New In</Link>
          <Link to="/mens" className="hover:text-gray-300">Mens</Link>
          <Link to="/collections" className="hover:text-gray-300">Collections</Link>
          <Link to="/wishlist" className="hover:text-gray-300 flex items-center">
            <FaHeart className="mr-1" />
            Wishlist
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-300 flex items-center focus:outline-none"
            >
              <FaUserCircle className="mr-1" />
              Account <FaChevronDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                <Link
                  to={isLoggedIn ? '/profile' : '/login'}
                  onClick={toggleDropdown}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  {isLoggedIn ? 'Profile' : 'Login'}
                </Link>
                {isLoggedIn && (
                  <>
                    <Link
                      to="/orders"
                      onClick={toggleDropdown}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleDropdown();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <button onClick={toggleCart} className="relative hover:text-gray-300 flex items-center">
            <FaShoppingCart className="mr-1" />
            Cart
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-gray-800 text-white flex flex-col items-center justify-center md:hidden z-50">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-2xl">
              <FaTimes />
            </button>
            <ul className="space-y-6 text-2xl mt-10">
              <li><Link to="/new-in" onClick={toggleMenu} className="hover:text-gray-300">New In</Link></li>
              <li><Link to="/mens" onClick={toggleMenu} className="hover:text-gray-300">Mens</Link></li>
              <li><Link to="/collections" onClick={toggleMenu} className="hover:text-gray-300">Collections</Link></li>
              <li><Link to="/outfit-builder" onClick={toggleMenu} className="hover:text-gray-300">Outfit Builder</Link></li>
              <li><Link to="/outlet" onClick={toggleMenu} className="hover:text-gray-300">Outlet</Link></li>
              <li><Link to="/wishlist" onClick={toggleMenu} className="hover:text-gray-300">Wishlist</Link></li>
              <li><button onClick={toggleCart} className="hover:text-gray-300 flex items-center">Cart</button></li>
              <li>
                <button
                  onClick={() => {
                    isLoggedIn ? handleLogout() : navigate('/login');
                    toggleMenu();
                  }}
                  className="hover:text-gray-300"
                >
                  {isLoggedIn ? 'Logout' : 'Login'}
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Cart Panel */}
      <CartPanel isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default NavBar;
