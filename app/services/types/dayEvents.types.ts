import { ScheduledRecipe } from "./recipe.types";

export type DayEvents = {
  scheduledRecipes: ScheduledRecipe[];
  shoppingList: any;
  scheduledRecipesDates: string[];
};
