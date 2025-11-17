import SafeScreen from "@/components/SafeScreen";
import * as ColorConstants from "@/constants/colors";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider, useIsFetching } from "@tanstack/react-query";
import { Slot } from "expo-router";
import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const client = new QueryClient();
const { width, height } = Dimensions.get("window");

function GlobalUI({ colors }: { colors: ColorConstants.ThemeColors }) {
  const { isLoading: authLoading } = useAuth();
  const fetching = useIsFetching();
  const visible = authLoading || fetching > 0;

  const dynamicStyles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(8,15,30,0.12)",
      zIndex: 9999,
    },
    blurBox: {
      minWidth: 180,
      padding: 18,
      borderRadius: 14,
      backgroundColor: "rgba(255,255,255,0.94)",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 12,
    },
    loadingText: {
      marginTop: 10,
      color: colors.muted,
      fontSize: 13,
    },
  });

  return visible ? (
    <View style={dynamicStyles.overlay} pointerEvents="auto">
      <View style={dynamicStyles.blurBox}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={dynamicStyles.loadingText}>{authLoading ? "Signing in..." : "Loading..."}</Text>
      </View>
    </View>
  ) : null;
}

function ThemedApp() {
  const { theme } = useAuth();
  const colors = ColorConstants.getColors(theme);
  const displayColors = colors || ColorConstants.getColors();

  return (
    <SafeScreen colors={displayColors}>
      <Slot />
      <GlobalUI colors={displayColors} />
    </SafeScreen>
  );
}

export default function RootLayout() {
  const { width, height } = Dimensions.get("window");
  const defaultColors = ColorConstants.getColors("earthyPastel");

  return (
    <SafeAreaProvider>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: defaultColors.background }]}>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <ThemedApp />
          </AuthProvider>
        </QueryClientProvider>
      </View>
    </SafeAreaProvider>
  );
}



