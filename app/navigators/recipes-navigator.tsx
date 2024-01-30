import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RecipesScreen } from "~screens/recipes";
import { CreateRecipeSettingsScreen } from "~screens/createRecipeSettings";
import { RecipeScreen } from "~screens/recipe";

export type RecipesNavigatorParamList = {
  recipes: undefined;
  createRecipeSettings: undefined;
  recipe: undefined;
};

const Recipes = createNativeStackNavigator<RecipesNavigatorParamList>();

export const RecipesNavigator = () => {
  return (
    <Recipes.Navigator
      initialRouteName="recipes"
      screenOptions={{ headerShown: false }}
    >
      <Recipes.Screen name="recipes" component={RecipesScreen} />
      <Recipes.Screen
        name="createRecipeSettings"
        component={CreateRecipeSettingsScreen}
      />
      <Recipes.Screen name="recipe" component={RecipeScreen} />
    </Recipes.Navigator>
  );
};

RecipesNavigator.displayName = "RecipesNavigator";
