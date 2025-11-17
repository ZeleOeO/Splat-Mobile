import * as ColorConstants from "@/constants/colors";
import { convertDueDate, getNoOfDays } from "@/utils/DateUtils";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SplitCardProps = {
  title: string;
  amount: number;
  description: string;
  status: string;
  category: string;
  due_date: string;
  onShare?: () => void;
  onRemind?: () => void;
  colors: ColorConstants.ThemeColors;
};


export default function SplitCard({
  title,
  amount,
  description,
  status,
  category,
  due_date,
  onShare,
  onRemind,
  colors,
}: SplitCardProps) {
  const date = convertDueDate(due_date);
  const remainingDays = getNoOfDays(date);
  let statusColor: string;
  let statusIcon: keyof typeof MaterialCommunityIcons.glyphMap;

  switch (status) {
    case "paid":
      statusColor = colors.success;
      statusIcon = "check-circle-outline";
      break;
    case "cancelled":
      statusColor = colors.dangerButtonText;
      statusIcon = "close-circle-outline";
      break;
    case "open":
    default:
      statusColor = colors.info;
      statusIcon = "information-outline";
      break;
  }

  const dueColor = remainingDays < 0 ? colors.error : colors.onPrimary;

  const styles = createStyles(colors);

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.gradientBackground}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          <View style={styles.amountContainer}>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Text style={styles.currencySymbol}>$</Text>
              <Text style={styles.amountValue}>{amount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{description}</Text>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.statusContainer}>
            <MaterialCommunityIcons
              name={statusIcon}
              size={16}
              color={statusColor}
            />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {status.toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.dueDateText, { color: dueColor }]}>
            {remainingDays === 0
              ? "DUE TODAY"
              : remainingDays > 0
              ? `DUE IN ${remainingDays} DAY(S)`
              : `OVERDUE BY ${Math.abs(remainingDays)} DAY(S)`}
          </Text>
        </View>

        {/* Optional Actions */}
        {(onShare || onRemind) && (
          <View style={styles.actionsContainer}>
            {onShare && (
              <TouchableOpacity onPress={onShare} style={styles.actionButton}>
                    <Ionicons name="share-social-outline" size={18} color={colors.icon} />
              </TouchableOpacity>
            )}
            {onRemind && (
              <TouchableOpacity onPress={onRemind} style={styles.actionButton}>
                <MaterialCommunityIcons name="bell-ring-outline" size={18} color={colors.icon} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const createStyles = (colors: ColorConstants.ThemeColors) =>
  StyleSheet.create({
    cardWrapper: {
      borderRadius: 18,
      marginVertical: 10,
      width: 280, // Slightly smaller width to allow more cards to be visible
      height: 300, // Fixed height for uniform card size
      marginRight: 15,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
      overflow: "hidden",
    },
    gradientBackground: {
      backgroundColor: colors.card,
      flex: 1,
      padding: 20,
      justifyContent: 'space-between', // Distribute content vertically
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start", // Align to start for title and amount
      marginBottom: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      flexShrink: 1,
      marginRight: 10,
    },
    amountContainer: {
      alignItems: "flex-end", // Align amount to the right
    },
    amountValue: {
      fontSize: 32, // Slightly larger amount
      fontWeight: "bold",
      color: colors.text, // Use text for amount to ensure contrast
    },
    currencySymbol: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    description: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.8,
      marginBottom: 15,
      lineHeight: 20,
    },
    categoryBadge: {
      backgroundColor: colors.surface, // Use surface color for a subtle badge
      borderRadius: 15,
      paddingHorizontal: 12,
      paddingVertical: 6,
      alignSelf: "flex-start",
      marginBottom: 15,
    },
    categoryText: {
      fontSize: 11,
      fontWeight: "600",
      color: colors.text, // Use regular text color for category
      textTransform: "uppercase",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface, // Subtle background for status
      borderRadius: 15,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    statusText: {
      fontSize: 13,
      fontWeight: "bold",
      marginLeft: 5,
      textTransform: "uppercase",
    },
    dueDateText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.text,
      opacity: 0.7,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      marginTop: 15,
    },
    actionButton: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: colors.surface, // Background for action buttons
      marginLeft: 10,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    actionIcon: {
      fontSize: 18,
      color: colors.icon,
    },
  });
