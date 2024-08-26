import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/orders`;

export const checkout = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};
