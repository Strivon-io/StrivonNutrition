import { View, StyleSheet } from "react-native";

import { MainButton } from "~components/molecules/mainButton";
import { boxShadow, spacing } from "~constants/theme";
import { isSmallScreen } from "~utils/deviceDetector";

interface Props {
  label: string;
  onPress: () => void;
}

export const BottomFixedButton = ({ label, onPress }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          marginBottom: isSmallScreen ? spacing.s : spacing.l,
        }}
      >
        <View style={{ marginTop: spacing.m }}>
          <MainButton style={boxShadow} label={label} onPress={onPress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "transparent",
  },
});
