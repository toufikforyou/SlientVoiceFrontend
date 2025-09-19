import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1" , 
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosSecure;
