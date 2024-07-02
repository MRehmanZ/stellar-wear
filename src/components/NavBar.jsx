import React from 'react';
import './NavBar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">StellerWear</a>
            </div>
            <ul className="navbar-links">
                <li><a href="/new-in">New In</a></li>
                <li><a href="/mens">Mens</a></li>
                <li><a href="/collections">Collections</a></li>
                <li><a href="/outfit-builder">Outfit Builder</a></li>
                <li><a href="/outlet">Outlet</a></li>
            </ul>
            <div className="navbar-icons">
                <a href="/wishlist">Wishlist</a>
                <a href="/account">Account</a>
                <a href="/cart">Cart</a>
            </div>
        </nav>
    );
};

export default Navbar;




