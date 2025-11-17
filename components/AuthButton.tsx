import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import getColors from '@/constants/colors';
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
      backgroundColor: disabled ? colors.disabled : colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: disabled ? colors.disabledText : colors.primaryButtonText,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
