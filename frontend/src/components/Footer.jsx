import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-xl mb-3 text-primary">StellarWear</h3>
          <p className="text-sm text-muted-foreground">
            The best online store for suits, ties, shoes, and more. Dress sharp, feel sharp.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-sm hover:underline">Home</Link></li>
            <li><Link to="/products" className="text-sm hover:underline">Shop</Link></li>
            <li><Link to="/about" className="text-sm hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="text-sm hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h3 className="font-bold text-lg mb-3">Stay Updated</h3>
          <p className="text-sm mb-4 text-muted-foreground">
            Subscribe to our newsletter and stay updated on the latest products, deals, and offers.
          </p>
          <form className="flex flex-col md:flex-row items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-3 rounded mb-2 md:mb-0 md:mr-2 text-gray-900"
            />
            <button className="bg-primary text-white py-3 px-6 rounded hover:bg-primary-dark">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-bold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-blue-500"><FaFacebookF size={20} /></a>
            <a href="#" className="text-white hover:text-blue-300"><FaTwitter size={20} /></a>
            <a href="#" className="text-white hover:text-pink-500"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center text-sm mt-8 border-t border-gray-700 pt-4">
        <div className="mb-2">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link> | © 2024 StellarWear. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
