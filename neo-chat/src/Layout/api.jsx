import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const MAX_RETRY_LIMIT = 3;
let retryCount = 0;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (retryCount >= MAX_RETRY_LIMIT) {
        console.error("Max retry limit reached. No further retries.");
        return Promise.reject(error);
      }

      originalRequest._retry = true; 
      retryCount += 1; 

      try {
        await api.post("/users/refresh-token"); 
        return api(originalRequest); 
      } catch (err) {
        console.error("Token refresh failed", err);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error); 
  }
);

export default api;
