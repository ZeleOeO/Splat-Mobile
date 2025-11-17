import SafeScreen from "@/components/SafeScreen";
import { getColors, THEMES, type ThemeColors } from "@/constants/colors";
import type { ThemeName } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const router = useRouter();
  const { theme, setTheme } = useAuth();
  const colors = getColors(theme);

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
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 20,
      marginBottom: 10,
    },
    themeOption: {
      padding: 15,
      marginVertical: 5,
      borderRadius: 10,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    selectedThemeOption: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    themeName: {
      fontSize: 16,
      color: colors.text,
    },
  });

  return (
    <SafeScreen colors={colors}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>

        <Text style={styles.sectionTitle}>Theme</Text>
        {/* Dropdown selector */}
        <ThemeDropdown
          themes={THEMES}
          current={theme}
          onChange={(t) => setTheme(t)}
          colors={colors}
        />
      </View>
    </SafeScreen>
  );
}

function ThemeDropdown({
  themes,
  current,
  onChange,
  colors,
}: {
  themes: Record<string, ThemeColors>;
  current: ThemeName;
  onChange: (t: ThemeName) => void;
  colors: ThemeColors;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginTop: 8 }}>
      <TouchableOpacity
        onPress={() => setOpen((s) => !s)}
        style={{
          padding: 12,
          borderRadius: 10,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 40, height: 30, borderRadius: 8, overflow: 'hidden', marginRight: 12 }}>
            <LinearGradient
              colors={(getColors(current as any).cardGradient ?? [getColors(current as any).card, getColors(current as any).card]) as any}
              style={{ flex: 1 }}
            />
          </View>
          <Text style={{ color: colors.text, fontSize: 16 }}>{String(current).charAt(0).toUpperCase() + String(current).slice(1)}</Text>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={colors.icon} />
      </TouchableOpacity>

      {open && (
        <View style={{ marginTop: 8, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: colors.border }}>
          {Object.keys(themes).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => {
                onChange(t as any);
                setOpen(false);
              }}
              style={{ flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: colors.surface }}
            >
              <View style={{ width: 36, height: 26, borderRadius: 6, overflow: 'hidden', marginRight: 12 }}>
                <LinearGradient
                  colors={(getColors(t as any).cardGradient ?? [getColors(t as any).card, getColors(t as any).card]) as any}
                  style={{ flex: 1 }}
                />
              </View>
              <Text style={{ flex: 1, color: colors.text }}>{String(t).charAt(0).toUpperCase() + String(t).slice(1)}</Text>
              {current === t && <Ionicons name="checkmark" size={18} color={colors.primary} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
