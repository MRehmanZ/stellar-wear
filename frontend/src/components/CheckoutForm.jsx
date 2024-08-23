import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Prepare cart items with correct mapping
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        productName: item.name, // Ensure this field is populated correctly
        quantity: item.quantity,
        price: item.price,
      }));
  
      const response = await fetch("https://localhost:7233/api/checkout/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems), // Send the correctly mapped order items
      });
  
      const data = await response.json();
      const { clientSecret } = data;
  
      if (!clientSecret) {
        throw new Error("Client secret not returned by backend.");
      }
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      if (result.error) {
        setErrorMessage(result.error.message);
        setIsLoading(false);
      } else if (result.paymentIntent.status === "succeeded") {
        clearCart();
        navigate("/success");
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      setErrorMessage("Payment failed. Please try again.");
      setIsLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Payment Information</h2>
      <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Button type="submit" disabled={!stripe || isLoading} className="submit-button">
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
