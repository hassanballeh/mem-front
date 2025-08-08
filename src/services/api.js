import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import jwt_decode from "jwt-decode";
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
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.error("API Error:", error.response.data);
//       // Reject the promise with a structured error
//       return Promise.reject({
//         message: error.response.data?.message || "An error occurred",
//         status: error.response.status,
//         data: error.response.data,
//       });
//     } else if (error.request) {
//       console.error("API Error:", error.request);
//       return Promise.reject({ message: "No response from server" });
//     } else {
//       console.error("API Error:", error.message);
//       return Promise.reject({ message: error.message });
//     }
//   }
// );

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
