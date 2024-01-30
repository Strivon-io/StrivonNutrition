import { AppLayout } from "~components/layout/layout";
import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { PageTitle } from "~components/molecules/pageTitle";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

export const ProfileScreen = () => {
  const { t } = useTranslation();
  return (
    <AppLayout useSafeAreaView>
      <LayoutSideColumns>
        <PageTitle title={t("profile")} />
      </LayoutSideColumns>
    </AppLayout>
  );
};
