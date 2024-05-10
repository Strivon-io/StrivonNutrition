import { FC } from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Calendar } from "react-native-calendars";
import { useTranslation } from "react-i18next";

import { Text } from "~components/atoms/text";
import { colors, iconSize, spacing, spacingPx } from "~constants/theme";
import { SectionTitle } from "~components/organisms/sectionTitle";
import { LeftChevron } from "~assets/icons/leftChevron";
import { RightChevron } from "~assets/icons/rightChevron";

export const PlannifiedMealDays: FC = () => {
  const { t } = useTranslation();

  const monthNames = [
    t("january"),
    t("february"),
    t("march"),
    t("april"),
    t("may"),
    t("june"),
    t("july"),
    t("august"),
    t("september"),
    t("october"),
    t("november"),
    t("december"),
  ];

  const markedDates = {
    "2023-11-16": {
      marked: true,
      dotColor: colors.Alizarin,
    },
    "2023-11-17": { marked: true, dotColor: colors.Alizarin },
    "2023-11-18": {
      marked: true,
      dotColor: colors.Alizarin,
    },
  };

  return (
    <View style={{ paddingBottom: spacing.m }}>
      <SectionTitle title={t("yourPlannifiedMealsDays")} />
      <View style={styles.boxShadow}>
        <Calendar
          dayComponent={({ date, state }) => {
            const isMarked = markedDates[date.dateString]?.marked;
            return (
              <View style={{ height: 50, alignItems: "center" }}>
                <Text
                  fontFamily="Avenir-Medium"
                  fontSize="m"
                  color={
                    state === "disabled"
                      ? "medium.LinkWater"
                      : "darker.DarkestBlack"
                  }
                >
                  {date.day}
                </Text>
                {isMarked && (
                  <View
                    style={{
                      marginTop: spacing.xs,
                      height: 5,
                      width: 5,
                      borderRadius: 5,
                      backgroundColor: colors.Alizarin,
                    }}
                  />
                )}
              </View>
            );
          }}
          renderHeader={(date) => {
            const monthName = monthNames[date.getMonth()];
            return (
              <View>
                <Text fontFamily="Avenir-Medium" fontSize="m">
                  {monthName}
                </Text>
              </View>
            );
          }}
          accessibilityLanguage="fr"
          theme={{
            todayTextColor: colors.Alizarin,
            dayTextColor: colors.darker.DarkestBlack,
          }}
          style={{ borderRadius: spacing.s }}
          renderArrow={(direction) =>
            direction === "left" ? (
              <LeftChevron size={iconSize.s} color={colors.Alizarin} />
            ) : (
              <RightChevron size={iconSize.s} color={colors.Alizarin} />
            )
          }
          markedDates={markedDates}
          onDayPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    borderRadius: spacing.m,
    shadowColor: "#3A296A",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
});
