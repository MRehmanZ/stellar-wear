import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const updateUserRole = async (userId, newRole) => {
  const response = await axios.put(`${API_URL}/api/admin/users/${userId}/role`, {
    role: newRole
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response;
};
