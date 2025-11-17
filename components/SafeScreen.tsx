import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getColors, ThemeColors } from "@/constants/colors";

const SafeScreen = ({ children, colors }: {children: React.ReactNode, colors?: ThemeColors}) => {
  const insets = useSafeAreaInsets();
  const safeColors = colors || getColors();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: 19, backgroundColor: safeColors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{flex:1}}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SafeScreen;
