import { useState, FC } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
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
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllRecipeByUser } from "~services/routes/recipe";
import { Recipe } from "~services/types/recipe.types";

type RecipesScreenProps = NativeStackScreenProps<
  RecipesNavigatorParamList,
  "recipes"
>;

export const RecipesScreen: FC<RecipesScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Recipe[]>([]);

  const listLimit = 10;

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipes"],
    queryFn: ({ pageParam = 0 }) => getAllRecipeByUser(listLimit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === listLimit
        ? allPages.length * listLimit
        : undefined;
    },
    initialPageParam: 0,
  });

  const updateSearch = (searchText: string) => {
    setSearch(searchText);
    if (data) {
      const allRecipes = data.pages.flat();
      const newData = allRecipes.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(newData);
    }
  };

  console.log(data);

  const toggleActionTray = () => {
    navigation.navigate("createRecipeSettings");
  };

  return (
    <Layout noPadding>
      <>
        <View style={{ paddingHorizontal: 20 }}>
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
              value={search}
            />
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.Alizarin} />
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <FlashList
            style={{
              flex: 1,
              alignSelf: "center",
            }}
            ItemSeparatorComponent={() => (
              <View style={{ height: spacing.xs, width: spacing.xs }} />
            )}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: spacing.m,
            }}
            horizontal={false}
            numColumns={2}
            estimatedItemSize={175}
            showsVerticalScrollIndicator={false}
            data={search ? filteredData : data.pages.flat()}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }: { item: Recipe }) => (
              <View key={item._id}>
                <MealSmallCard recipe={item} navigation={navigation} />
              </View>
            )}
            onEndReached={() => {
              if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator size="large" color={colors.Alizarin} />
              ) : null
            }
          />
        )}
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: spacing.xs,
  },
  flashListWrapper: {
    flex: 1,
    alignSelf: "center",
  },
});
