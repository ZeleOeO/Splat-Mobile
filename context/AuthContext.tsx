import { login as apiLogin, getUserProfile, setAccessToken } from "@/constants/api";
import { THEMES } from "@/constants/colors";
import { User } from "@/types/types";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useError } from "../context/ErrorContext";


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
  const { showError } = useError();

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
    try {
      const loginResult = await apiLogin(username, password);
      return loginResult;
    } catch (error) {
      showError("Error logging in. Please check your credentials.");
      throw error; // Re-throw the error to propagate it
    }
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

        const fetchedUser = (await getUserProfile());
        console.log("Fetched user profile:", fetchedUser);
      setUser(fetchedUser); // Set user state
      console.log("User set in state:", fetchedUser);
    } catch (error: any) {
      console.error("Error refreshing user:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
      showError("An error occurred while fetching user data.");
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
