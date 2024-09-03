import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./context/CartContext";
import OrdersPage from "./components/OrdersPage";
import OrderDetails from "./components/OrderDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageProducts from "./components/admin/ManageProducts";
import AdminDashboardLayout from "./components/admin/AdminDashboardLayout";
import ProductsPage from "./components/ProductsPage";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
import UserManagement from "./components/admin/UserManagement";
import AddProduct from "./components/admin/AddProduct";
import SuitsPage from "./components/SuitsPage";
import TiesPage from "./components/TiesPage";
import ShoesPage from "./components/ShoesPage";
import AccessoriesPage from "./components/AccessoriesPage";
import ManageCategories from "./components/admin/ManageCategories";
import ProductDetail from "./components/ProductDetail";
import ConsentBanner from "./components/ConsentBanner";
import PrivacyPolicy from "./components/PrivacyPolicy";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <NavBar />
          <Toaster />
          <ConsentBanner />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/suits" element={<SuitsPage />} />
              <Route exact path="/ties" element={<TiesPage />} />
              <Route exact path="/shoes" element={<ShoesPage />} />
              <Route exact path="/accessories" element={<AccessoriesPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route exact path="/product/:id" element={<ProductDetail />} />
              <Route
                exact
                path="/checkout"
                element={
                  <Elements stripe={stripePromise}>
                    
                      <Checkout />
                    
                  </Elements>
                }
              />
              <Route exact path="/order-confirmation" element={<OrderConfirmation />} />
              <Route exact path="/orders" element={<OrdersPage />} />
              <Route exact path="/order/:orderId" element={<OrderDetails />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              
              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminDashboardLayout />
                  </AdminRoute>
                }
              >
                <Route path="products" element={<ManageProducts />} />
                <Route path="products/new" element={<AddProduct />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="categories" element={<ManageCategories />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
