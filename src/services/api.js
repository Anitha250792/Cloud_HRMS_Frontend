import axios from "axios";

const API = axios.create({
  baseURL: "https://cloud-hrms-1.onrender.com/api/",  // LIVE BACKEND
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
