import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  if (!config.skipAuth) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

// Handle expired tokens and retry once with refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return Promise.reject(error);
      }

      const response = await api.post("/auth/refresh/", {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      localStorage.setItem("accessToken", newAccessToken);

      // Update the header and retry the original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } else if (
      error.response &&
      error.response.status === 401 &&
      originalRequest._retry
    ) {
      // Refresh failed, force logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  }
);

export default api;
