import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export async function logout() {
  try {
    await SecureStore.deleteItemAsync("jwt_token");
    await SecureStore.deleteItemAsync("refresh_token");

    router.replace("/auth/login");

  } catch (error) {
    Alert.alert("Failed to log user out. Please try again");
    console.error("Logout failed:", error);
  }
}
