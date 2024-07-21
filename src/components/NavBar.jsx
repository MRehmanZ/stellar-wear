import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">StellarWear</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/new-in">New In</Link></li>
        <li><Link to="/mens">Mens</Link></li>
        <li><Link to="/collections">Collections</Link></li>
        <li><Link to="/outfit-builder">Outfit Builder</Link></li>
        <li><Link to="/outlet">Outlet</Link></li>
      </ul>
      <div className="navbar-icons">
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/login">Account</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default NavBar;
