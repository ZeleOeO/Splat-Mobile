import SafeScreen from "@/components/SafeScreen";
import { getColors } from "@/constants/colors"; // Removed THEMES import
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const { user, logout, theme } = useAuth(); // Removed setTheme
  const colors = getColors(theme);
  const doLogout = async () => {
    await logout();
    router.replace("/auth/login");
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 1,
      padding: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
      marginTop: 40,
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    detailLabel: {
      fontSize: 16,
      color: colors.textLight,
    },
    detailValue: {
      fontSize: 16,
      color: colors.text,
      fontWeight: "bold",
    },
    // New styles for App Appearance button (reusing updateProfileButton styles)
    appAppearanceButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: colors.secondary, // Using secondary for contrast
        alignItems: "center",
    },
    appAppearanceButtonText: {
        color: colors.secondaryButtonText,
        fontSize: 18,
        fontWeight: "bold",
    },
    // Existing styles for Update Profile button
    updateProfileButton: {
      marginTop: 20,
      padding: 15,
      borderRadius: 10,
      backgroundColor: colors.primary,
      alignItems: "center",
    },
    updateProfileButtonText: {
      color: colors.primaryButtonText,
      fontSize: 18,
      fontWeight: "bold",
    },
    logoutButton: {
      marginTop: 30,
      padding: 15,
      borderRadius: 10,
      backgroundColor: colors.dangerButton,
      alignItems: "center",
    },
    logoutButtonText: {
      color: colors.dangerButtonText,
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  return (
    <SafeScreen colors={colors}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Username:</Text>
          <Text style={styles.detailValue}>{user?.username}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{user?.email}</Text>
        </View>

        {/* App Appearance Button */}
        <TouchableOpacity style={styles.appAppearanceButton} onPress={() => router.push("/home/app-appearance")}>
          <Text style={styles.appAppearanceButtonText}>App Appearance</Text>
        </TouchableOpacity>

        {/* Update Profile Button */}
        <TouchableOpacity style={styles.updateProfileButton} onPress={() => router.push("/home/update-profile")}>
          <Text style={styles.updateProfileButtonText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={doLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}
