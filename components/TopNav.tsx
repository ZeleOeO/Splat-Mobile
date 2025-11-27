import { ThemeColors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { BlurView } from "expo-blur";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TopNavProps = {
  onNotification?: () => void;
  onProfile?: () => void;
  colors: ThemeColors;
  userName: string;
  profileImageUrl?: string;
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 15, // Increased padding
      paddingVertical: 10, // Increased padding
      backgroundColor: colors.background,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    profileImage: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary, // Placeholder background
      justifyContent: "center",
      alignItems: "center",
    },
    greetingContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    helloText: {
      color: colors.textLight,
      fontSize: 16,
    },
    userNameText: {
      fontSize: 22, // Larger for emphasis
      fontWeight: "800",
      color: colors.text,
    },
    // Existing styles
    logo: {
      // This seems to be used for userName, will repurpose userNameText
      fontSize: 26,
      fontWeight: "800",
      color: colors.text,
    },
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 25,
    },
    iconButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
    glassyBackground: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 22,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "rgba(0, 0, 0, 0.2)",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      fontSize: 24,
      color: colors.textLight,
      backgroundColor: "transparent",
    },
  });

export default function TopNav({
  onNotification,
  onProfile,
  colors,
  userName,
  profileImageUrl,
}: TopNavProps) {
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <TouchableOpacity onPress={onProfile}>
          <BlurView intensity={20} tint="dark" style={styles.iconButton}>
            {profileImageUrl ? (
              <Image
                source={{ uri: profileImageUrl }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImage}>
                <SimpleLineIcons
                  name="user"
                  color={colors.text} // Use text color for placeholder icon
                  size={24}
                />
              </View>
            )}
          </BlurView>
        </TouchableOpacity>
        <View>
          <Text style={styles.helloText}>Hello 👋</Text>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onNotification} style={styles.iconButton}>
          <Feather
            name="bell" // Changed to bell icon for notifications
            color={colors.icon}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
