export type CreateRecipe = {
  ingredients: string[];
  onlyUseAskedIngredients: boolean;
  calories: number;
  restrictions: string[];
};

export type Ingredient = {
  _id: string;
  name: string;
  quantity: number;
  unity: string;
  calories: number;
};

export type Instruction = {
  title: string;
  step: number;
  description: string;
};

export type Recipe = {
  _id: string;
  name: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  onlyUseAskedIngredients: boolean;
  calories: number;
  carbs: number;
  proteins: number;
  restrictions: string[];
};
