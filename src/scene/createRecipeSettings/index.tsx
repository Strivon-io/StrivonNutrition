import React, { Dispatch, SetStateAction, useState, useRef } from 'react'
import { colors, iconSize, spacing, spacingPx } from '@constants/theme'
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import styled from 'styled-components'
import { MainText } from '@components/atoms/mainText'
import { MainInput } from '@components/molecules/mainInput'
import { PlusIcon } from '@components/atoms/icons/plusIcon'
import { useTranslation } from 'react-i18next'
import { MainButton } from '@components/molecules/mainButton'
import { MainCheckbox } from '@components/atoms/mainCheckbox'
import { AppLayout } from '@components/layout/layout'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { SectionTitle } from '@components/organisms/sectionTitle'
import { PageTitle } from '@components/molecules/pageTitle'
import { TextInput } from 'react-native-gesture-handler'
import { HomeIcon } from '@navigation/icons/homeIcon'
import { DeleteIcon } from '@navigation/icons/deleteIcon'
import { InputWithIcon } from './components/molecules/inputWithIcon'
import { AddIngredientSection } from './components/sections/addIngredientSection'
import { DietaryRestrictionsSection } from './components/sections/dietaryRestrictionsSection'
import { NumberOfCaloriesSection } from './components/sections/numberOfCaloriesSection'

export const CreateRecipeSettings = () => {
  const [ingredients, setIngredients] = useState([])
  const [calories, setCalories] = useState('')
  const [dietaryRestrictions, setDietaryRestrictions] = useState([])

  const { t } = useTranslation()

  const addIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient])
  }

  const handleIngredientChange = (text: string, index: number) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index] = text
    setIngredients(updatedIngredients)
  }

  const removeIngredient = (indexToRemove: number) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients.splice(indexToRemove, 1)
    setIngredients(updatedIngredients)
  }

  const handleNewIngredientSubmit = (
    newIngredient,
    setNewIngredient,
    scrollToBottom,
  ) => {
    if (newIngredient.trim() !== '') {
      addIngredient(newIngredient)
      setNewIngredient('')
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }

  return (
    <AppLayout
      pageTitle={t('generateRecipe')}
      isBackArrow
      isHeader
      useSafeAreaView
    >
      <LayoutSideColumns>
        <ScrollView>
          <AddIngredientSection
            ingredients={ingredients}
            handleNewIngredientSubmit={handleNewIngredientSubmit}
            handleIngredientChange={handleIngredientChange}
            removeIngredient={removeIngredient}
          />
          <DietaryRestrictionsSection />
          <NumberOfCaloriesSection
            calories={calories}
            setCalories={setCalories}
          />
          <MainButton
            style={{
              marginTop: spacing.m,
            }}
            onPress={() => {}}
            label={t('generate')}
          />
        </ScrollView>
      </LayoutSideColumns>
    </AppLayout>
  )
}

const StyledInput = styled(TextInput)<{ textColor: string; fontType: string }>`
  padding-left: ${spacingPx.s};
  height: 40px;
  background-color: ${colors.light.AliceBlue};
  border-radius: ${spacingPx.xs} 0 0 ${spacingPx.xs};
  font-family: ${(props) =>
    props.fontType
      ? `AvenirNext-${
          props.fontType.substring(0, 1).toUpperCase() +
          props.fontType.substring(1)
        }`
      : 'AvenirNext-Medium'};
  color: ${(props) =>
    props.textColor ? props.textColor : colors.darker.DarkestBlack};
`

const IconInputWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.light.AliceBlue};
  height: 40px;
  padding: ${spacingPx.xs};
  margin: ${spacingPx.xs} 0;
  border-radius: 0 ${spacingPx.xs} ${spacingPx.xs} 0;
`
