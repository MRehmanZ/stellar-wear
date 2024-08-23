import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from '../hooks/useAuth';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./styles/checkout.css"

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const orderResponse = await fetch("https://localhost:7233/api/order/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          UserId: localStorage.getItem('userId'), // Assuming userId is stored in localStorage
          PaymentIntentId: "pending",
          Items: cartItems.map(item => ({
            ProductId: item.id,
            ProductName: item.name,
            Quantity: item.quantity,
            Price: item.price,
          })),
          TotalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
      });
  
      console.log(orderResponse)
      const orderData = await orderResponse.json();
      console.log(orderData)
  
      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }
  
      const orderId = orderData.orderId;
  
      // Step 2: Create the payment intent
      const paymentIntentResponse = await fetch("https://localhost:7233/api/order/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderId: orderId.toString() }), 
      });
  
      const { clientSecret } = await paymentIntentResponse.json();
  
      if (!clientSecret) {
        throw new Error("Client secret not returned by backend.");
      }
  
      // Step 3: Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      if (result.error) {
        setErrorMessage(result.error.message);
        setIsLoading(false);
      } else if (result.paymentIntent.status === "succeeded") {
        // Step 4: Confirm payment and finalize the order
        const confirmResponse = await fetch("https://localhost:7233/api/order/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            PaymentIntentId: result.paymentIntent.id,
            UserId: localStorage.getItem('userId'),
            Items: cartItems.map(item => ({
              ProductId: item.id,
              ProductName: item.name,
              Quantity: item.quantity,
              Price: item.price,
            })), // Include the Items array here
          }),
        });
  
        const order = await confirmResponse.json();

        console.log(order)
  
        clearCart();
        navigate("/order-confirmation", { state: { order } });
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      setErrorMessage(error.message || "Payment failed. Please try again.");
      setIsLoading(false);
    }
  };
  

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                />
                <span>£{item.price}</span>
              </li>
            ))}
          </ul>
          <form onSubmit={handleCheckout}>
            <CardElement />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Checkout;
