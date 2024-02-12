import { useState, FC } from "react";
import { spacing } from "~constants/theme";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Layout } from "~components/layout/layout";

import { AddIngredientSection } from "./components/sections/addIngredientSection";
import { DietaryRestrictionsSection } from "./components/sections/dietaryRestrictionsSection";
import { NumberOfCaloriesSection } from "./components/sections/numberOfCaloriesSection";
import { MainButton } from "~components/molecules/mainButton";

export const CreateRecipeSettingsScreen: FC = () => {
  const [ingredients, setIngredients] = useState([]);
  const [onlyUseIngredients, setOnlyUseIngredients] = useState(false);
  const [calories, setCalories] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

  const { t } = useTranslation();

  const addIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleIngredientChange = (text: string, index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = text;
    setIngredients(updatedIngredients);
  };

  const removeIngredient = (indexToRemove: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(indexToRemove, 1);
    setIngredients(updatedIngredients);
  };

  const handleNewIngredientSubmit = (newIngredient, setNewIngredient) => {
    if (newIngredient.trim() !== "") {
      addIngredient(newIngredient);
      setNewIngredient("");
    } else {
      setIngredients((prevIngredients) => {
        const updatedIngredients = prevIngredients.filter(
          (ingredient) => ingredient.trim() !== ""
        );
        return updatedIngredients;
      });
    }
  };

  return (
    <>
      <Layout pageTitle={t("generateRecipe")} isBackArrow isHeader scrollView>
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: spacing.l }}>
            <AddIngredientSection
              ingredients={ingredients}
              handleNewIngredientSubmit={handleNewIngredientSubmit}
              handleIngredientChange={handleIngredientChange}
              removeIngredient={removeIngredient}
              onlyUseIngredients={onlyUseIngredients}
              setOnlyUseIngredients={setOnlyUseIngredients}
            />
          </View>
          <View style={{ marginBottom: spacing.l }}>
            <DietaryRestrictionsSection
              dietaryRestrictions={dietaryRestrictions}
              setDietaryRestrictions={setDietaryRestrictions}
            />
          </View>
          <View style={{ marginBottom: spacing.l }}>
            <NumberOfCaloriesSection
              calories={calories}
              setCalories={setCalories}
            />
          </View>
        </View>

        <MainButton label={t("generate")} onPress={() => {}} />
      </Layout>
    </>
  );
};
