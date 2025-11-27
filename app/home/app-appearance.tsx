import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SafeScreen from '@/components/SafeScreen';
import { getColors, THEMES } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function AppAppearance() {
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
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 30,
      textAlign: 'center',
      marginTop: 40,
    },
    themeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 15,
    },
    themeCard: {
      width: '47%', // Roughly half width, accounting for gap
      aspectRatio: 1, // Make cards square
      borderRadius: 15,
      borderWidth: 2,
      borderColor: 'transparent',
      overflow: 'hidden',
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    selectedThemeCard: {
      borderColor: colors.primary,
    },
    themeCardContent: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: 10,
    },
    themeName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF', // Always white text on theme cards for contrast
      textShadowColor: 'rgba(0,0,0,0.7)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    colorSwatchContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    colorSwatch: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: 5,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.5)',
    }
  });

  return (
    <SafeScreen colors={colors}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>App Appearance</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.themeGrid}>
            {Object.entries(THEMES).map(([themeName, themeColors]) => (
              <TouchableOpacity
                key={themeName}
                style={[
                  styles.themeCard,
                  themeName === theme && styles.selectedThemeCard,
                ]}
                onPress={() => setTheme(themeName as any)}
              >
                {/* Visual representation of the theme */}
                <View style={[styles.themeCardContent, { backgroundColor: themeColors.primary }]}>
                    <Text style={styles.themeName}>
                        {themeName.replace(/([A-Z])/g, ' $1').trim()}
                    </Text>
                    <View style={styles.colorSwatchContainer}>
                        <View style={[styles.colorSwatch, { backgroundColor: themeColors.primary }]} />
                        <View style={[styles.colorSwatch, { backgroundColor: themeColors.secondary }]} />
                        <View style={[styles.colorSwatch, { backgroundColor: themeColors.background }]} />
                    </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
