import { useState, useEffect, useContext, createContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import { loginUser, logout } from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);

      const user = {
        id: decodedToken.sub,
        name: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };

      setUser(user);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const login = async (userData) => {
    try {
      const data = await loginUser(userData);
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(data.token);

      const user = {
        id: decodedToken.sub,
        name: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };

      setUser(user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    await logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout: logoutUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
