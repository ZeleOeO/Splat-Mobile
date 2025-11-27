import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { getColors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

type AuthButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function AuthButton({ title, onPress, disabled = false }: AuthButtonProps) {
  const { theme } = useAuth();
  const colors = getColors(theme);

  const styles = StyleSheet.create({
    button: {
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      overflow: 'hidden', // Crucial for BlurView to respect borderRadius
      // Shadows for the button
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 5,
    },
    glassyEffect: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "rgba(0, 0, 0, 0.2)", // Darker, more transparent border
      backgroundColor: disabled ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)", // Subtle dark tint
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: disabled ? colors.disabledText : colors.primaryButtonText,
      fontSize: 18,
      fontWeight: 'bold',
      zIndex: 1, // Ensure text is above blur
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <BlurView intensity={20} tint="dark" style={styles.glassyEffect}>
        <Text style={styles.buttonText}>{title}</Text>
      </BlurView>
    </TouchableOpacity>
  );
}
