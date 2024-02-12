import { Dispatch, SetStateAction, useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";

import { Checkbox } from "~components/atoms/checkbox";
import { MainText } from "~components/atoms/mainText";
import { MainInput } from "~components/molecules/mainInput";
import { colors, iconSize, spacing, spacingPx } from "~constants/theme";
import { PlusIcon } from "~assets/icons/plusIcon";
import { SectionHeader } from "~components/molecules/sectionHeader";

import { InputWithIcon } from "../molecules/inputWithIcon";

interface AddIngredientSectionProps {
  ingredients: string[];
  onlyUseIngredients: boolean;
  handleNewIngredientSubmit: (
    newIngredient: string,
    setNewIngredient: Dispatch<SetStateAction<string>>
  ) => void;
  handleIngredientChange: (text: string, index: number) => void;
  removeIngredient: (index: number) => void;
  setOnlyUseIngredients: Dispatch<SetStateAction<boolean>>;
}

export const AddIngredientSection: FC<AddIngredientSectionProps> = ({
  ingredients,
  onlyUseIngredients,
  handleNewIngredientSubmit,
  handleIngredientChange,
  removeIngredient,
  setOnlyUseIngredients,
}) => {
  const [newIngredient, setNewIngredient] = useState("");
  const { t } = useTranslation();

  return (
    <View>
      <SectionHeader title={`${t("ingredient")}s`} />
      <CreateIngredientInputWrapper>
        <MainInput
          placeholder={t("addIngredientToTheRecipe")}
          style={{
            flex: 1,
          }}
          value={newIngredient}
          onChangeText={(text) => {
            setNewIngredient(text);
          }}
        />
        <TouchableOpacity
          onPress={() =>
            handleNewIngredientSubmit(newIngredient, setNewIngredient)
          }
        >
          <PlusIcon size={iconSize.m} color={colors.Alizarin} />
        </TouchableOpacity>
      </CreateIngredientInputWrapper>

      <IngredientList>
        {ingredients.map((ingredient, index) => (
          <InputWithIcon
            key={index}
            ingredient={ingredient}
            index={index}
            handleIngredientChange={handleIngredientChange}
            removeIngredient={removeIngredient}
          />
        ))}
      </IngredientList>

      <View
        style={{
          marginTop: spacing.xs,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          isChecked={onlyUseIngredients}
          setIsChecked={() => {
            setOnlyUseIngredients(!onlyUseIngredients);
          }}
        />
        <MainText
          style={{ marginLeft: spacing.xs }}
          fontType="medium"
          color={colors.darker.DarkestBlack}
          fontSize="s"
        >
          {t("onlyUseIngredientOfThisList")}
        </MainText>
      </View>
    </View>
  );
};

const CreateIngredientInputWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: ${spacingPx.xs};
  gap: ${spacingPx.s};
`;

const IngredientList = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: ${spacingPx.xs};
  width: 100%;
`;
