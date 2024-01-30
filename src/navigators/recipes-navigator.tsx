import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RecipesScreen } from "@scene/recipes";
import { CreateRecipeSettingsScreen } from "@scene/createRecipeSettings";
import { RecipeScreen } from "@scene/recipe";

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
