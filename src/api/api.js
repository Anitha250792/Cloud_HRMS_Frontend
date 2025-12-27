import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud-hrms-1.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------- Attach JWT ---------- */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------- Auto refresh ---------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !original._retry &&
      !original.url.includes("auth/token/refresh")
    ) {
      original._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "https://cloud-hrms-1.onrender.com/api/auth/token/refresh/",
          { refresh }
        );

        localStorage.setItem("access", res.data.access);
        original.headers.Authorization = `Bearer ${res.data.access}`;

        return api(original);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
