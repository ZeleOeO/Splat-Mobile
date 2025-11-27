import React, { createContext, useContext, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';

interface ErrorContextType {
  error: string | null;
  showError: (message: string) => void;
  hideError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
  const [shakeAnimation] = useState(new Animated.Value(0));

  const showError = (message: string) => {
    setError(message);
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();

    setTimeout(() => {
      hideError();
    }, 3000); // Hide error after 3 seconds
  };

  const hideError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
      {error && (
        <Animated.View style={[
          styles.errorContainer,
          { transform: [{ translateX: shakeAnimation }] }
        ]}>
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    top: 50, // Adjust as needed
    width: Dimensions.get('window').width * 0.8,
    alignSelf: 'center',
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
