import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from 'react'
import {
  boxShadow,
  colors,
  iconSize,
  spacing,
  spacingPx,
} from '@constants/theme'
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
import { isSmallScreen } from '@utils/deviceDetector'

export const CreateRecipeSettings = () => {
  const [ingredients, setIngredients] = useState([])
  const [onlyUseIngredients, setOnlyUseIngredients] = useState(false)
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
    } else {
      setIngredients((prevIngredients) => {
        const updatedIngredients = prevIngredients.filter(
          (ingredient) => ingredient.trim() !== '',
        )
        return updatedIngredients
      })
    }
  }

  return (
    <AppLayout
      pageTitle={t('generateRecipe')}
      isBackArrow
      isHeader
      useSafeAreaView
    >
      <LayoutSideColumns style={{ height: '100%' }}>
        <View style={{ marginBottom: spacing.m }}>
          <AddIngredientSection
            ingredients={ingredients}
            handleNewIngredientSubmit={handleNewIngredientSubmit}
            handleIngredientChange={handleIngredientChange}
            removeIngredient={removeIngredient}
            onlyUseIngredients={onlyUseIngredients}
            setOnlyUseIngredients={setOnlyUseIngredients}
          />
        </View>
        <View style={{ marginBottom: spacing.m }}>
          <DietaryRestrictionsSection
            dietaryRestrictions={dietaryRestrictions}
            setDietaryRestrictions={setDietaryRestrictions}
          />
        </View>
        <View style={{ marginBottom: spacing.m }}>
          <NumberOfCaloriesSection
            calories={calories}
            setCalories={setCalories}
          />
        </View>
      </LayoutSideColumns>
      <ValidateBlockWrapper>
        <LayoutSideColumns>
          <View
            style={{
              marginBottom: isSmallScreen ? spacing.xs : spacing.l,
            }}
          >
            <View style={{ marginTop: spacing.m }}>
              <MainButton
                style={boxShadow}
                label={t('generate')}
                onPress={() => {}}
              />
            </View>
          </View>
        </LayoutSideColumns>
      </ValidateBlockWrapper>
    </AppLayout>
  )
}

const ValidateBlockWrapper = styled(View)`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: ${colors.light.PureWhite};
`
