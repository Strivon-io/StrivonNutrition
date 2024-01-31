import { useCallback, useMemo, useRef, useState, FC } from "react";
import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styled from "styled-components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RecipesNavigatorParamList } from "~navigators/recipes-navigator";
import { PlusIcon } from "~assets/icons/plusIcon";
import { MainText } from "~components/atoms/mainText";
import { Layout } from "~components/layout/layout";
import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { PageTitle } from "~components/molecules/pageTitle";
import { MealSmallCard } from "~components/organisms/mealSmallCard";
import { colors, iconSize, spacing } from "~constants/theme";
import { SearchBar } from "~components/molecules/searchBar";
import {
  MainBottomSheet,
  bottomSheetRef,
} from "~components/molecules/BottomSheet";
import { isBigScreen, isSmallScreen } from "~utils/deviceDetector";

import { CreateRecipeFirstStep } from "./components/bottomSheetContent/createRecipeFirstStep";

type RecipesScreenProps = NativeStackScreenProps<
  RecipesNavigatorParamList,
  "recipes"
>;

export const RecipesScreen: FC<RecipesScreenProps> = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modaleHeight, setModaleHeight] = useState(450);

  const DATA = [
    {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "1",
    },
    {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["breakfast", "snack"],
      uuid: "2",
    },
    {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["snack"],
      uuid: "3",
    },
    {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "4",
    },
    {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "5",
    },
    {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "6",
    },
    {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "7",
    },
    {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "8",
    },
    {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "9",
    },
  ];

  const updateSearch = (searchText) => {
    setSearch(searchText);
    const newData = DATA.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(newData);
  };

  const [step, setStep] = useState(0);
  const ref = useRef<bottomSheetRef>(null);
  const { height: screenHeight } = useWindowDimensions();

  const isActionTrayOpened = useSharedValue(false);

  const close = useCallback(() => {
    ref.current?.close();
    isActionTrayOpened.value = false;
    setStep(0);
    setModaleHeight(300);
  }, []);

  const rContentHeight = useDerivedValue(() => {
    return interpolate(step, [0, 1], [340, modaleHeight], Extrapolate.CLAMP);
  }, [step, modaleHeight]);

  const rContentStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(rContentHeight.value),
    };
  }, []);

  const toggleActionTray = useCallback(() => {
    const isActive = ref.current?.isActive() ?? false;
    isActionTrayOpened.value = !isActive;
    isActive ? close() : ref.current?.open();
  }, [close, isActionTrayOpened]);

  const title = useMemo(() => {
    switch (step) {
      case 0:
        return t("generateNewRecipe");
      case 1:
        return t("theIgredientForMyRecipe");
    }
  }, [step]);

  return (
    <Layout useSafeAreaView>
      <LayoutSideColumns style={{ flex: 1 }}>
        <PageTitle
          title={t("recipes")}
          leftChild={
            <TouchableOpacity
              onPress={toggleActionTray}
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 4,
              }}
            >
              <MainText color={colors.Alizarin} fontType="bold-italic">
                Ai
              </MainText>
              <PlusIcon size={iconSize.m} color={colors.Alizarin} />
            </TouchableOpacity>
          }
        />
        <View style={{ marginTop: spacing.m, marginBottom: spacing.xs }}>
          <SearchBar
            placeholder="Chercher une recette"
            onChangeText={updateSearch}
          />
        </View>
        <FlashListWrapper>
          <FlashList
            numColumns={isSmallScreen ? 1 : 2}
            estimatedItemSize={175}
            data={search ? filteredData : DATA}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  { marginBottom: spacing.xs },
                  isBigScreen ? { width: 185 } : {},
                ]}
              >
                <MealSmallCard
                  title={item.title}
                  kcal={item.kcal}
                  imagePath={item.imagePath}
                  tags={item.tags}
                  recipeUuid={item.uuid}
                />
              </View>
            )}
          />
        </FlashListWrapper>
      </LayoutSideColumns>
      <MainBottomSheet
        ref={ref}
        maxHeight={screenHeight * 0.6}
        style={{
          backgroundColor: "#FFF",
          flex: 1,
          padding: 25,
        }}
        onClose={close}
      >
        <View style={{ marginBottom: spacing.s }}>
          <MainText color={colors.Alizarin} fontType="bold-italic" fontSize="l">
            {title}
          </MainText>
        </View>
        <Animated.View style={rContentStyle}>
          {step === 0 && <CreateRecipeFirstStep />}
        </Animated.View>
      </MainBottomSheet>
    </Layout>
  );
};

const FlashListWrapper = styled(View)`
  height: 100%;
`;
