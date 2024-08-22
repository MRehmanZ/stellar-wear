import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaUserCircle, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { SiStylelint } from "react-icons/si";
import CartPanel from './CartPanel'; // Import CartPanel

const NavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart panel

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogout = () => {
    // Handle logout logic
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 shadow-md flex items-center justify-between">
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
          <Link to="/outfit-builder" className="hover:text-gray-300">Outfit Builder</Link>
          <Link to="/outlet" className="hover:text-gray-300">Outlet</Link>
          <Link to="/wishlist" className="hover:text-gray-300 flex items-center">
            <FaHeart className="mr-1" />
            Wishlist
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-gray-300 flex items-center">
              <FaUserCircle className="mr-1" />
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-gray-300 flex items-center">
              <FaUserCircle className="mr-1" />
              Login
            </Link>
          )}
          <button onClick={toggleCart} className="hover:text-gray-300 flex items-center">
            <FaShoppingCart className="mr-1" />
            Cart
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
              {isLoggedIn ? (
                <li><button onClick={() => { handleLogout(); toggleMenu(); }} className="hover:text-gray-300">Logout</button></li>
              ) : (
                <li><Link to="/login" onClick={toggleMenu} className="hover:text-gray-300">Login</Link></li>
              )}
              <li><button onClick={toggleCart} className="hover:text-gray-300 flex items-center">Cart</button></li>
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
