import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CreditCardIcon, LockIcon, MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

const Checkout = () => {
  const { cartItems, clearCart, updateCartItemQuantity, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { isLoggedIn } = useAuth();
  
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  
  const shippingCost = 9.99;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const calculateTotals = () => {
      const newSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      setSubtotal(newSubtotal);
      setTotal(newSubtotal + shippingCost);
    };

    calculateTotals();
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(id, newQuantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const orderResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/order/create-order`, {
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
          TotalAmount: subtotal + shippingCost,
        }),
      });
  
      const orderData = await orderResponse.json();
  
      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }
  
      const orderId = orderData.orderId;
  
      // Step 2: Create the payment intent
      const paymentIntentResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/order/create-payment-intent`, {
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
        const confirmResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/order/confirm-payment`, {
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
            })),
          }),
        });
  
        const order = await confirmResponse.json();
  
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Checkout</CardTitle>
          <CardDescription>Review your cart and complete your purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Your Cart</h3>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-2">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/${item.imageUrl}`} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">£{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="w-20 text-right font-semibold">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Separator />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement className="p-3 border rounded-md" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>£{shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" type="submit" onClick={handleSubmit} disabled={isLoading || !stripe || !elements}>
            <LockIcon className="mr-2 h-5 w-5" /> Pay £{total.toFixed(2)}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Checkout;
