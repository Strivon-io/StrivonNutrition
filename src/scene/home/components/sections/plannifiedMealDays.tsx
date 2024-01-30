import React from "react";
import { Calendar } from "react-native-calendars";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "@components/organisms/sectionTitle";
import { colors, iconSize, spacing, spacingPx } from "@constants/theme";
import { LeftChevron } from "@assets/icons/leftChevron";
import { RightChevron } from "@assets/icons/rightChevron";
import { LayoutSideColumns } from "@components/layout/layoutSideColumns";
import { View } from "react-native";
import { MainText } from "@components/atoms/mainText";

const boxShadow = {
  shadowColor: "#3A296A",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 20,
};

const CalendarCard = styled.View`
  ${boxShadow}
  border-radius: ${spacingPx.m};
`;

export const PlannifiedMealDays = () => {
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
      <LayoutSideColumns>
        <SectionTitle title={t("yourPlannifiedMealsDays")} />
        <CalendarCard>
          <Calendar
            dayComponent={({ date, state }) => {
              const isMarked = markedDates[date.dateString]?.marked;
              return (
                <View style={{ height: 50, alignItems: "center" }}>
                  <MainText
                    fontType="medium"
                    fontSize="m"
                    style={{
                      color:
                        state === "disabled"
                          ? colors.medium.LinkWater
                          : colors.darker.DarkestBlack,
                    }}
                  >
                    {date.day}
                  </MainText>
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
                  <MainText fontType="medium" fontSize="m">
                    {monthName}
                  </MainText>
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
            onDayPress={(day) => {}}
          />
        </CalendarCard>
      </LayoutSideColumns>
    </View>
  );
};
