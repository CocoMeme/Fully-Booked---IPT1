import axios from 'axios';
import getBaseUrl from './baseURL';

export const fetchCurrentUser = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const response = await axios.get(`${getBaseUrl()}/api/current-user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    console.error('Error fetching current user:', error.message);
    throw error; 
  }
};
