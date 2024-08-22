import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductsPage from "./components/ProductsPage";
import Cart from "./components/Cart";
import { Toaster } from "sonner";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} />
      <Toaster />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login onLogin={handleLogin} />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/products" element={<ProductsPage />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
