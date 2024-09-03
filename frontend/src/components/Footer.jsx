import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { subscribeToNewsletter } from '../services/NewsletterService';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await subscribeToNewsletter(email);
      toast.success("Subscribed to newsletter successfully!");
      setEmail('');
    } catch (error) {
      toast.error("You are already subscribed to the newsletter.");
    }
  };

  return (
    <footer className="bg-gray-900 text-white p-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-2xl mb-4 text-primary">StellarWear</h3>
          <p className="text-sm text-gray-400">
            The best online store for suits, ties, shoes, and more. Dress sharp, feel sharp.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-sm hover:underline text-gray-300">Home</Link></li>
            <li><Link to="/products" className="text-sm hover:underline text-gray-300">Shop</Link></li>
            <li><Link to="/about" className="text-sm hover:underline text-gray-300">About Us</Link></li>
            <li><Link to="/contact" className="text-sm hover:underline text-gray-300">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h3 className="font-bold text-xl mb-4">Stay Updated</h3>
          <p className="text-sm mb-4 text-gray-400">
            Subscribe to our newsletter and stay updated on the latest products, deals, and offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow p-3 mb-2 md:mb-0 md:mr-2 text-gray-900 rounded-md"
              style={{ backgroundColor: 'white' }} // Ensure background is white for readability
            />
            <Button type="submit" className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark">
              Subscribe
            </Button>
          </form>
        </div>

        {/* Social Media */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-bold text-xl mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500"><FaFacebookF size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-300"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center text-sm mt-8 border-t border-gray-700 pt-4">
        <div className="mb-2">
          <Link to="/privacy-policy" className="hover:underline text-gray-400">Privacy Policy</Link> | © 2024 StellarWear. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
