import { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Calendar } from "react-native-calendars";
import { useTranslation } from "react-i18next";

import { Text } from "~components/atoms/text";
import { colors, iconSize, spacing, spacingPx } from "~constants/theme";
import { SectionTitle } from "~components/organisms/sectionTitle";
import { LeftChevron } from "~assets/icons/leftChevron";
import { RightChevron } from "~assets/icons/rightChevron";
import { formatISO, parseISO } from "date-fns";

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

export const PlannifiedMealDays: FC<{ scheduledRecipesDates: string[] }> = ({
  scheduledRecipesDates,
}) => {
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

  const convertToDateString = (isoString) => {
    return formatISO(parseISO(isoString), { representation: "date" });
  };

  const updatedScheduledRecipesDates = scheduledRecipesDates.map((date) =>
    convertToDateString(date)
  );

  return (
    <View style={{ paddingBottom: spacing.m }}>
      <SectionTitle title={t("yourPlannifiedMealsDays")} />
      <View style={boxShadow}>
        <Calendar
          dayComponent={({ date, state }) => {
            const isMarked = updatedScheduledRecipesDates.includes(
              date.dateString
            );
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
                  {date.day.toString()}
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
