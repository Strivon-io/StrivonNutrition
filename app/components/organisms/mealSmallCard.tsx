import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ParamListBase } from "@react-navigation/native";

import { Text } from "~components/atoms/text";
import { colors, spacing } from "~constants/theme";
import { useQueryClient } from "@tanstack/react-query";
import { Recipe } from "~services/types/recipe.types";

interface Props<NavigationType = NativeStackNavigationProp<ParamListBase>> {
  recipe: Recipe;
  navigation: NavigationType;
}

export const MealSmallCard = ({ recipe, navigation }: Props) => {
  const queryClient = useQueryClient();

  const navigateToRecipe = () => {
    queryClient.setQueryData(["recipe", recipe._id], recipe);
    navigation.navigate("recipe", { recipeId: recipe._id });
  };

  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={navigateToRecipe}>
      <Image
        style={styles.dishImage}
        source={{ uri: recipe.image }}
        resizeMode="cover"
      />
      <View style={styles.titleAndKcal}>
        <Text
          fontFamily="Avenir-Medium"
          fontSize="m"
          color="darker.DarkestBlack"
        >
          {recipe.name}
        </Text>

        <Text fontFamily="Avenir-Bold" fontSize="m" color="Alizarin">
          {`${recipe.calories}Kcal`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dishImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  cardWrapper: {
    backgroundColor: colors.light.PureWhite,
    marginHorizontal: spacing.xs,
    minWidth: 165,
    maxWidth: 165,
    minHeight: 190,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  titleAndKcal: {
    padding: spacing.xs,
    rowGap: spacing.xs,
  },
});
