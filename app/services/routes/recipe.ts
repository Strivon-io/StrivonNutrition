import api from "~services/api";
import { CreateRecipe, Recipe } from "~services/types/recipe.types";

export const createRecipe = async (data: CreateRecipe): Promise<any> => {
  const response = await api.post(`http://localhost:8000/recipes`, {
    ...data,
    isPremiumGenerated: true,
  });
  return response.data;
};

export const getRecipeById = async (recipeId: string): Promise<Recipe> => {
  const response = await api.get(`http://localhost:8000/recipes/${recipeId}`);
  return response.data;
};

export const getAllRecipeByUser = async (
  limit: number,
  skip: number
): Promise<Recipe[]> => {
  const response = await api.get(
    `http://localhost:8000/recipes?limit=${limit}&skip=${skip}`
  );
  return response.data;
};
