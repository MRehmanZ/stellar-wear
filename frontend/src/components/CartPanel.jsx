import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTimes } from 'react-icons/fa';
import './styles/CartPanel.css';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CartPanel = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
      <Card className="cart-panel-card">
        <CardHeader className="cart-panel-header">
          <CardTitle>Shopping Cart</CardTitle>
          <Button variant="ghost" onClick={onClose} className="close-button">
            <FaTimes />
          </Button>
        </CardHeader>
        <CardContent className="cart-panel-content">
          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item flex gap-4 items-center">
                  <img 
                    src={`https://localhost:7233/${item.imageUrl}`} 
                    alt={item.name} 
                    className="cart-item-image w-16 h-16 rounded object-cover" 
                  />
                  <div className="cart-item-details flex-grow">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm">Quantity: <Badge>{item.quantity}</Badge></p>
                    <p className="text-sm">Price: £{item.price}</p>
                  </div>
                  <Button variant="destructive" onClick={() => removeFromCart(item.id)} className="remove-button">
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="cart-footer flex flex-col gap-4">
          <div className="cart-total flex justify-between items-center">
            <h3 className="text-xl font-bold">Total: £{totalAmount.toFixed(2)}</h3>
          </div>
          <Link to="/checkout" className="w-full">
            <Button variant="primary" className="w-full">Proceed to Checkout</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CartPanel;
