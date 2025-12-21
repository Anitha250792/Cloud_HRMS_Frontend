import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud-hrms-1.onrender.com/api",
});

/* ---------- Attach access token ---------- */
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

/* ---------- Auto refresh JWT ---------- */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) =>
    error ? p.reject(error) : p.resolve(token)
  );
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        localStorage.clear();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization =
            "Bearer " + token;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          "https://cloud-hrms-1.onrender.com/api/auth/token/refresh/",
          { refresh }
        );

        localStorage.setItem("access", res.data.access);
        processQueue(null, res.data.access);
        isRefreshing = false;

        originalRequest.headers.Authorization =
          "Bearer " + res.data.access;
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        isRefreshing = false;
        localStorage.clear();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
