import { DairyFreeIcon } from "~assets/icons/dairyFree";
import { GlutenFreeIcon } from "~assets/icons/glutenFreeIcon";
import { PescetarianIcon } from "~assets/icons/pescetarianIcon";
import { VeganIcon } from "~assets/icons/veganIcon";
import { VegetarianIcon } from "~assets/icons/vegetarianIcon";
import { MainText } from "~components/atoms/mainText";
import { SectionHeader } from "~components/molecules/sectionHeader";
import { colors, iconSize, spacing } from "~constants/theme";
import React, { Dispatch } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  dietaryRestrictions: string[];
  setDietaryRestrictions: (dietaryRestrictions: string[]) => void;
}

const dietaryRestrictionsData = [
  {
    label: "dairyFree",
    icon: <DairyFreeIcon color={colors.Alizarin} size={iconSize.m} />,
  },
  {
    label: "glutenFree",
    icon: <GlutenFreeIcon color={colors.Alizarin} size={iconSize.m} />,
  },
  {
    label: "vegan",
    icon: <VeganIcon color={colors.Alizarin} size={iconSize.m} />,
  },
  {
    label: "vegetarian",
    icon: <VegetarianIcon color={colors.Alizarin} size={iconSize.m} />,
  },
  {
    label: "pescatarian",
    icon: (
      <PescetarianIcon color={colors.medium.StormyCloud} size={iconSize.m} />
    ),
  },
];

export const DietaryRestrictionsSection = ({
  dietaryRestrictions,
  setDietaryRestrictions,
}: Props) => {
  const { t } = useTranslation();
  return (
    <View>
      <SectionHeader title={t("dietaryRestrictions")} />
      <View
        style={{
          flexDirection: "row",
          columnGap: spacing.xs,
          rowGap: spacing.xs,
          marginTop: spacing.s,
          flexWrap: "wrap",
        }}
      >
        {dietaryRestrictionsData.map((restriction, index) => (
          <DietaryRestrictionSelector
            key={index.toString()}
            label={restriction.label}
            icon={restriction.icon}
            isSelected={dietaryRestrictions.includes(restriction.label)}
            setDietaryRestrictions={setDietaryRestrictions}
            dietaryRestrictions={dietaryRestrictions}
            iconColor={
              dietaryRestrictions.includes(restriction.label)
                ? colors.Alizarin
                : colors.medium.StormyCloud
            }
          />
        ))}
      </View>
    </View>
  );
};
type SelectorProps = {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  setDietaryRestrictions: Dispatch<React.SetStateAction<string[]>>;
  dietaryRestrictions: string[];
  iconColor: string;
};

const DietaryRestrictionSelector = ({
  label,
  icon,
  isSelected,
  setDietaryRestrictions,
  dietaryRestrictions,
  iconColor,
}: SelectorProps) => {
  const { t } = useTranslation();

  const handleClick = () => {
    const isLabelInArray = dietaryRestrictions.includes(label);

    if (isLabelInArray) {
      setDietaryRestrictions((prev: string[]) =>
        prev.filter((restriction) => restriction !== label)
      );
    } else {
      setDietaryRestrictions((prev: string[]) => [...prev, label]);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        padding: spacing.xs,
        borderRadius: spacing.xs,
        borderColor: isSelected ? colors.Alizarin : colors.medium.StormyCloud,
      }}
    >
      {React.cloneElement(icon as React.ReactElement, {
        color: iconColor,
        size: iconSize.m,
      })}
      <MainText
        style={{ marginLeft: spacing.xs }}
        fontType="medium"
        fontSize="m"
        color={isSelected ? colors.Alizarin : colors.medium.StormyCloud}
      >
        {t(label)}
      </MainText>
    </TouchableOpacity>
  );
};
