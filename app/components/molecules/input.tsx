import { FC } from "react";
import { TextInput, View, StyleSheet } from "react-native";

import { colors, spacing } from "~constants/theme";
import { Text } from "~components/atoms/text";

interface InputProps {
  value: string;
  placeholder?: string;
  label?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "visible-password";
  placeholderTextColor?: string;
  onChange: (text: string) => void;
}

export const Input: FC<InputProps> = ({
  label,
  placeholder,
  secureTextEntry,
  onChange,
  keyboardType,
  value,
}) => {
  return (
    <View>
      {label && (
        <Text fontFamily="Avenir-Medium" color="Alizarin" fontSize="m">
          {label}
        </Text>
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.medium.LinkWater}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: spacing.s,
    marginVertical: spacing.xs,
    backgroundColor: colors.light.AliceBlue,
    borderRadius: spacing.xs,
    fontFamily: "AvenirNext-Medium",
  },
});
