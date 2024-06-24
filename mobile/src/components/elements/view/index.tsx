import { BlurView as DefaultBlurView } from "expo-blur";
import { View as DefaultView } from "react-native";

import { ThemeProps, useThemeColor } from "@/hooks";

export type ViewProps = ThemeProps & DefaultView["props"];
export type BlurViewProps = ThemeProps & DefaultBlurView["props"];

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const backgroundColor = useThemeColor("background", {
    light: lightColor,
    dark: darkColor
  });

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const BlurView = (props: BlurViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const backgroundColor = useThemeColor("background", {
    light: lightColor,
    dark: darkColor
  });

  return (
    <DefaultBlurView style={[{ backgroundColor }, style]} {...otherProps} />
  );
};
