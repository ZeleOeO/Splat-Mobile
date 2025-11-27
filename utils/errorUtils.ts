// utils/errorUtils.ts
import { Alert } from "react-native";
import * as Animatable from "react-native-animatable";

/**
 * Displays a vague error message to the user and optionally triggers a shake animation on a given Animatable.View ref.
 *
 * @param animRef Optional: A ref to an Animatable.View component that should perform the shake animation.
 * @param originalError Optional: The actual error object or message for internal logging (not displayed to the user).
 */
export const showVagueError = (
  animRef?: React.RefObject<Animatable.View & Animatable.AnimatableProperties<any>>,
  originalError?: any
) => {
  console.error("An error occurred:", originalError);

  Alert.alert(
    "Something went wrong",
    "An unexpected error occurred. Please try again later.",
    [{ text: "OK" }]
  );

  animRef?.current?.shake?.(700);
};
