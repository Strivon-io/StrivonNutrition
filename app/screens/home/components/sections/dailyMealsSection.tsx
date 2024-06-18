import { FC, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import { Carousel } from "react-native-snap-carousel";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

import { Text } from "~components/atoms/text";
import { spacing, spacingPx } from "~constants/theme";
import { MealCarouselCard } from "~components/organisms/mealCarouselCard";
import { SectionTitle } from "~components/organisms/sectionTitle";
import { ScheduledRecipe } from "~services/types/recipe.types";

export const DailyMealsSection: FC<{
  navigation;
  scheduledRecipes: ScheduledRecipe[];
}> = ({ navigation, scheduledRecipes }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const { t } = useTranslation();

  const renderRecipeCard: FC = (items: ScheduledRecipe[]) => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <View key={index} style={{ width: "48%", margin: 2 }}>
              <MealCarouselCard recipe={item.recipe} navigation={navigation} />
            </View>
          ))
        ) : (
          <Text color="darker.DarkestBlack">{t("homeScreen.noRecipes")}</Text>
        )}
      </View>
    );
  };

  const { width: viewportWidth } = Dimensions.get("window");

  const mealLabels = [t("morning"), t("lunch"), t("dinner"), t("snack")];

  const mealsData = [
    {
      title: "Breakfast",
      recipes: scheduledRecipes?.filter(
        (recipe) => recipe.mealType === "breakfast"
      ),
    },
    {
      title: "Lunch",
      recipes: scheduledRecipes?.filter(
        (recipe) => recipe.mealType === "lunch"
      ),
    },
    {
      title: "Dinner",
      recipes: scheduledRecipes?.filter(
        (recipe) => recipe.mealType === "dinner"
      ),
    },
    {
      title: "Snack",
      recipes: scheduledRecipes?.filter(
        (recipe) => recipe.mealType === "snack"
      ),
    },
  ];

  return (
    <View style={{ marginBottom: spacing.m }}>
      {scheduledRecipes && (
        <>
          <SectionTitle
            title={t("yourDailyMeals")}
            leftChild={
              <Text color="Alizarin" fontFamily="Avenir-Bold" fontSize="m">
                {`${scheduledRecipes.reduce(
                  (acc, recipe) => acc + recipe.recipe.calories,
                  0
                )}Kcal`}
              </Text>
            }
          />
          <MealLabels activeSlide={activeSlide} mealLabels={mealLabels} />
          <Carousel
            data={mealsData}
            renderItem={({ item }) => renderRecipeCard(item.recipes)}
            sliderWidth={viewportWidth - 40}
            onScrollIndexChanged={(index) => setActiveSlide(index)}
            itemWidth={viewportWidth - spacing.l}
            ref={carouselRef}
            vertical={false}
          />
        </>
      )}
    </View>
  );
};

const MealLabels: FC<{ activeSlide: number; mealLabels: string[] }> = ({
  activeSlide,
  mealLabels,
}) => {
  return (
    <MealLabelsContainer>
      {mealLabels.map((label, index) => (
        <Text
          fontFamily="Avenir-Bold-Italic"
          color={activeSlide === index ? "Alizarin" : "darker.DarkestBlack"}
          key={index}
        >
          {label}
        </Text>
      ))}
    </MealLabelsContainer>
  );
};

const MealLabelsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${spacingPx.s};
`;
