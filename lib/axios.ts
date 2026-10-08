import type { AxiosInstance } from "axios";
import Axios from "axios";

import { tokenStorage, refreshTokenStorage, storage } from "@/utils/storage";

function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return process.env.NEXT_PUBLIC_DEV_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
    }
    return process.env.NEXT_PUBLIC_API_BASE_URL || `https://${hostname}/api`;
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
}

export const API_BASE_URL = getApiBaseUrl();

export const axiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

function redirectToLogin() {
  if (typeof window === "undefined") return;
  const path = window.location.pathname.replace(/\/+$/, "");
  if (path === "/login" || path.startsWith("/login/")) return;
  window.location.href = "/login";
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url ?? "";

    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry && !url.startsWith("/auth/")) {
      const refreshToken = refreshTokenStorage.get();
      if (!refreshToken) {
        storage.clear();
        redirectToLogin();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await Axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });
        const newToken = data.accessToken;
        tokenStorage.setToken(newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        const refreshStatus = (refreshErr as { response?: { status?: number } })
          .response?.status;
        if (refreshStatus === 401 || refreshStatus === 403) {
          storage.clear();
          redirectToLogin();
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export const setAxiosDefaultToken = (token: string, instance: AxiosInstance) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAxiosDefaultToken = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};
