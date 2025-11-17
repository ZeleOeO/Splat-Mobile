import api from "@/constants/api";
import { getColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuthStyles } from "@styles/auth.styles";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";

const AccountSchema = yup.object({
  username: yup.string().min(3).required("Choose a username"),
  password: yup
    .string()
    .min(6, "At least 6 chars")
    .required("Password required"),
});

export default function AccountStep() {
  const router = useRouter();
  const cardRef = useRef<any>(null);
  const [signUpSecure, setSignUpSecure] = useState(true);
  const { theme } = useAuth();
  const colors = getColors(theme);
  const styles = getAuthStyles(colors);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ username: string; password: string }>({
    resolver: yupResolver(AccountSchema),
    defaultValues: { username: "", password: "" },
  });

  const [personalData, setPersonalData] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});

  useEffect(() => {
    (async () => {
      const SignupStore = await import("@/utils/SignupStore");
      const data = await SignupStore.getPersonal();
      setPersonalData(data);
    })();
  }, []);

  const signupMutation = useMutation<
    AxiosResponse<any>,
    Error,
    { username: string; password: string }
  >({
    mutationFn: async (values: { username: string; password: string }) => {
      return api.post("/auth/register", {
        username: values.username,
        password: values.password,
        first_name: personalData.firstName ?? "",
        last_name: personalData.lastName ?? "",
      });
    },
    onSuccess: () => {
      import("@/utils/SignupStore").then((s) => s.clearSignupStore());
      router.replace("/auth/login");
    },
    onError: (err: any) => {
        console.error(err);
      cardRef.current?.shake?.(700);
      const data = err?.response?.data;
      if (data && typeof data === "object") {
        const fieldErrors = data.errors ?? data.fieldErrors;
        if (fieldErrors && typeof fieldErrors === "object") {
          Object.entries(fieldErrors).forEach(([k, v]) => {
            setError(k as any, {
              type: "server",
              message: String((v as any) || ""),
            });
          });
          return;
        }
        if (data.message) Alert.alert("Error", data.message);
      }
    },
  });

  const onSubmit = (values: { username: string; password: string }) => {
    signupMutation.mutate(values);
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.screen}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.containerFull} ref={cardRef}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.titleLarge}>Create account</Text>
          <Text style={styles.subLarge}>Set username and password</Text>

          <Text style={styles.inputLabel}>Username</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldRow}>
                <Ionicons
                  name="at-outline"
                  size={20}
                  color={colors.icon}
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  placeholder="Username"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                />
              </View>
            )}
          />
          {errors.username?.message ? (
            <Text style={styles.error}>{String(errors.username.message)}</Text>
          ) : null}

          <Text style={styles.inputLabel}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldRow}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20} color={colors.icon} style={{ marginRight: 8 }} />
                <TextInput placeholder="Password" placeholderTextColor={colors.muted} style={styles.input} value={value} onChangeText={onChange} onBlur={onBlur} secureTextEntry = {signUpSecure} autoCapitalize="none"/>


                <TouchableOpacity onPress={() => setSignUpSecure((s) => !s)} style={styles.eye}>
                  <Ionicons name={signUpSecure ? "eye-off" : "eye"} size={20} color={colors.muted} />
                </TouchableOpacity>
              </View>

            )}
          />
          {errors.password?.message ? <Text style={styles.error}>{String(errors.password.message)}</Text> : null}

          <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onSubmit)} disabled={signupMutation.isPending}>
            {signupMutation.isPending ? <Text style={styles.loginTxt}>Creating account...</Text> : <Text style={styles.loginTxt}>Create account</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text style={styles.link}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}