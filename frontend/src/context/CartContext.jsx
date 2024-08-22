import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // Assuming you have a useAuth hook to get the current user

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage when the component mounts or the user logs in
  useEffect(() => {
    const cartKey = user ? `cart_${user.id}` : 'cart_guest';
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [user]);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    const cartKey = user ? `cart_${user.id}` : 'cart_guest';
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, user]);

  // Migrate guest cart to user cart on login
  useEffect(() => {
    if (user) {
      const guestCart = localStorage.getItem('cart_guest');
      if (guestCart) {
        const mergedCart = mergeCarts(JSON.parse(guestCart), cartItems);
        setCartItems(mergedCart);
        localStorage.removeItem('cart_guest');
      }
    }
  }, [user]);

  const mergeCarts = (guestCart, userCart) => {
    const merged = [...userCart];
    guestCart.forEach((guestItem) => {
      const existingItem = merged.find((item) => item.id === guestItem.id);
      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        merged.push(guestItem);
      }
    });
    return merged;
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
