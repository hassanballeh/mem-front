import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:8080/api"; // Update with your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("eer" + error);
    return Promise.reject(error);
  }
);
export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    console.log("exp:" + decoded.exp + "  now:" + now);
    return decoded.exp < now;
  } catch (e) {
    console.log(e.message);
    // return true;
  }
}
export default api;
