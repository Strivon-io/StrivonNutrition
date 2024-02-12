import { useRef, useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { View, Dimensions, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Text } from "~components/atoms/text";
import { Layout } from "~components/layout/layout";
import { MainButton } from "~components/molecules/mainButton";
import { RecipeBigCard } from "~components/organisms/recipeBigCard";
import { colors, spacing } from "~constants/theme";
import { BottomCarousel } from "~components/molecules/bottomCarousel";
import { NavigatorParamList } from "~navigators/app-navigator";

type RecipesResultScreenProps = NativeStackScreenProps<
  NavigatorParamList,
  "recipesResult"
>;

export const RecipesResultScreen: FC<RecipesResultScreenProps> = () => {
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
    <Layout isHeaderLogo noPadding>
      <Text
        fontFamily="Avenir-Bold"
        fontSize="l"
        mt={spacing.xs}
        mb={spacing.m}
        textAlign="center"
      >
        {t("yourFirst3Recipes")}
      </Text>
      <View style={{ flex: 1 }}>
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

      <View style={styles.buttonWrapper}>
        <MainButton label={t("viewMyFirstRecipes")} onPress={handleGoToApp} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingHorizontal: spacing.l,
  },
});
