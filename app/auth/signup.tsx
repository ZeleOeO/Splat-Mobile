import { getColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuthStyles } from "@styles/auth.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { InferType } from "yup";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useAuth();
  const colors = getColors(theme);
  const styles = getAuthStyles(colors);

  const schema = yup.object({
    firstName: yup.string().required("First name required"),
    lastName: yup.string().required("Last name required"),
    email: yup.string().email("Invalid email").notRequired(),
  });

  type FormValues = InferType<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: { firstName: "", lastName: "", email: undefined } as any,
  });

  const onNext: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    const store = await import("@/utils/SignupStore");
    await store.setPersonal({
      firstName: values.firstName,
      lastName: values.lastName,
      email: (values.email ?? undefined) as string | undefined,
    });
    router.push("/auth/account");
    setIsLoading(false);
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.screen}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.center}
      >
        <View style={styles.containerFull}>
          <Text style={styles.titleLarge}>Tell us about you</Text>
          <Text style={styles.subLarge}>Let's get to know you better.</Text>

          <Text style={styles.inputLabel}>First name</Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldRow}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={colors.icon}
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  placeholder="First name"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </View>
            )}
          />
          {errors.firstName?.message ? (
            <Text style={styles.error}>{String(errors.firstName.message)}</Text>
          ) : null}

          <Text style={styles.inputLabel}>Last name</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldRow}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={colors.icon}
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  placeholder="Last name"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </View>
            )}
          />
          {errors.lastName?.message ? (
            <Text style={styles.error}>{String(errors.lastName.message)}</Text>
          ) : null}

          <Text style={styles.inputLabel}>Email (optional)</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.fieldRow}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.icon}
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                  value={(value ?? "") as string}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            )}
          />
          {errors.email?.message ? (
            <Text style={styles.error}>{String(errors.email.message)}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleSubmit(onNext as any)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.text} />
            ) : (
              <Text style={styles.loginTxt}>Next</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
