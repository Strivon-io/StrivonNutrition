import axios from "axios";
import { CreateRecipe, Recipe } from "~services/types/recipe.types";

export const createRecipe = async (data: CreateRecipe): Promise<any> => {
  const response = await axios.post(`http://localhost:8000/recipes`, {
    ...data,
    isPremiumGenerated: true,
  });
  return response.data;
};

export const getRecipeById = async (recipeId: string): Promise<Recipe> => {
  const response = await axios.get(`http://localhost:8000/recipes/${recipeId}`);
  return response.data;
};
