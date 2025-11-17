import BalanceCard from "@/components/BalanceCard";
import SafeScreen from "@/components/SafeScreen";
import SplitCard from "@/components/SplitCard";
import TopNav from "@/components/TopNav";
import * as ColorConstants from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import { mockSplits } from "@/mocks/MockSplits";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


export default function HomeScreen() {
  const router = useRouter();
  const { theme, user } = useAuth(); // Get user from auth context
  const colors = ColorConstants.getColors(theme);
  const styles = createStyles(colors);

  const userName = user?.username || "John"; // Default to "John" if username is not available

  return (
    <SafeScreen colors={colors}>
      <TopNav
        onSetting={() => router.push("/home/settings")}
        onProfile={() => router.push("/home/profile")}
        colors={colors}
      ></TopNav>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[styles.headerGradient, { backgroundColor: colors.background }]}
        >
          <Text style={styles.greetingText}>Welcome back, {userName}!</Text>
          <Text style={styles.greetingSubText}>
            Here's an overview of your financial activity.
          </Text>
        </View>

        <View style={styles.contentArea}>
          <BalanceCard
            balance={10047.39}
            onNewSplitPress={() => {
              console.log("New Split from Home Screen");
            }}
            colors={colors}
          />

          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="receipt" size={26} color={colors.icon} />
            <Text style={styles.subtitle}>Recent Splits</Text>
          </View>
          {mockSplits.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalSplitList}
            >
              {mockSplits.map((split, idx) => (
                <View key={idx} style={styles.splitCardWrapper}>
                  <SplitCard
                    title={split.title}
                    amount={split.amount}
                    description={split.description}
                    status={split.status}
                    category={split.category}
                    due_date={split.due_date}
                    onShare={() => console.log("Share", split.title)}
                    onRemind={() => console.log("Remind", split.title)}
                    colors={colors}
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyStateContainer}>
              <MaterialCommunityIcons name="information-outline" size={50} color={colors.muted} />
              <Text style={styles.emptyStateText}>
                No splits yet. Start by creating a new one!
              </Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => console.log("Create New Split from Empty State")}
              >
                <Text style={styles.emptyStateButtonText}>Create New Split</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Additional sections can be added here, e.g., "Upcoming Bills" */}
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const createStyles = (colors: ColorConstants.ThemeColors) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerGradient: {
      paddingHorizontal: 20,
      paddingTop: 60, // Adjust for status bar and top nav
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      marginBottom: 20,
      overflow: "hidden", // Ensures borderRadius crops the gradient
      // Apply a shadow for depth, similar to cards
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 15,
    },
    greetingText: {
      fontSize: 38,
      fontWeight: "bold",
      color: colors.text, // use theme text color for better contrast across themes
      marginBottom: 5,
      letterSpacing: 0.5,
    },
    greetingSubText: {
      fontSize: 18,
      color: colors.textLight,
      opacity: 0.95,
    },
    contentArea: {
      paddingHorizontal: 0, // Cards have their own horizontal margin
      flex: 1,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      marginTop: 30,
      paddingHorizontal: 20,
    },
    subtitle: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
      marginLeft: 10,
    },
    horizontalSplitList: {
      paddingHorizontal: 15, // Adjusted padding for the scrollable area
      paddingVertical: 10,
    },
    splitCardWrapper: {
      marginRight: 10, // Space between split cards
    },
    // Styles for an empty state or message
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyStateText: {
      color: colors.textLight,
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
    },
    emptyStateButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 25,
      marginTop: 20,
    },
    emptyStateButtonText: {
      color: colors.onPrimary,
      fontWeight: 'bold',
      fontSize: 16,
    },
  })
