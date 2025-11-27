import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';
import { getColors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

type FloatingLabelInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
};

export default function FloatingLabelInput({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useState(new Animated.Value(value === '' ? 0 : 1))[0];

  const { theme } = useAuth();
  const colors = getColors(theme);

  const styles = StyleSheet.create({
    container: {
      paddingTop: 18,
      marginBottom: 10,
    },
    labelStyle: {
      position: 'absolute',
      left: 10,
      fontSize: 16,
      color: colors.muted,
    },
    textInput: {
      height: 50,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.inputBackground,
    },
  });

  React.useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || value !== '') ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, animatedIsFocused]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = {
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.muted, colors.primary],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.labelStyle, labelStyle]}>
        {label}
      </Animated.Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        selectionColor={colors.primary}
      />
    </View>
  );
}
