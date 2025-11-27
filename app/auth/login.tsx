import { getColors } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuthStyles } from "@styles/auth.styles";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import * as yup from "yup";

const LoginSchema = yup.object({
  username: yup.string().required("Username required"),
  password: yup.string().min(6, "Password too short").required("Password required"),
});

export default function LoginScreen() {
  const router = useRouter();
  const { login, theme } = useAuth();
  const colors = getColors(theme);
  const styles = getAuthStyles(colors);
  const cardRef = useRef<any>(null);
  const [secure, setSecure] = useState(true);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ username: string; password: string }>({
    resolver: yupResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
  });

  const loginMutation = useMutation<void, Error, { username: string; password: string }>({
    mutationFn: (data: { username: string; password: string }) => login(data.username, data.password),
    onSuccess: () => {
      console.log("Login mutation SUCCESS - navigating to /home");
      router.replace("/home");
    },
    onError: () => {
      cardRef.current?.shake?.(700);
    },
  });

  const onSubmit = async (d: { username: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(d);
    } catch (err: any) {
      const data = err?.response?.data;
      if (data && typeof data === "object") {
        const fieldErrors = data.errors ?? data.fieldErrors;
        if (fieldErrors && typeof fieldErrors === "object") {
          Object.entries(fieldErrors).forEach(([k, v]) => {
            setError(k as any, { type: "server", message: String((v as any) || "") });
          });
          return;
        }
        if (data.message) {
          Alert.alert("Error", data.message);
        }
      }
    }
  };

  return (
    <LinearGradient colors={[colors.background, colors.surface]} style={styles.screen} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <KeyboardAvoidingView style={styles.center} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View ref={cardRef} style={styles.containerFull}>
          <Image source={require("@/assets/images/react-logo.png")} style={styles.illustration} resizeMode="contain" />
          <Text style={styles.titleLarge}>Let's Sign you in.</Text>
          <Text style={styles.subLarge}>Welcome back, you've been missed!</Text>

          <Text style={styles.inputLabel}>Username or Email</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldRow}>
                <Ionicons name="at-outline" size={20} color={colors.icon} style={{ marginRight: 8 }} />
                <TextInput
                  placeholder="Enter Username or Email"
                  placeholderTextColor={colors.muted}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>
            )}
          />
          {errors.username?.message ? <Text style={styles.error}>{String(errors.username.message)}</Text> : null}

          <Text style={styles.inputLabel}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldRow}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.icon} style={{ marginRight: 8 }} />
                <TextInput
                  placeholder="Enter Password"
                  placeholderTextColor={colors.muted}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={secure}
                  style={styles.input}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setSecure((s) => !s)} style={styles.eye}>
                  <Ionicons name={secure ? "eye-off" : "eye"} size={20} color={colors.muted} />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password?.message ? <Text style={styles.error}>{String(errors.password.message)}</Text> : null}

          <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onSubmit)} disabled={loginMutation.isPending}>
            {loginMutation.isPending ? <Text style={styles.loginTxt}>Loading...</Text> : <Text style={styles.loginTxt}>Login</Text>}
          </TouchableOpacity>

          <Text style={styles.subLarge}>or</Text>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-google" size={24} color="#DB4437" /></TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-linkedin" size={24} color="#0A66C2" /></TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-facebook" size={24} color="#1877F2" /></TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push("/auth/signup") }>
            <Text style={styles.link}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
