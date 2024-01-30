import { FC } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { MainInput } from "~components/molecules/mainInput";
import { spacing } from "~constants/theme";

export const StepOne: FC = () => {
  const { t } = useTranslation();
  return (
    <View style={{ marginTop: spacing.m, marginBottom: spacing.s }}>
      <MainInput
        label={t("name")}
        placeholder="Hugues"
        keyboardType="default"
      />
      <View style={{ marginTop: spacing.s, marginBottom: spacing.s }}>
        <MainInput
          label={t("surname")}
          placeholder="Romain"
          keyboardType="default"
        />
      </View>
      <MainInput
        label={t("email")}
        placeholder={t("email-placeholder")}
        keyboardType="email-address"
      />
    </View>
  );
};
