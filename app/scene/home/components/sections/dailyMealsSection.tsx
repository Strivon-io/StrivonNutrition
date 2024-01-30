import { FC, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import { Carousel } from "react-native-snap-carousel";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { MainText } from "~components/atoms/mainText";
import { colors, spacing, spacingPx } from "~constants/theme";
import { MealCarouselCard } from "~components/organisms/mealCarouselCard";
import { SectionTitle } from "~components/organisms/sectionTitle";

export const DailyMealsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const mealsData = [
    { title: "test1", kcal: 564, recipe: {} },
    { title: "test2", kcal: 564, recipe: {} },
    { title: "test3", kcal: 564, recipe: {} },
    { title: "test4", kcal: 564, recipe: {} },
  ];

  const { t } = useTranslation();

  const renderRecipeCard: FC = () => {
    return <MealCarouselCard />;
  };

  const { width: viewportWidth } = Dimensions.get("window");

  const mealLabels = [t("morning"), t("lunch"), t("dinner"), t("snack")];

  return (
    <View style={{ marginBottom: spacing.m }}>
      <LayoutSideColumns>
        <SectionTitle
          title={t("yourDailyMeals")}
          leftChild={
            <MainText color={colors.Alizarin} fontType="bold" fontSize="m">
              1459Kcal
            </MainText>
          }
        />
      </LayoutSideColumns>
      <MealLabels activeSlide={activeSlide} mealLabels={mealLabels} />
      <Carousel
        data={mealsData}
        renderItem={renderRecipeCard}
        sliderWidth={viewportWidth}
        onScrollIndexChanged={(index) => setActiveSlide(index)}
        itemWidth={viewportWidth - spacing.l}
        ref={carouselRef}
        vertical={false}
        loopClonesPerSide={2}
        autoplayDelay={500}
        autoplayInterval={3000}
        autoplay
      />
    </View>
  );
};

const MealLabels: FC<{ activeSlide: number; mealLabels: string[] }> = ({
  activeSlide,
  mealLabels,
}) => {
  return (
    <LayoutSideColumns>
      <MealLabelsContainer>
        {mealLabels.map((label, index) => (
          <MainText
            fontType="bold-italic"
            color={
              activeSlide === index
                ? colors.Alizarin
                : colors.darker.DarkestBlack
            }
            key={index}
          >
            {label}
          </MainText>
        ))}
      </MealLabelsContainer>
    </LayoutSideColumns>
  );
};

const MealLabelsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${spacingPx.s};
`;
