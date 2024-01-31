import { Fragment, FC } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { format } from "date-fns";
import styled from "styled-components";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Layout } from "~components/layout/layout";
import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { PageTitle } from "~components/molecules/pageTitle";
import { SectionTitle } from "~components/organisms/sectionTitle";
import { CapitalizedFirstLetter } from "~utils/functions";
import { MealSmallCard } from "~components/organisms/mealSmallCard";
import { spacing, spacingPx } from "~constants/theme";
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

export const ScheduleScreen: FC<RecipesScreenProps> = () => {
  const { t } = useTranslation();

  const recipesByDate = ProgrammedRecipes.reduce((acc, recipe) => {
    const date = recipe.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(recipe);
    return acc;
  }, {});

  const uniqueDates = Object.keys(recipesByDate);

  return (
    <Layout useSafeAreaView>
      <ScrollView>
        <LayoutSideColumns style={{ marginBottom: spacing.m }}>
          <PageTitle title={t("Scheduling")} />
          {uniqueDates.map((date) => {
            const formattedDate = format(new Date(date), "EEEE dd MMMM yyyy", {
              locale: require("date-fns/locale/fr"),
            });

            const capitalizedDay = CapitalizedFirstLetter(
              formattedDate.split(" ")[0]
            );

            const finalFormattedDate = `${capitalizedDay}${formattedDate.slice(
              formattedDate.indexOf(" ")
            )}`;

            return (
              <Fragment key={date}>
                <SectionTitle
                  title={finalFormattedDate}
                  fontType="bold-italic"
                  fontSize="xl"
                />
                <MealSmallCardList>
                  {recipesByDate[date].map((item) => (
                    <View style={{ width: "47%" }}>
                      <MealSmallCard
                        key={item.id}
                        title={item.recipe.title}
                        kcal={item.recipe.kcal}
                        imagePath={item.recipe.imagePath}
                        tags={item.recipe.tags}
                        recipeUuid={item.recipe.uuid}
                      />
                    </View>
                  ))}
                </MealSmallCardList>
              </Fragment>
            );
          })}
        </LayoutSideColumns>
      </ScrollView>
    </Layout>
  );
};

const MealSmallCardList = styled(View)`
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: ${spacingPx.s};
  row-gap: ${spacingPx.s};
`;
