import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { FC } from "react";

import { Text } from "~components/atoms/text";
import { spacing } from "~constants/theme";

export const HomeWelcomeSection: FC = () => {
  const { t } = useTranslation();

  return (
    <View style={[{ marginBottom: spacing.m, paddingHorizontal: spacing.m }]}>
      <Text fontFamily="Avenir-Bold-Italic" fontSize="l">
        Salut, Hugues !
      </Text>
      <Text mt={spacing.xs} fontFamily="Avenir-Medium" fontSize="m">
        {t("hereIsWhatYouNeedToKnowToday")} 👨‍🍳
      </Text>
    </View>
  );
};
