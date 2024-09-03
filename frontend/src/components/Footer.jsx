// src/components/Footer.jsx

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-lg mb-2">StellarWear</h3>
          <p className="text-sm">
            The best online store for suits, ties, shoes, and more. Dress sharp, feel sharp.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="text-sm hover:underline">Home</a></li>
            <li><a href="/products" className="text-sm hover:underline">Shop</a></li>
            <li><a href="/about" className="text-sm hover:underline">About Us</a></li>
            <li><a href="/contact" className="text-sm hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="font-bold text-lg mb-2">Follow Us</h3>
          <div className="flex space-x-3 mb-4">
            <a href="#" className="text-white hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="text-white hover:text-blue-300"><FaTwitter /></a>
            <a href="#" className="text-white hover:text-pink-500"><FaInstagram /></a>
          </div>
          <h3 className="font-bold text-lg mb-2">Newsletter</h3>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 mb-2 rounded"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        © 2024 StellarWear. All rights reserved.
      </div>
      <Link to="/privacy-policy" className="underline text-primary">Privacy Policy</Link>
    </footer>
  );
};

export default Footer;
