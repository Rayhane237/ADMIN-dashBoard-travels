
import axios from "axios";

// for auth routes
export const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT_URL,
  withCredentials: true, 
});

// for admin CRUD routes
export const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let currentAccessToken = null;

export const setAccessTokenForRequests = (token) => {
    currentAccessToken = token;
};

adminAxios.interceptors.request.use((config) => {
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});

export default adminAxios;