import { useRouter } from "expo-router";
import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuthStyles } from "@styles/auth.styles";
import { getColors } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";

export default function AuthWelcome() {
  const router = useRouter();
  const { theme } = useAuth();
  const colors = getColors(theme);
  const styles = getAuthStyles(colors);

  return (
    <LinearGradient colors={[colors.background, colors.surface]} style={styles.screen} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={styles.screen}>
        <View style={styles.center}>
          <Image source={require('@/assets/images/react-logo.png')} style={styles.illustration} resizeMode="contain" />

          <Text style={styles.titleLarge}>Welcome to Splat</Text>
          <Text style={styles.subLarge}>The best way to split expenses with friends.</Text>

          <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/auth/login')}>
            <Text style={styles.loginTxt}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerBtn} onPress={() => router.push('/auth/signup')}>
            <Text style={styles.registerTxt}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
