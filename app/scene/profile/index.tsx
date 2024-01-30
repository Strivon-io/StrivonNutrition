import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AppLayout } from "~components/layout/layout";
import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { PageTitle } from "~components/molecules/pageTitle";
import { BottomTabParamList } from "~navigators/bottom-tab-navigator";

type ProfileScreenProps = NativeStackScreenProps<BottomTabParamList, "profile">;

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  const { t } = useTranslation();

  return (
    <AppLayout useSafeAreaView>
      <LayoutSideColumns>
        <PageTitle title={t("profile")} />
      </LayoutSideColumns>
    </AppLayout>
  );
};
