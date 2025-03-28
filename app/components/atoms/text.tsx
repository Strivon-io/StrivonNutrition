import { FC } from "react";
import {
  Text as TextRN,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextProps as TextPropsRN,
} from "react-native";

import { withSpacing } from "../communStyles/withSpacing";
import { withColor } from "../communStyles/withColor";
import {
  ColorsKey,
  FontSizeKey,
  IfontSize,
  FontFamily,
} from "~constants/theme";

interface TextProps extends TextPropsRN {
  children: JSX.Element | string;
  color?: ColorsKey;
  fontSize?: FontSizeKey;
  textDecorationLine?: "none" | "underline" | "line-through";
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
  fontFamily?: FontFamily;
  onPress?: () => void;
}

interface Styles {
  text: StyleProp<TextStyle & { fontFamily?: FontFamily }>;
}

const Text: FC<TextProps> = (props) => {
  const {
    children,
    color,
    fontSize,
    textDecorationLine,
    fontFamily = "Avenir-Regular",
    lineHeight,
    textAlign,
    numberOfLines,
    textTransform,
    onPress,
  } = props;

  const dynamicStyles = getDynamicStyles({
    textDecorationLine,
    color,
    fontSize,
    fontFamily,
    lineHeight,
    textAlign,
    textTransform,
  });

  return (
    <TextRN
      style={[dynamicStyles.text, props.style]}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </TextRN>
  );
};

const getDynamicStyles = ({
  textDecorationLine,
  textTransform,
  color,
  fontSize,
  textAlign,
  lineHeight,
  fontFamily,
}: {
  textDecorationLine: "none" | "underline" | "line-through";
  fontFamily: FontFamily;
  lineHeight?: number;
} & Pick<
  TextProps,
  "color" | "fontSize" | "textAlign" | "textTransform"
>): Styles => {
  const numericFontSize: number = IfontSize[fontSize] || IfontSize["md"];

  return StyleSheet.create({
    text: {
      textDecorationLine,
      color,
      fontSize: numericFontSize,
      textAlign,
      fontFamily,
      lineHeight,
      textTransform,
    },
  });
};

const TextWithSpacingAndColor = withSpacing(withColor(Text));

export { TextWithSpacingAndColor as Text };
