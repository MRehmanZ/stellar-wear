import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Heroes from "./components/Heroes";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  

  return (
    <>
      <NavBar AccountClick={DirectLogin} />
      <Route path="/" element={<App />}
      <Route path="/Login" element={<Login />}
      <Heroes
        title="Collection"
        subtitle="blah blah"
        imageUrl="/Hero.jpg"
        linkUrl="/shop-now"
      />
      <div className="container">
        {isLoggedIn ? <h1>Welcome!</h1> : <Login onLogin={handleLogin} />}
      </div>
    </>
  );
}

export default App;
