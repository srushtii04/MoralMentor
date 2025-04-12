// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
  withCredentials: true, // To send cookies (JWT token) with each request
});

export default axiosInstance;
