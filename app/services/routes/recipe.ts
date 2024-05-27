import axios from "axios";
import { CreateRecipe } from "~services/types/recipe.types";

export const createRecipe = async (data: CreateRecipe): Promise<any> => {
  const response = await axios.post(`http://localhost:8000/recipes`, {
    ...data,
    isPremiumGenerated: true,
  });
  return response.data;
};
