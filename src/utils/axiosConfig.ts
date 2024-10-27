import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Function to get the token (puedes cambiar esto según tu implementación)
const getToken = () => {
  return localStorage.getItem("token"); // O cualquier otro método para obtener el token
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add custom headers or tokens here
    // config.headers['Authorization'] = 'Bearer your_token';
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Error response:", error.response);
    } else if (error.request) {
      // No response was received
      console.error("Error request:", error.request);
    } else {
      // Something else caused the error
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
