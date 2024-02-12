import { useState, FC } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RecipesNavigatorParamList } from "~navigators/recipes-navigator";
import { PlusIcon } from "~assets/icons/plusIcon";
import { Text } from "~components/atoms/text";
import { Layout } from "~components/layout/layout";
import { PageTitle } from "~components/molecules/pageTitle";
import { MealSmallCard } from "~components/organisms/mealSmallCard";
import { colors, iconSize, spacing } from "~constants/theme";
import { SearchBar } from "~components/molecules/searchBar";

type RecipesScreenProps = NativeStackScreenProps<
  RecipesNavigatorParamList,
  "recipes"
>;

export const RecipesScreen: FC<RecipesScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  const toggleActionTray = () => {
    navigation.navigate("createRecipeSettings");
  };

  return (
    <Layout>
      <PageTitle
        title={t("recipes")}
        rightChild={
          <TouchableOpacity
            onPress={toggleActionTray}
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 4,
            }}
          >
            <Text color="Alizarin" fontFamily="Avenir-Bold-Italic">
              Ai
            </Text>
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
      <View style={styles.flashListWrapper}>
        <FlashList
          numColumns={2}
          estimatedItemSize={175}
          showsVerticalScrollIndicator={false}
          data={search ? filteredData : DATA}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: spacing.xs }}>
              <MealSmallCard
                title={item.title}
                kcal={item.kcal}
                imagePath={item.imagePath}
                tags={item.tags}
                recipeUuid={item.uuid}
                navigation={navigation}
              />
            </View>
          )}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  flashListWrapper: {
    flex: 1,
  },
});
