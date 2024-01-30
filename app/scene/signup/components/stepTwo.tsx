import { MainText } from "~components/atoms/mainText";
import { MainButton } from "~components/molecules/mainButton";
import { MainInput } from "~components/molecules/mainInput";
import { colors, spacing, spacingPx } from "~constants/theme";
import { isSmallScreen } from "~utils/deviceDetector";
import { ScrollSafeZone } from "~utils/scrollSafeZone";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { styled } from "styled-components";

interface Props {
  gender: string | null;
  setGender: Dispatch<SetStateAction<string>>;
  goal: string | null;
  setGoal: Dispatch<SetStateAction<string>>;
}

export const StepTwo = ({ gender, setGender, goal, setGoal }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={{ marginTop: spacing.m, marginBottom: spacing.s }}>
      <MainInput
        label={t("my-size-(in-cm)")}
        placeholder="180"
        keyboardType="default"
      />
      <View style={{ marginTop: spacing.s, marginBottom: spacing.s }}>
        <MainInput
          label={t("my-weight-(in-kg)")}
          placeholder="73.2"
          keyboardType="default"
        />
      </View>
      <MainInput
        label={t("my-birth-date")}
        placeholder="01/04/2000"
        keyboardType="default"
      />
      <View style={{ marginTop: spacing.s }}>
        <MainText fontType="medium" color={colors.Alizarin}>
          {`${t("i-am")} :`}
        </MainText>
        <ButtonWrapper>
          <View style={{ width: "49%" }}>
            <MainButton
              label={t("woman")}
              isHighlighted={gender !== "female"}
              onPress={() => setGender("female")}
            />
          </View>
          <View style={{ width: "49%" }}>
            <MainButton
              label={t("man")}
              isHighlighted={gender !== "male"}
              onPress={() => setGender("male")}
            />
          </View>
        </ButtonWrapper>
      </View>
      <View style={{ marginTop: spacing.s }}>
        <MainText fontType="medium" color={colors.Alizarin}>
          {`${t("my-goal")} :`}
        </MainText>
        <ButtonWrapper>
          <View style={{ width: "49%" }}>
            <MainButton
              label={t("lose-weight")}
              onPress={() => setGoal("lose")}
              isHighlighted={goal !== "lose"}
            />
          </View>
          <View style={{ width: "49%" }}>
            <MainButton
              label={t("gain-weight")}
              onPress={() => setGoal("gain")}
              isHighlighted={goal !== "gain"}
            />
          </View>
        </ButtonWrapper>
      </View>
      <View style={{ marginBottom: 150 }} />
    </View>
  );
};

const ButtonWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spacingPx.xs};
`;
