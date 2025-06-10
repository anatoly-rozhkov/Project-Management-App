import axios from "axios";

// Create an Axios instance
console.log("API URL:", import.meta.env.VITE_API_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
// TODO FIX THAT FUCKING NO REFRESH ERROR, NOW THAT TRY CATCH DOESN'T FUKCING WORK
// Handle expired tokens and retry once with refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh/"
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

    } else if (originalRequest.url === "/auth/refresh/") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload();
        return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
