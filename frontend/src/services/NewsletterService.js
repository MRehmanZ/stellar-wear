import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/newsletter`;

export const subscribeToNewsletter = async (email) => {
  const response = await axios.post(`${API_URL}/subscribe`, { email });
  return response.data;
};
