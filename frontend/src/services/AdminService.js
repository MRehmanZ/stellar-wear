import axios from 'axios';

export const fetchUsers = async () => {
  const response = await axios.get('https://localhost:7233/api/admin/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const updateUserRole = async (userId, newRole) => {
  const response = await axios.put(`https://localhost:7233/api/admin/users/${userId}/role`, {
    role: newRole
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response;
};
