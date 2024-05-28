import { useState, FC } from 'react'
import { spacing, spacingPx } from '~constants/theme'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Layout } from '~components/layout/layout'
import { AddIngredientSection } from './components/sections/addIngredientSection'
import { DietaryRestrictionsSection } from './components/sections/dietaryRestrictionsSection'
import { NumberOfCaloriesSection } from './components/sections/numberOfCaloriesSection'
import { MainButton } from '~components/molecules/mainButton'
import { useMutation } from '@tanstack/react-query'
import { createRecipe } from '~services/routes/recipe'
import { CreateRecipe } from '~services/types/recipe.types'
import LottieView from 'lottie-react-native'
import LoaderLottie from '~assets/lotties/Vegetable Bag Lineal (2).json'
import { Text } from '~components/atoms/text'

export const CreateRecipeSettingsScreen: FC = () => {
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

  const handleNewIngredientSubmit = (newIngredient, setNewIngredient) => {
    if (newIngredient.trim() !== '') {
      addIngredient(newIngredient)
      setNewIngredient('')
    } else {
      setIngredients((prevIngredients) => {
        const updatedIngredients = prevIngredients.filter(
          (ingredient) => ingredient.trim() !== '',
        )
        return updatedIngredients
      })
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateRecipe) => {
      return createRecipe(data)
    },
  })

  const handleCreateRecipe = () => {
    mutate({
      ingredients: ingredients,
      onlyUseAskedIngredients: onlyUseIngredients,
      calories: parseInt(calories, 10),
      restrictions: dietaryRestrictions,
    })
  }

  return (
    <Layout
      pageTitle={!isPending ? t('generateRecipe') : ''}
      isHeader
      isBackArrow={!isPending}
      isHeaderLogo={isPending}
      scrollView={!isPending}
    >
      <>
        {isPending ? (
          <View style={styles.loaderContent}>
            <LottieView
              source={LoaderLottie}
              autoPlay
              loop
              style={styles.animation}
            />
            <Text fontSize="l" textAlign="center">
              We are preparing your recipe... 😉
            </Text>
          </View>
        ) : (
          <>
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
            <MainButton label={t('generate')} onPress={handleCreateRecipe} />
          </>
        )}
      </>
    </Layout>
  )
}

const styles = StyleSheet.create({
  loaderContent: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '50%',
  },
  animation: {
    width: 200,
    height: 200,
  },
})
