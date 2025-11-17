export interface ThemeColors {
  primary: string;
  primaryVariant: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;

  onPrimary: string;
  onSecondary: string;
  onBackground: string;
  onSurface: string;
  onError: string;

  text: string;
  textLight: string;
  descriptionText: string;

  card: string;
  cardGradient: string[];
  shadow: string;
  border: string;
  borderLight: string;
  inputBackground: string;
  inputBorder: string;
  icon: string;
  highlight: string;

  primaryButton: string;
  primaryButtonText: string;
  secondaryButton: string;
  secondaryButtonText: string;
  dangerButton: string;
  dangerButtonText: string;
  disabled: string;
  disabledText: string;

  positive: string;
  negative: string;
  due: string;
  paid: string;
  success: string;
  warning: string;
  info: string;

  placeholder: string;
  muted: string;
  overlay: string;
}

/* -----------------------------------------------------
   1. Earthy Pastel Theme
----------------------------------------------------- */

const earthyPastelTheme: ThemeColors = {
  primary: "#99b06f",
  primaryVariant: "#c6d99a",
  secondary: "#d4a373",
  background: "#f3f4f6",
  surface: "#ffffff",
  error: "#d4a373",

  onPrimary: "#0b1422",
  onSecondary: "#1a1a1a",
  onBackground: "#1a1a1a",
  onSurface: "#1a1a1a",
  onError: "#000000",

  text: "#0b1422",
  textLight: "#2b3340",
  descriptionText: "#6b6b6b",

  card: "#ffffff",
  cardGradient: ["#eaf5d8", "#cfe6b3", "#ffffff"],
  shadow: "rgba(0,0,0,0.18)",
  border: "#e9edc9",
  borderLight: "#fefae0",
  inputBackground: "#fffaf0",
  inputBorder: "#e9edc9",
  icon: "#444",
  highlight: "#d4a373",

  primaryButton: "#ccd5ae",
  primaryButtonText: "#1a1a1a",
  secondaryButton: "#d4a373",
  secondaryButtonText: "#1a1a1a",
  dangerButton: "#d4a373",
  dangerButtonText: "#000000",
  disabled: "#e9edc9",
  disabledText: "#888",

  positive: "#88b04b",
  negative: "#d9534f",
  due: "#d4a373",
  paid: "#88b04b",
  success: "#88b04b",
  warning: "#d4a373",
  info: "#ccd5ae",

  placeholder: "#b0b0b0",
  muted: "#6b7280",
  overlay: "rgba(0,0,0,0.25)",
};

/* -----------------------------------------------------
   2. Nautical / Deep Blue Theme
----------------------------------------------------- */

const nauticalDarkTheme: ThemeColors = {
  primary: "#0f3458",
  primaryVariant: "#07203a",
  secondary: "#8da9c4",
  background: "#061626",
  surface: "#0c2a44",
  error: "#e63946",

  onPrimary: "#ffffff",
  onSecondary: "#0b2545",
  onBackground: "#eef4ed",
  onSurface: "#eef4ed",
  onError: "#ffffff",

  text: "#f5fbff",
  textLight: "#cfe6f7",
  descriptionText: "#aabac6",

  card: "#0b2545",
  cardGradient: ["#113558", "#0b2545", "#082333"],
  shadow: "rgba(0,0,0,0.6)",
  border: "#134074",
  borderLight: "#8da9c4",
  inputBackground: "#13315c",
  inputBorder: "#8da9c4",
  icon: "#eef4ed",
  highlight: "#8da9c4",

  primaryButton: "#134074",
  primaryButtonText: "#ffffff",
  secondaryButton: "#8da9c4",
  secondaryButtonText: "#0b2545",
  dangerButton: "#e63946",
  dangerButtonText: "#ffffff",
  disabled: "#13315c",
  disabledText: "#6f7a89",

  positive: "#4caf50",
  negative: "#e63946",
  due: "#ffc107",
  paid: "#4caf50",
  success: "#4caf50",
  warning: "#ffc107",
  info: "#8da9c4",

  placeholder: "#9ebfda",
  muted: "#8aa0b6",
  overlay: "rgba(0,0,0,0.6)",
};

/* -----------------------------------------------------
   3. Botanical Green Theme
----------------------------------------------------- */

