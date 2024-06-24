import { useColorScheme } from "react-native";

import Colors from "@/constants/Colors";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  props?: { light?: string; dark?: string }
) {
  const theme = useColorScheme() ?? "light";

  if (props) {
    const colorFromProps = props[theme];
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
