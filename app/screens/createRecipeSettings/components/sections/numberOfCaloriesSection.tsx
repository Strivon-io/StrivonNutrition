import { Dispatch, SetStateAction, FC } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import styled from "styled-components";

import { Text } from "~components/atoms/text";
import { InputStyle, MainInput } from "~components/molecules/mainInput";
import { SectionHeader } from "~components/molecules/sectionHeader";
import { colors, spacing, spacingPx } from "~constants/theme";

interface Props {
  calories: string;
  setCalories: Dispatch<SetStateAction<string>>;
}

export const NumberOfCaloriesSection: FC<Props> = ({
  calories,
  setCalories,
}) => {
  const { t } = useTranslation();
  return (
    <View>
      <SectionHeader title={t("numberOfCalories")} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: spacing.s,
        }}
      >
        <CustomInput
          keyboardType="number-pad"
          placeholder={t("numberOfCalories")}
          style={{
            width: 180,
          }}
          value={calories}
          onChangeText={(text) => {
            setCalories(text);
          }}
          textColor={colors.Alizarin}
          fontType={"bold"}
        />
        <KcalWrapper>
          <Text fontFamily="Avenir-Medium" color="Alizarin" fontSize="m">
            Kcal
          </Text>
        </KcalWrapper>
      </View>
    </View>
  );
};

const KcalWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: ${spacingPx.s};
  background-color: ${colors.light.AliceBlue};
  border-radius: 0 ${spacingPx.s} ${spacingPx.s} 0;
`;

const CustomInput = styled(MainInput)`
  ${InputStyle}
  height: 60px;
  padding: 0;
  margin: 0;
  margin-right: 0;
  border-radius: ${spacingPx.s} 0 0 ${spacingPx.s};
`;
