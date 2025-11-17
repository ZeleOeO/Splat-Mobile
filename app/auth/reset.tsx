import api from "@/constants/api";
import { getColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuthStyles } from "@styles/auth.styles";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
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

const ResetSchema = yup.object({
  password: yup.string().min(6, "At least 6 chars").required("Password required"),
  confirm: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm password"),
});

export default function ResetScreen() {
  const { token } = useLocalSearchParams() as { token?: string };
  const router = useRouter();
  const animRef = useRef<any>(null);
  const [secure, setSecure] = useState(true);
  const { theme } = useAuth();
  const colors = getColors(theme);
  const styles = getAuthStyles(colors);

  const { control, handleSubmit, setError, formState: { errors } } = useForm<{ password: string; confirm: string }>({
    resolver: yupResolver(ResetSchema),
    defaultValues: { password: "", confirm: "" },
  });

  const resetMutation = useMutation<AxiosResponse<any>, Error, { password: string }>({
    mutationFn: (values: { password: string }) => api.post("/auth/reset", { token, password: values.password }),
    onSuccess: () => {
      Alert.alert("Password reset", "Your password has been updated. Please sign in.");
      router.replace("/auth/login");
    },
    onError: (err: any) => {
      animRef.current?.shake?.(700);
      Alert.alert("Error", err?.response?.data?.message ?? err?.message ?? "Reset failed");
    },
  });

  const submit = (values: { password: string }) => {
    if (!token) {
      Alert.alert("Invalid link", "Reset token missing. Use the link in the email.");
      return;
    }
    resetMutation.mutate(values);
  };

  return (
    <LinearGradient colors={[colors.background, colors.surface]} style={styles.screen} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.center}>
        <Animatable.View animation="fadeInUp" duration={360} style={styles.containerFull} ref={animRef}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.titleLarge}>Reset password</Text>
          <Text style={styles.subLarge}>Set a new password for your account.</Text>

          <View>
            <Text style={styles.inputLabel}>New password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.fieldRow}>
                  <Ionicons name="lock-closed-outline" size={20} color={colors.icon} style={{ marginRight: 8 }} />
                  <TextInput
                    placeholder="New password"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={secure}
                  />
                  <TouchableOpacity onPress={() => setSecure((s) => !s)} style={{ padding: 6 }}>
                    <Ionicons name={secure ? "eye" : "eye-off"} size={20} color={colors.muted} />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password?.message ? <Text style={styles.error}>{String(errors.password.message)}</Text> : null}

            <Text style={styles.inputLabel}>Confirm new password</Text>
            <Controller
              control={control}
              name="confirm"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.fieldRow}>
                  <Ionicons name="checkmark-done-outline" size={20} color={colors.icon} style={{ marginRight: 8 }} />
                  <TextInput
                    placeholder="Confirm password"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={secure}
                  />
                </View>
              )}
            />
            {errors.confirm?.message ? <Text style={styles.error}>{String(errors.confirm.message)}</Text> : null}

            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(submit)} disabled={resetMutation.isPending}>
              {resetMutation.isPending ? <Text style={styles.loginTxt}>Setting password...</Text> : <Text style={styles.loginTxt}>Set password</Text>}
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
