import { FC } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

import { Text } from "~components/atoms/text";
import { colors } from "~constants/theme";

interface Props {
  isChecked: boolean;
  setIsChecked: () => void;
}

export const Checkbox: FC<Props> = ({ isChecked, setIsChecked }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={setIsChecked}>
      {isChecked ? (
        <View style={styles.checkboxChecked}>
          <Text color="White" fontSize="m" fontFamily="Avenir-Bold">
            &#10003;
          </Text>
        </View>
      ) : (
        <View style={styles.checkboxUnchecked} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxUnchecked: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderolor: colors.Alizarin,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    width: 24,
    height: 24,
    backgroundColor: colors.Alizarin,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
