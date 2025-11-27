import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SafeScreen from '@/components/SafeScreen';
import FloatingLabelInput from '@/components/FloatingLabelInput';
import AuthButton from '@/components/AuthButton';
import { useAuth } from '@/context/AuthContext';
import { getColors } from '@/constants/colors';

export default function UpdateProfile() {
  const router = useRouter();
  const { user, theme } = useAuth();
  const colors = getColors(theme);

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSaveChanges = () => {
    // Here you would typically send the updated data to your backend
    console.log('Saving changes:', { username, email });
    // After saving, navigate back to profile
    router.back();
  };

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
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 30,
      textAlign: 'center',
      marginTop: 40,
    },
    inputSpacing: {
      marginBottom: 15,
    },
    saveButtonContainer: {
        marginTop: 30,
    }
  });

  return (
    <SafeScreen colors={colors}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Update Profile</Text>

        <View style={styles.inputSpacing}>
            <FloatingLabelInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            />
        </View>
        <View style={styles.inputSpacing}>
            <FloatingLabelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            />
        </View>

        <View style={styles.saveButtonContainer}>
            <AuthButton title="Save Changes" onPress={handleSaveChanges} />
        </View>
      </View>
    </SafeScreen>
  );
}
