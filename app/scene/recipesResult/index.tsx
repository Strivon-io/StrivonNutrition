import { MainText } from "~components/atoms/mainText";
import { AppLayout } from "~components/layout/layout";
import { MainButton } from "~components/molecules/mainButton";
import { RecipeBigCard } from "~components/organisms/recipeBigCard";
import { boxShadow, colors, spacing, spacingPx } from "~constants/theme";
import { isSmallScreen } from "~utils/deviceDetector";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { View, Image, Text, Dimensions } from "react-native";
import { BottomCarousel } from "~components/molecules/bottomCarousel";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { LayoutSideColumns } from "~components/layout/layoutSideColumns";

export const RecipesResultScreen = () => {
  const { t } = useTranslation();
  const handleGoToApp = () => {};
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const recipesData = [
    { title: "test1", kcal: 564, recipe: {} },
    { title: "test2", kcal: 564, recipe: {} },
    { title: "test3", kcal: 564, recipe: {} },
  ];

  const numberOfItems = recipesData.length;

  const DOT_SIZE = 7;
  const { width: viewportWidth } = Dimensions.get("window");

  const onPressNext = () => {
    if (carouselRef) {
      carouselRef?.current?.snapToItem(activeSlide + 1, true);
    }
  };

  const onPressPrevious = () => {
    if (carouselRef) {
      carouselRef?.current?.snapToItem(activeSlide - 1, true);
    }
  };

  const renderRecipeCard = ({ item, index }) => {
    return (
      <RecipeBigCard
        title={item.title}
        kcal={item.kcal}
        recipe={item.recipe}
        index={index}
      />
    );
  };

  const getPagination = () => {
    return (
      <Pagination
        containerStyle={{
          marginBottom: -5,
          marginTop: -20,
        }}
        dotsLength={numberOfItems}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          backgroundColor: colors.Alizarin,
        }}
        dotContainerStyle={{ marginHorizontal: 4 }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <AppLayout useSafeAreaView isHeaderLogo>
      <MainText
        fontType="bold"
        fontSize="l"
        style={{
          alignSelf: "center",
          marginTop: spacing.xs,
          marginBottom: spacing.m,
        }}
      >
        {t("yourFirst3Recipes")}
      </MainText>
      <View style={{ height: "65%" }}>
        {/* react-native-snap-carousel is using the 4.0.0-beta.6 that fix PropTypes error. 
        It may exists props that are still in the doc but not really working or the opposite. */}
        <Carousel
          data={recipesData}
          renderItem={renderRecipeCard}
          sliderWidth={viewportWidth}
          onScrollIndexChanged={(index) => setActiveSlide(index)}
          itemWidth={viewportWidth - 70}
          ref={carouselRef}
          vertical={false}
        />
        <BottomCarousel
          onPressRightArrow={onPressNext}
          onPressLeftArrow={onPressPrevious}
          getPagination={getPagination()}
          hasRightArrow={activeSlide < numberOfItems - 1}
          hasLeftArrow={activeSlide > 0}
        />
      </View>

      <ButtonWrapper>
        <LayoutSideColumns>
          <MainButton label={t("viewMyFirstRecipes")} onPress={handleGoToApp} />
        </LayoutSideColumns>
      </ButtonWrapper>
    </AppLayout>
  );
};

const ButtonWrapper = styled(View)`
  position: absolute;
  align-self: center;
  width: 100%;
  padding-top: ${spacingPx.m};
  bottom: ${isSmallScreen ? spacingPx.m : spacingPx.l};
  background-color: ${colors.light.PureWhite};
`;
