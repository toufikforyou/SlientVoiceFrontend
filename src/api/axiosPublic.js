import axios from "axios";
import authToken from "../utils/authToken";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:443/api/v1",
});

// Add request interceptor to include Authorization header
axiosPublic.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage via auth utility or generate placeholder
    let token = authToken.get();
    
    if (!token) {
      // Generate and store a placeholder token for development in sessionStorage
      token = authToken.generatePlaceholder();
      authToken.set(token);
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axiosPublic.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, remove it from sessionStorage
      authToken.remove();
      console.warn('Authentication token expired or invalid - cleared from session');
    }
    return Promise.reject(error);
  }
);

export default axiosPublic;
