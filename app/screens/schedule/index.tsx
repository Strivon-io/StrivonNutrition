import { Fragment, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View, Dimensions } from "react-native";
import { format } from "date-fns";
import styled from "styled-components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Layout } from "~components/layout/layout";
import { PageTitle } from "~components/molecules/pageTitle";
import { SectionTitle } from "~components/organisms/sectionTitle";
import { formatRecipeDate } from "~utils/date";
import { MealSmallCard } from "~components/organisms/mealSmallCard";
import { BottomTabParamList } from "~navigators/bottom-tab-navigator";

const ProgrammedRecipes = [
  {
    id: 1,
    title: "Poulet César",
    image: "https://picsum.photos/200/300",
    recipeUuid: "1",
    date: "2022-05-01",
    recipe: {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "1",
    },
  },
  {
    id: 2,
    title: "Poulet César",
    image: "https://picsum.photos/200/300",
    recipeUuid: "2",
    date: "2022-05-01",
    recipe: {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "1",
    },
  },
  {
    id: 3,
    title: "Poulet César",
    image: "https://picsum.photos/200/300",
    recipeUuid: "2",
    date: "2022-05-01",
    recipe: {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "1",
    },
  },
  {
    id: 4,
    title: "Poulet César",
    image: "https://picsum.photos/200/300",
    recipeUuid: "2",
    date: "2022-06-01",
    recipe: {
      title: "Grilled Chicken and Vegetable Salad",
      kcal: 240,
      imagePath: require("~assets/recipeImages/exempleOfRecipe.png"),
      tags: ["meal"],
      uuid: "1",
    },
  },
];

type RecipesScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "schedule"
>;

export const ScheduleScreen: FC<RecipesScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const groupRecipesByDate = (recipes) =>
    recipes.reduce((acc, recipe) => {
      const date = recipe.date;
      acc[date] = acc[date] || [];
      acc[date].push(recipe);
      return acc;
    }, {});

  const recipesByDate = useMemo(
    () => groupRecipesByDate(ProgrammedRecipes),
    [ProgrammedRecipes]
  );

  const uniqueDates = useMemo(
    () => Object.keys(recipesByDate),
    [recipesByDate]
  );

  const spacing = 8;
  const screenWidth = Dimensions.get("window").width - 40;
  const itemWidth = (screenWidth - 3 * spacing) / 2;

  return (
    <Layout scrollView>
      <PageTitle title={t("Scheduling")} />
      {uniqueDates.map((date) => (
        <Fragment key={date}>
          <SectionTitle
            title={formatRecipeDate(date)}
            fontFamily="Avenir-Bold-Italic"
            fontSize="xl"
          />
          <MealSmallCardList>
            {recipesByDate[date].map((item) => (
              <View
                style={{ width: itemWidth, margin: spacing / 2 }}
                key={item.id}
              >
                <MealSmallCard
                  key={item.id}
                  title={item.recipe.title}
                  kcal={item.recipe.kcal}
                  imagePath={item.recipe.imagePath}
                  tags={item.recipe.tags}
                  recipeUuid={item.recipe.uuid}
                  navigation={navigation}
                />
              </View>
            ))}
          </MealSmallCardList>
        </Fragment>
      ))}
    </Layout>
  );
};

const MealSmallCardList = styled(View)`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;
