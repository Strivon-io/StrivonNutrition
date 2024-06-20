import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { preview } from "react-native-ide";
import { Text } from "~components/atoms/text";
import { spacing } from "~constants/theme";
import { Recipe } from "~services/types/recipe.types";

export const MealCarouselCard: FC<{ navigation; recipe: Recipe }> = ({
  navigation,
  recipe,
}) => {
  const queryClient = useQueryClient();
  const navigateToRecipe = () => {
    queryClient.setQueryData(["recipe", recipe._id], recipe);
    navigation.navigate("recipe", { recipeId: recipe._id });
  };
  return (
    <TouchableOpacity onPress={navigateToRecipe} style={styles.background}>
      <Image
        style={styles.dishImage}
        source={{ uri: recipe?.image }}
        resizeMode="cover"
      />
      <View style={styles.imageOverlay} />

      <View style={styles.titleAndKcal}>
        <Text fontFamily="Avenir-Bold" fontSize="s" color="light.PureWhite">
          {recipe?.name}
        </Text>
        <Text
          style={{
            marginTop: spacing.xs,
          }}
          fontFamily="Avenir-Bold"
          fontSize="s"
          color="Alizarin"
        >
          {`${recipe?.calories}Kcal`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 100,
  },
  titleAndKcal: {
    position: "absolute",
    bottom: spacing.s,
    left: spacing.s,
    right: spacing.s,
  },
  dishImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: spacing.s,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    borderRadius: spacing.s,
  },
});
