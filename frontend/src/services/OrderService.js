// services/OrderService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/order`;

export const getOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const ADDRESS_API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/address`;

export const getCurrentOrderAddress = async (id) => {
  const response = await axios.get(`${ADDRESS_API_URL}/${id}`, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};