const botanicalTheme: ThemeColors = {
  primary: "#0d4f3b",
  primaryVariant: "#0b3b2d",
  secondary: "#2aa88f",
  background: "#eef3f0",
  surface: "#ffffff",
  error: "#b00020",

  onPrimary: "#ffffff",
  onSecondary: "#ffffff",
  onBackground: "#1a1a1a",
  onSurface: "#1a1a1a",
  onError: "#ffffff",

  text: "#0b1422",
  textLight: "#3b4752",
  descriptionText: "#6b6b6b",

  card: "#ffffff",
  cardGradient: ["#0d4f3b", "#2aa88f", "#ffffff"],
  shadow: "rgba(0,0,0,0.18)",
  border: "#6ab29b",
  borderLight: "#e4d5c7",
  inputBackground: "#ffffff",
  inputBorder: "#6ab29b",
  icon: "#186049",
  highlight: "#247156",

  primaryButton: "#186049",
  primaryButtonText: "#ffffff",
  secondaryButton: "#6ab29b",
  secondaryButtonText: "#ffffff",
  dangerButton: "#b00020",
  dangerButtonText: "#ffffff",
  disabled: "#e4d5c7",
  disabledText: "#999",

  positive: "#4caf50",
  negative: "#e53935",
  due: "#ffa726",
  paid: "#4caf50",
  success: "#4caf50",
  warning: "#ffa726",
  info: "#6ab29b",

  placeholder: "#7ea69a",
  muted: "#5f7368",
  overlay: "rgba(0,0,0,0.1)",
};

/* -----------------------------------------------------
   4. Vibrant Coastal Theme
----------------------------------------------------- */

const vibrantTheme: ThemeColors = {
  primary: "#1786a4",
  primaryVariant: "#032b40",
  secondary: "#ffb703",
  background: "#021826",
  surface: "#042b3a",
  error: "#fb8500",

  onPrimary: "#ffffff",
  onSecondary: "#023047",
  onBackground: "#ffffff",
  onSurface: "#ffffff",
  onError: "#ffffff",

  text: "#ffffff",
  textLight: "#e6f7fb",
  descriptionText: "#aac6d8",

  card: "#052f3f",
  cardGradient: ["#7bd1ea", "#2ea0c2", "#052f3f"],
  shadow: "rgba(0,0,0,0.6)",
  border: "#219ebc",
  borderLight: "#8ecae6",
  inputBackground: "#02394f",
  inputBorder: "#219ebc",
  icon: "#8ecae6",
  highlight: "#ffb703",

  primaryButton: "#219ebc",
  primaryButtonText: "#ffffff",
  secondaryButton: "#ffb703",
  secondaryButtonText: "#023047",
  dangerButton: "#fb8500",
  dangerButtonText: "#ffffff",
  disabled: "#02394f",
  disabledText: "#6f8ea0",

  positive: "#4caf50",
  negative: "#e63946",
  due: "#ffb703",
  paid: "#4caf50",
  success: "#4caf50",
  warning: "#ffb703",
  info: "#8ecae6",

  placeholder: "#9fc6d9",
  muted: "#6b8f9e",
  overlay: "rgba(0,0,0,0.6)",
};

/* -----------------------------------------------------
   5. Rustic Farmhouse Theme
----------------------------------------------------- */

const rusticTheme: ThemeColors = {
  primary: "#455428",
  primaryVariant: "#2e371b",
  secondary: "#dda15e",
  background: "#f5f6f1",
  surface: "#ffffff",
  error: "#bc6c25",

  onPrimary: "#ffffff",
  onSecondary: "#000000",
  onBackground: "#1a1a1a",
  onSurface: "#1a1a1a",
  onError: "#ffffff",

  text: "#0b1422",
  textLight: "#3c3f3a",
  descriptionText: "#6b6b6b",

  card: "#ffffff",
  cardGradient: ["#5a6e3a", "#3f4f2b", "#ffffff"],
  shadow: "rgba(0,0,0,0.22)",
  border: "#dda15e",
  borderLight: "#fefae0",
  inputBackground: "#fffaf0",
  inputBorder: "#dda15e",
  icon: "#283618",
  highlight: "#bc6c25",

  primaryButton: "#606c38",
  primaryButtonText: "#ffffff",
  secondaryButton: "#dda15e",
  secondaryButtonText: "#000000",
  dangerButton: "#bc6c25",
  dangerButtonText: "#ffffff",
  disabled: "#f4e6c0",
  disabledText: "#888",

  positive: "#66bb6a",
  negative: "#e57373",
  due: "#dda15e",
  paid: "#66bb6a",
  success: "#66bb6a",
  warning: "#dda15e",
  info: "#606c38",

  placeholder: "#9a8f75",
  muted: "#6b5e45",
  overlay: "rgba(0,0,0,0.25)",
};

