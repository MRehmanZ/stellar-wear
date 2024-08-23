import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./context/CartContext";
import OrdersPage from "./components/OrdersPage";
import OrderDetails from "./components/OrderDetails";
import ProtectedRoute from "./components/ProtectedRoute";

// Load Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
      <NavBar />
      <Toaster />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/cart" element={<Cart />} />
          {/* Wrap the Checkout component with Elements */}
          <Route 
            exact 
            path="/checkout" 
            element={
               <Elements stripe={stripePromise}>
                <ProtectedRoute element={<Checkout />} /> 
              </Elements> 
            } 
          />
          <Route exact path="/order-confirmation" element={<OrderConfirmation />} />
          <Route exact path="/orders" element={<OrdersPage />} />
          <Route exact path="/order/:orderId" element={<OrderDetails />} />
        </Routes>
      </div>
    </Router>
      </CartProvider>
      </AuthProvider>
    
  );
}

export default App;
