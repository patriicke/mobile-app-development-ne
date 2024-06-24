import { Text as DefaultText } from "react-native";

import { ThemeProps, useThemeColor } from "@/hooks";

export type TextProps = ThemeProps & DefaultText["props"];

export const Text = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor("text", { light: lightColor, dark: darkColor });

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export const MonoText = (props: TextProps) => {
  return <Text {...props} style={[props.style, { fontFamily: "ReadexPro" }]} />;
};
