import React, { useState } from 'react';
import './styles/Cart.css';

function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Blanket",
      price: 29.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Mug",
      price: 12.99,
      quantity: 2,
    },
  ]);

  const updateQuantity = (id, quantity) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="box">
      <h2>Cart</h2>
      <div className="items">
        {cart.map((item) => (
          <div key={item.id} className="item">
            <div className="item-details">
              <strong>{item.name}</strong>
              <div>£{item.price.toFixed(2)} x {item.quantity} = £{(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div className="quantity-control">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                -
              </button>
              <input className="quantity-box"
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              />
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <strong>Total:</strong> £{total.toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;
