import axios, { InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const API_BASE = "https://harvey-bradyauxetic-atomically.ngrok-free.dev";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  // prefer in-memory token to avoid async read on every request
  if (accessToken) {
    // merge headers safely and satisfy TS types
    config.headers = {
      ...(config.headers as Record<string, string> | undefined),
      Authorization: `Bearer ${accessToken}`,
    } as any;
  } else {
    // fallback: try reading from SecureStore once (kept minimal)
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      setAccessToken(token);
      config.headers = {
        ...(config.headers as Record<string, string> | undefined),
        Authorization: `Bearer ${token}`,
      } as any;
    }
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  originalRequest: any;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status ?? error.response?.data?.status;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, originalRequest });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refresh_token");
        if (!refreshToken) throw new Error("No refresh token");

        // Use plain axios (no interceptors) to avoid recursion
        const refreshResp = await axios.post(
          `${API_BASE}/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccessToken =
          String(refreshResp.data?.data?.token ?? refreshResp.data?.token ?? refreshResp.data?.accessToken);

        // persist and set in-memory
        await SecureStore.setItemAsync("token", newAccessToken);
        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // clear stored tokens and redirect to login
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("refresh_token");
        try {
          router.replace("/auth/login");
        } catch {
          /* ignore router errors */
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
