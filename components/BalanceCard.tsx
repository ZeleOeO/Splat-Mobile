import { ThemeColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BalanceCardProps {
  balance: number;
  onNewSplitPress: () => void;
  colors: ThemeColors;
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    cardContainer: {
      borderRadius: 20,
      marginHorizontal: 15,
      marginTop: 20,
      marginBottom: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 15,
      elevation: 10,
      overflow: "hidden",
    },
    card: {
      width: "100%",
      minHeight: 180,
      padding: 25,
      borderRadius: 20,
      justifyContent: "space-between",
      position: "relative",
    },
    balanceInfo: {
      alignItems: "flex-start",
      flex: 1,
      justifyContent: "center",
    },
    balanceLabel: {
      color: colors.onPrimary,
      fontSize: 14,
      opacity: 0.8,
      marginBottom: 16,
      fontFamily: "System",
    },
    balanceAmount: {
      fontSize: 38,
      fontWeight: "bold",
      color: colors.onPrimary,
      fontFamily: "System",
      letterSpacing: 0.5,
    },
    hiddenBalance: {
      fontSize: 34,
      fontWeight: "bold",
      color: colors.onPrimary,
      fontFamily: "System",
      letterSpacing: 2,
    },
    toggleButton: {
      position: "absolute",
      top: 25,
      right: 25,
      zIndex: 1,
      padding: 5,
    },
    newSplitButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.onPrimary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      alignSelf: "flex-end",
      marginTop: 15,
    },
    newSplitButtonText: {
      color: colors.primary,
      fontWeight: "700",
      fontSize: 16,
      fontFamily: "System",
      marginLeft: 8,
    },
  });

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  onNewSplitPress,
  colors,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const styles = createStyles(colors);

  const formatBalance = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={colors.cardGradient as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >

        <TouchableOpacity onPress={() => setShowBalance(!showBalance)} style={[styles.toggleButton, { flexDirection: "row", alignItems: "center" }]}>
          <MaterialCommunityIcons
            name={showBalance ? "eye" : "eye-off"}
            size={20}
            color={colors.onPrimary}
          />
          <Text style={{ color: colors.onPrimary, marginLeft: 5, fontSize: 14 }}>
            {showBalance ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>

        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={showBalance ? styles.balanceAmount : styles.hiddenBalance}>
            {showBalance ? formatBalance(balance) : "$*****"}
          </Text>
        </View>

        <TouchableOpacity onPress={onNewSplitPress} style={styles.newSplitButton}>
          <Ionicons name="add" size={24} color={colors.primary} />
          <Text style={styles.newSplitButtonText}>New Split</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default BalanceCard;

