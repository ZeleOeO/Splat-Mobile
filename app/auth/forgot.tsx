import api from "@/constants/api";
import { getColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuthStyles } from "@styles/auth.styles";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import * as Animatable from "react-native-animatable";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";

const ForgotSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email required"),
});

export default function ForgotScreen() {
  const router = useRouter();
  const animRef = useRef<any>(null);
  const { theme } = useAuth();
  const colors = getColors(theme);
  const styles = getAuthStyles(colors);

  const { control, handleSubmit, setError, formState: { errors } } = useForm<{ email: string }>({
    resolver: yupResolver(ForgotSchema),
    defaultValues: { email: "" },
  });

  const forgotMutation = useMutation<AxiosResponse<any>, Error, { email: string }>({
    mutationFn: (values: { email: string }) => api.post("/auth/forgot", { email: values.email }),
    onSuccess: () => {
      Alert.alert(
        "Check your email",
        "If an account exists we sent password reset instructions. Follow the link to reset your password."
      );
      router.replace("/auth/login");
    },
    onError: (err: any) => {
      animRef.current?.shake?.(700);
      Alert.alert("Error", err?.response?.data?.message ?? err?.message ?? "Request failed");
    },
  });

  const submit = (values: { email: string }) => {
    forgotMutation.mutate(values);
  };

  return (
    <LinearGradient colors={[colors.background, colors.surface]} style={styles.screen} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.center}>
        <Animatable.View animation="fadeInUp" duration={380} style={styles.containerFull} ref={animRef}>
          <Text style={styles.titleLarge}>Forgot password</Text>
          <Text style={styles.subLarge}>Enter your email and we’ll send reset instructions.</Text>

          <View>
            <Text style={styles.inputLabel}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.fieldRow}>
                  <Ionicons name="mail-outline" size={20} color={colors.icon} style={{ marginRight: 8 }} />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}
            />
            {errors.email?.message ? <Text style={styles.error}>{String(errors.email.message)}</Text> : null}

            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(submit)} disabled={forgotMutation.isPending}>
              {forgotMutation.isPending ? <Text style={styles.loginTxt}>Sending...</Text> : <Text style={styles.loginTxt}>Send instructions</Text>}
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
