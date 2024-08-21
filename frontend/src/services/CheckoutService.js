import axios from 'axios';

const API_URL = 'http://localhost:7233/api/orders';

export const checkout = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};
