import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RecipesScreen } from '~screens/recipes'
import { CreateRecipeSettingsScreen } from '~screens/createRecipeSettings'
import { RecipeScreen } from '~screens/recipe'
import { useEffect } from 'react'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

export type RecipesNavigatorParamList = {
  recipes: undefined
  createRecipeSettings: undefined
  recipe: { recipeUuid: string }
}

const Recipes = createNativeStackNavigator<RecipesNavigatorParamList>()

export const RecipesNavigator = ({ navigation, route }) => {
  const hidedTabBarRoutes = ['createRecipeSettings', 'recipe']

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (hidedTabBarRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } })
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } })
    }
  }, [navigation, route])

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
  )
}

RecipesNavigator.displayName = 'RecipesNavigator'
