import axios from 'axios';

const API_URL = 'https://localhost:7233/api/account'; // Replace with your actual API endpoint

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response || error.message);
    throw error.response?.data || error.message;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error.message);
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response || error.message);
    throw error.response?.data || error.message;
  }
};
