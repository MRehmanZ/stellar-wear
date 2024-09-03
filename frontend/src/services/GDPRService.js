import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/gdpr`;

export const getUserData = async () => {
  const response = await axios.get(`${API_URL}/get-user-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const updateUserData = async (userData) => {
  const response = await axios.put(`${API_URL}/update-user-data`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const deleteUserData = async () => {
  const response = await axios.delete(`${API_URL}/delete-user-data`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
