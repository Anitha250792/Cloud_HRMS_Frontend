import axios from "axios";

/* -------------------------------------------------
   AXIOS INSTANCE
-------------------------------------------------- */
const api = axios.create({
  baseURL: "https://cloud-hrms-1.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------
   REQUEST INTERCEPTOR (Attach JWT safely)
-------------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    // Do NOT attach token to auth endpoints
    if (
      access &&
      !config.url.includes("/auth/login/") &&
      !config.url.includes("/auth/register/") &&
      !config.url.includes("/auth/token/")
    ) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------
   RESPONSE INTERCEPTOR (Refresh token on 401)
-------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Backend unreachable
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login/") &&
      !originalRequest.url.includes("/auth/register/") &&
      !originalRequest.url.includes("/auth/token/refresh/")
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        logout();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "https://cloud-hrms-1.onrender.com/api/auth/token/refresh/",
          { refresh },
          { headers: { "Content-Type": "application/json" } }
        );

        localStorage.setItem("access", res.data.access);

        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);

      } catch (err) {
        logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

/* -------------------------------------------------
   LOGOUT (SAFE)
-------------------------------------------------- */
function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.hash = "#/login";
}

export default api;
