export type CreateRecipe = {
  ingredients: string[];
  onlyUseAskedIngredients: boolean;
  calories: number;
  restrictions: string[];
};
