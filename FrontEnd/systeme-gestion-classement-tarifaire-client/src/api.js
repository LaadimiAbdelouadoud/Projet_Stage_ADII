import axios from 'axios';
import BaseURL from './BaseURL';

const api = axios.create({
  baseURL: BaseURL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
  
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error responses, such as token expiration
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token logic
      localStorage.removeItem('jwt');
      window.location.href = '/login'; // Or any other logic
    }
    return Promise.reject(error);
  }
);

export default api;
