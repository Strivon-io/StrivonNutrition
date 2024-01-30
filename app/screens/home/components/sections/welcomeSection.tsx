import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { FC } from "react";

import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { MainText } from "~components/atoms/mainText";
import { spacing } from "~constants/theme";

export const HomeWelcomeSection: FC = () => {
  const { t } = useTranslation();

  return (
    <View style={[{ marginBottom: spacing.m }]}>
      <LayoutSideColumns>
        <MainText fontType="bold-italic" fontSize="l">
          Salut, Hugues !
        </MainText>
        <MainText
          style={{ marginTop: spacing.xs }}
          fontType="regular"
          fontSize="m"
        >
          {t("hereIsWhatYouNeedToKnowToday")} 👨‍🍳
        </MainText>
      </LayoutSideColumns>
    </View>
  );
};
