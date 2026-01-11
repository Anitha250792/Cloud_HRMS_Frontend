import axios from "axios";

/* -------------------------------------------------
   AXIOS INSTANCE
-------------------------------------------------- */
const api = axios.create({
  baseURL: "https://cloud-hrms-1.onrender.com/api/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------
   REQUEST INTERCEPTOR (Attach JWT)
-------------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------
   RESPONSE INTERCEPTOR (Auto Refresh Token)
-------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Network / server down
    if (!error.response) {
      console.error("Network error", error);
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // Only handle 401
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("auth/token/refresh")
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      // No refresh token → force logout
      if (!refresh) {
        logout();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "https://cloud-hrms-1.onrender.com/api/auth/token/refresh/",
          { refresh }
        );

        // Save new access token
        localStorage.setItem("access", res.data.access);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);

      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/* -------------------------------------------------
   SAFE LOGOUT (NO BLANK PAGE)
-------------------------------------------------- */
function logout() {
  localStorage.clear();
  window.location.hash = "#/login";
}


export default api;
