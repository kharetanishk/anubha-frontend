import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// ========= ADD ACCESS TOKEN TO ALL REQUESTS ==========
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============= REFRESH TOKEN LOGIC =============
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  failedQueue = [];
};

// ============= MAIN INTERCEPTOR =============
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            return api(original);
          })
          .catch(Promise.reject);
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("Missing Refresh Token");

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        const newAccess = res.data.accessToken;

        // 🔥 UPDATE ACCESS TOKEN THROUGH AUTH CONTEXT
        if (
          typeof window !== "undefined" &&
          (window as any).updateAccessToken
        ) {
          (window as any).updateAccessToken(newAccess);
        }

        isRefreshing = false;
        processQueue(null, newAccess);

        // Retry original request with new token
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        // Logout
        localStorage.clear();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
