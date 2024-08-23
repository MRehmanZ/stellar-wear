import axios from 'axios';

const API_URL = 'https://localhost:7233/api/account';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response || error.message);
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Ensure this is storing the token correctly
    }
    if (response.data.userId) {
      localStorage.setItem('userId', response.data.userId); // Store UserId
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error.message);
    throw error.response?.data || error.message;
  }
};


export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('token'); // Remove the token from localStorage on logout
    localStorage.removeItem('userId'); // Remove the userId from localStorage on logout
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response || error.message);
    throw error.response?.data || error.message;
  }
};

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add the token to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration or invalid token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token has expired or is invalid
      localStorage.removeItem('token'); // Clear the token from localStorage
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export const getProtectedData = async () => {
  const response = await api.get('/protected-data');
  return response.data;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};
