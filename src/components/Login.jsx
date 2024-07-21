import React, { useState } from 'react';
import Input from './input';
import './login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMousedOver, setMouseOver] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (username === 'user' && password === 'password') {
      onLogin();
    } else {
      alert('Invalid details');
    }
  };

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  return (
    <form className="form" onSubmit={handleChange}>
      <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
      <Input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button 
        style={{ backgroundColor: isMousedOver ? 'black' : 'white' }} 
        onMouseOver={handleMouseOver} 
        onMouseOut={handleMouseOut} 
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