/* -----------------------------------------------------
   6b. Forest (inverse of Rustic)
----------------------------------------------------- */

const forestTheme: ThemeColors = {
  primary: "#1b2f15",
  primaryVariant: "#0b190e",
  secondary: "#8fb36a",
  background: "#07140a",
  surface: "#0b1f12",
  error: "#bc6c25",

  onPrimary: "#ffffff",
  onSecondary: "#0b1f12",
  onBackground: "#eaf7ef",
  onSurface: "#eaf7ef",
  onError: "#ffffff",

  text: "#eaf7ef",
  textLight: "#b9d6b2",
  descriptionText: "#9fba9a",

  card: "#0b1f12",
  cardGradient: ["#1b2f15", "#0f2414", "#0b1f12"],
  shadow: "rgba(0,0,0,0.45)",
  border: "#254624",
  borderLight: "rgba(255,255,255,0.06)",
  inputBackground: "#07140a",
  inputBorder: "#254624",
  icon: "#bfe1bf",
  highlight: "#8fb36a",

  primaryButton: "#254624",
  primaryButtonText: "#ffffff",
  secondaryButton: "#8fb36a",
  secondaryButtonText: "#07140a",
  dangerButton: "#bc6c25",
  dangerButtonText: "#ffffff",
  disabled: "#0b1f12",
  disabledText: "#6b7a69",

  positive: "#66bb6a",
  negative: "#e57373",
  due: "#dda15e",
  paid: "#66bb6a",
  success: "#66bb6a",
  warning: "#dda15e",
  info: "#254624",

  placeholder: "#9aa78f",
  muted: "#6b7a69",
  overlay: "rgba(0,0,0,0.55)",
};

/* -----------------------------------------------------
   6. Glacier Ice Theme
----------------------------------------------------- */

const glacierTheme: ThemeColors = {
  primary: "#254f69",
  primaryVariant: "#0f2a41",
  secondary: "#e63946",
  background: "#f6fbfc",
  surface: "#ffffff",
  error: "#e63946",

  onPrimary: "#ffffff",
  onSecondary: "#ffffff",
  onBackground: "#1d3557",
  onSurface: "#1d3557",
  onError: "#ffffff",

  text: "#0b1422",
  textLight: "#244457",
  descriptionText: "#587a9b",

  card: "#ffffff",
  cardGradient: ["#2b5f86", "#1f4f72", "#ffffff"],
  shadow: "rgba(0,0,0,0.18)",
  border: "#457b9d",
  borderLight: "#a8dadc",
  inputBackground: "#ffffff",
  inputBorder: "#457b9d",
  icon: "#1d3557",
  highlight: "#e63946",

  primaryButton: "#457b9d",
  primaryButtonText: "#ffffff",
  secondaryButton: "#e63946",
  secondaryButtonText: "#ffffff",
  dangerButton: "#e63946",
  dangerButtonText: "#ffffff",
  disabled: "#d0e6e9",
  disabledText: "#7a9fb1",

  positive: "#4caf50",
  negative: "#e63946",
  due: "#ffc107",
  paid: "#4caf50",
  success: "#4caf50",
  warning: "#ffc107",
  info: "#457b9d",

  placeholder: "#93bfcf",
  muted: "#567680",
  overlay: "rgba(0,0,0,0.15)",
};

/* -----------------------------------------------------
   Export Themes
----------------------------------------------------- */

export const THEMES = {
  earthyPastel: earthyPastelTheme,
  nauticalDark: nauticalDarkTheme,
  botanical: botanicalTheme,
  vibrant: vibrantTheme,
  rustic: rusticTheme,
  glacier: glacierTheme,
  forest: forestTheme,
};

/* -----------------------------------------------------
   Getter
----------------------------------------------------- */

export const getColors = (
  themeName?: keyof typeof THEMES
): ThemeColors => {
  const selectedThemeName = themeName && THEMES[themeName] ? themeName : "earthyPastel";
  return THEMES[selectedThemeName];
};
