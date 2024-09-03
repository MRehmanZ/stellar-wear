import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCardIcon, LockIcon, MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import '@react-google-maps/api';

const Checkout = () => {
  const { cartItems, clearCart, updateCartItemQuantity, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [addressError, setAddressError] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { isLoggedIn, user, setUser } = useAuth();

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

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

  const handleAddAddress = async () => {
    setIsLoading(true);
    setAddressError("");

    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode || !newAddress.country) {
      setAddressError("Please fill in all fields before submitting.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ ...newAddress, UserId: localStorage.getItem("userId") }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(errorData.message || "Failed to add address.");
      }

      const addressData = await response.json();
      setSelectedAddress(addressData.id);
      setIsAddingAddress(false);

      setUser(prevUser => ({
        ...prevUser,
        addresses: [...(prevUser?.addresses || []), addressData],
      }));

      toast.success("Address added successfully!");
    } catch (error) {
      console.error("Error adding address:", error);
      setAddressError(error.message || "Failed to add address.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceSelect = (place) => {
    if (place) {
      const addressComponents = place.value.terms;
      const streetNumber = addressComponents[0]?.value || '';
      const route = addressComponents[1]?.value || '';
      const locality = addressComponents[2]?.value || '';
      const administrativeArea = addressComponents[2]?.value || addressComponents[3]?.value || '';
      const postalCode =  addressComponents[3]?.value || addressComponents[2]?.value || "";
      const country = addressComponents[4]?.value || addressComponents[3]?.value ||'';

      setNewAddress({
        street: `${streetNumber} ${route}`.trim(),
        city: locality,
        state: administrativeArea,
        postalCode: postalCode,
        country: country,
      });
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
          UserId: localStorage.getItem('userId'),
          PaymentIntentId: "pending",
          AddressId: selectedAddress,
          Items: cartItems.map(item => ({
            ProductId: item.id,
            ProductName: item.name,
            Quantity: item.quantity,
            Price: item.price,
            ImageUrl: item.imageUrl,
          })),
          TotalAmount: subtotal + shippingCost,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.message || "Failed to create order");
      }

      const orderId = orderData.orderId;

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

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
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
              ImageUrl: item.imageUrl,
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
    } finally {
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
                <h3 className="text-xl font-semibold">Delivery Address</h3>
                {user.addresses && user.addresses.length > 0 && !isAddingAddress ? (
                  <Select value={selectedAddress} onValueChange={setSelectedAddress}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an address" />
                    </SelectTrigger>
                    <SelectContent>
                      {user.addresses.map((address) => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="grid gap-4">
                    <Label htmlFor="address">Address</Label>
                    <GooglePlacesAutocomplete
                      apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
                      selectProps={{
                        onChange: handlePlaceSelect,
                        placeholder: 'Search for an address',
                      }}
                    />
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      required
                    />
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      required
                    />
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      required
                    />
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      required
                    />
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      required
                    />
                    {addressError && <p className="text-red-500">{addressError}</p>}
                    <Button onClick={handleAddAddress} disabled={isLoading || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode || !newAddress.country}>
                      {isLoading ? "Adding Address..." : "Add Address"}
                    </Button>
                  </div>
                )}
                {!isAddingAddress && user.addresses && user.addresses.length > 0 && (
                  <Button onClick={() => setIsAddingAddress(true)} disabled={isLoading}>
                    Add New Address
                  </Button>
                )}
                {user.addresses && user.addresses.length === 0 && (
                  <p>No address found. Please add an address.</p>
                )}
              </div>
              <Separator />
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
                      <p className="text-sm text-gray-500">£{item.price?.toFixed(2)}</p>
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
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
          <Button className="w-full" size="lg" type="submit" onClick={handleSubmit} disabled={isLoading || !stripe || !elements || selectedAddress.length === 0 }>
            <LockIcon className="mr-2 h-5 w-5" /> {isLoading ? ("Processing...") : (`Pay £${total.toFixed(2)}`)}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Checkout;
