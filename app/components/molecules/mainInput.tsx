import { FC } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { css } from "styled-components";
import { styled } from "styled-components/native";

import { colors, spacingPx } from "~constants/theme";
import { Text } from "~components/atoms/text";

interface InputProps extends TextInputProps {
  label?: string;
  style?: {};
  textColor?: string;
  fontType?: string;
  leftIcon?: JSX.Element;
}

export const MainInput: FC<InputProps> = ({
  label,
  placeholder,
  secureTextEntry,
  onChangeText,
  keyboardType,
  value,
  style = {},
  textColor,
  fontType,
}) => {
  return (
    <View style={style}>
      {label && (
        <Text fontFamily="Avenir-Medium" color="Alizarin" fontSize="m">
          {label}
        </Text>
      )}
      <Style
        placeholder={placeholder}
        placeholderTextColor={colors.medium.LinkWater}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        textColor={textColor}
        fontType={fontType}
      />
    </View>
  );
};

export const InputStyle = css<{ textColor: string; fontType: string }>`
  width: 100%;
  padding: ${spacingPx.s};
  margin: ${spacingPx.xs} 0;
  background-color: ${colors.light.AliceBlue};
  border-radius: ${spacingPx.xs};
  font-family: ${(props) =>
    props.fontType
      ? `AvenirNext-${
          props.fontType.substring(0, 1).toUpperCase() +
          props.fontType.substring(1)
        }`
      : "AvenirNext-Medium"};
  color: ${(props) =>
    props.textColor ? props.textColor : colors.darker.DarkestBlack};
`;

const Style = styled(TextInput)<{ textColor: string; fontType: string }>`
  ${InputStyle}
`;
