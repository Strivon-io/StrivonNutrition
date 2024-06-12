import api from "~services/api";

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
