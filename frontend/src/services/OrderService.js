// services/OrderService.js
import axios from 'axios';

const API_URL = 'https://localhost:7233/api/order';

export const getOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
