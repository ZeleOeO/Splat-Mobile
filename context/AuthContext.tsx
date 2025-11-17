import api, { setAccessToken } from "@/constants/api";
import { THEMES } from "@/constants/colors";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";


type User = { id?: string; username?: string; email?: string } | null;
export type ThemeName = keyof typeof THEMES;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [theme, setThemeState] = useState<ThemeName>("earthyPastel"); // Default theme changed to modernDark

  const saveTokens = async (access: string | null, refresh: string | null) => {
    if (access) await SecureStore.setItemAsync("token", access);
    else await SecureStore.deleteItemAsync("token");

    if (refresh) await SecureStore.setItemAsync("refresh_token", refresh);
    else await SecureStore.deleteItemAsync("refresh_token");

    setAccessToken(access);
  };

  const setTheme = async (newTheme: ThemeName) => {
    setThemeState(newTheme);
    await SecureStore.setItemAsync("theme", newTheme);
  };

  const login = async (username: string, password: string) => {
    const resp = await api.post("/auth/login", { username, password });
    const token = String(resp.data?.data?.token ?? resp.data?.token ?? resp.data?.accessToken);
    const refresh = String(resp.data?.data?.refresh_token ?? resp.data?.refresh_token ?? resp.data?.refreshToken ?? "");
    await saveTokens(token, refresh || null);
    await refreshUser();
  };

  const logout = async () => {
    try {
    //   await api.post("/auth/logout");
    } catch {
      // ignore server errors
    } finally {
      await saveTokens(null, null);
      setUser(null);
    }
  };

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const stored = await SecureStore.getItemAsync("token");
      if (stored) setAccessToken(stored);

      const resp = await api.get("/auth/me");
      // adapt to your backend response shape
      setUser(resp.data?.user ?? resp.data ?? null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadStoredTheme = async () => {
      const storedTheme = await SecureStore.getItemAsync("theme");
      if (storedTheme && Object.keys(THEMES).includes(storedTheme)) {
        setThemeState(storedTheme as ThemeName);
      } else {
        setThemeState("earthyPastel"); // Set default theme if stored theme is invalid or not found
      }
    };

    loadStoredTheme();
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
        theme,
        setTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
