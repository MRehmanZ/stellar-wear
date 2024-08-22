import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTimes } from 'react-icons/fa';
import './styles/CartPanel.css';

const CartPanel = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
      <div className="cart-panel-header">
        <h2>Shopping Cart</h2>
        <button onClick={onClose} className="close-button">
          <FaTimes />
        </button>
      </div>
      <div className="cart-panel-content">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={`https://localhost:7233/${item.imageUrl}`} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: £{item.price}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartPanel;
