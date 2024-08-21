import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "sonner";
import Cart from "./components/Cart";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <NavBar />
      <Toaster />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/Cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
