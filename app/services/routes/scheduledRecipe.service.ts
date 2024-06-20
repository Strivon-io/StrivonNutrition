import api from "~services/api";
import { ShoppingListItem } from "~services/types/recipe.types";

export const postScheduledRecipe = async (
  recipeId: string,
  date: Date,
  mealType: string
) => {
  const response = await api.post("/scheduledRecipes", {
    recipeId,
    date: date.toISOString(),
    mealType: mealType,
  });
  return response.data;
};

export const updateShoppingList = async (
  id: string,
  items: ShoppingListItem[],
  date: Date
) => {
  const response = await api.put(`/shoppingList/${id}`, {
    items,
    date: date.toISOString(),
  });
  return response.data;
};
