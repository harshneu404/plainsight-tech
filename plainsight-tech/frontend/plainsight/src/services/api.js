import axios from 'axios';

/**
 * Axios instance configuration with default settings
 * Includes interceptors for authentication and error handling
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


// Request interceptor for API calls
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
