import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaUserCircle, FaShoppingCart, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { SiStylelint } from "react-icons/si";
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import CartPanel from './CartPanel';
import { fetchCategories } from '../services/CategoryService';
import { Heart } from 'lucide-react';

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItems } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  
  const isAdmin = user && user.role === "Admin";

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.$values?.reverse());
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []);

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
      <nav className="sticky top-0 bg-gray-900 text-white p-4 shadow-md flex items-center justify-between z-50">
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
          {categories.map(category => (
            <Link key={category.id} to={`/${category.name.toLowerCase()}`} className="hover:text-gray-300">{category.name}</Link>
          ))}
        </div>

        <div className='md:hidden font-bold text-2xl flex items-center justify-center'>
          <Link to="/wishlist" className="flex items-center justify-center hover:text-gray-300">
            <FaHeart className="mr-2" />
          </Link>
          {isLoggedIn ? (<button onClick={toggleDropdown} className="flex items-center justify-center hover:text-gray-300">
            <FaUserCircle className="mr-2" />
          </button>) : 
          
          (<Link to="/login" className="flex items-center justify-center hover:text-gray-300">
            <FaUserCircle className="mr-2" />
          </Link>)}
          
          <button onClick={toggleCart} className="flex items-center justify-center hover:text-gray-300 relative">
            <FaShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-gray-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigate('/wishlist')}
            className="relative flex items-center justify-center p-2 rounded hover:bg-gray-700"
          >
            <Heart className="w-6 h-6" />
            <span className="sr-only">Wishlist</span>
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-300 flex items-center focus:outline-none"
            >
              <FaUserCircle className="text-2xl mr-2" />
              Account <FaChevronDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                <Link
                  to={isLoggedIn ? '/profile' : '/login'}
                  onClick={toggleDropdown}
                  className="block px-4 py-2"
                >
                  {isLoggedIn ? `Profile: ${user?.name}` : 'Login'}
                </Link>
                {isLoggedIn && (
                  <>
                    {isAdmin &&
                      <Link
                        to="/admin"
                        onClick={toggleDropdown}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Admin Dashboard
                      </Link>
                    }
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
            <FaShoppingCart className="text-2xl mr-2" />
            {cartItemCount > 0 && (
              <span className="absolute top-4 right-0 bg-gray-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
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
              {categories.map(category => (
                <li key={category.id}>
                  <Link to={`/${category.name.toLowerCase()}`} onClick={toggleMenu} className="hover:text-gray-300">
                    {category.name}
                  </Link>
                </li>
              ))}
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
