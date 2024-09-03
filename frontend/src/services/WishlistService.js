import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/wishlist`;

export const addToWishlist = async (productId) => {
  const response = await axios.post(`${API_URL}/add`, { productId }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await axios.delete(`${API_URL}/remove/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  console.log(response.data)
  return response.data;
};

export const getWishlist = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
