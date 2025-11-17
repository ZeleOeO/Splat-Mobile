import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeColors } from "@/constants/colors";

type TopNavProps = {
  onSetting?: () => void;
  onProfile?: () => void;
  colors: ThemeColors;
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 20, // Slightly more vertical padding
      backgroundColor: colors.background, // Match app background
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontSize: 26, // Slightly larger logo
      fontWeight: "800", // Bolder
      color: colors.text, // White text
    },
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 25, // Slightly more gap between icons
    },
    iconButton: {
      padding: 5,
    },
    icon: {
      fontSize: 24, // Keep icon size
      color: colors.textLight, // Use a lighter text for icons for subtle contrast
    },
  });

export default function TopNav({onSetting: onSetting, onProfile, colors}: TopNavProps) {
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SPLAT</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onSetting} style={styles.iconButton}>
        <Feather name="settings" color={colors.icon} size={24} style={styles.icon}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={onProfile} style={styles.iconButton}>
        <SimpleLineIcons name="user" color={colors.icon} size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
