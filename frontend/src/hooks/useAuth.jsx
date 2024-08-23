import { useState, useEffect, useContext, createContext } from 'react';
import { loginUser, logout} from '../services/AuthService';

// Create a context for authentication
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // const user = await authService.getCurrentUser();
      // Optionally, decode the token to extract user information
      // setUser(jwt_decode(token));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const login = async (userData) => {
    try {
      const data = await loginUser(userData);
      setIsLoggedIn(true);
      // Optionally, decode the token to extract user information
      // setUser(jwt_decode(data.token));
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
    <AuthContext.Provider value={{ isLoggedIn, login, logout: logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
