import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native' // Import TextInput
import { PlusIcon } from '@components/atoms/icons/plusIcon'
import { MainText } from '@components/atoms/mainText'
import { AppLayout } from '@components/layout/layout'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { PageTitle } from '@components/molecules/pageTitle'
import { MealSmallCard } from '@components/organisms/mealSmallCard'
import {
  boxShadow,
  colors,
  iconSize,
  spacing,
  spacingPx,
} from '@constants/theme'
import { useTranslation } from 'react-i18next'
import { FlashList } from '@shopify/flash-list'
import { SearchBar } from '@components/molecules/searchBar'
import styled from 'styled-components'
import { ScrollView } from 'react-native-gesture-handler'
import {
  MainBottomSheet,
  bottomSheetRef,
} from '@components/molecules/BottomSheet'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { MainButton } from '@components/molecules/mainButton'
import { CameraIcon } from '@navigation/icons/cameraIcon'
import { HomeIcon } from '@navigation/icons/homeIcon'
import { EditIcon } from '@navigation/icons/editIcon'
import { CreateRecipeFirstStep } from './components/bottomSheetContent/createRecipeFirstStep'
import { MainInput } from '@components/molecules/mainInput'

export const RecipesScreen = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const [modaleHeight, setModaleHeight] = useState(450)
  const [calories, setCalories] = useState('')

  const DATA = [
    {
      title: 'Grilled Chicken and Vegetable Salad',
      kcal: 240,
      imagePath: require('@assets/recipeImages/exempleOfRecipe.png'),
      tags: ['meal'],
    },
    {
      title: 'Grilled Chicken and Vegetable Salad',
      kcal: 240,
      imagePath: require('@assets/recipeImages/exempleOfRecipe.png'),
      tags: ['breakfast', 'snack'],
    },
    {
      title: 'Grilled Chicken and Vegetable Salad',
      kcal: 240,
      imagePath: require('@assets/recipeImages/exempleOfRecipe.png'),
      tags: ['snack'],
    },
  ]

  const updateSearch = (searchText) => {
    setSearch(searchText)
    const newData = DATA.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    setFilteredData(newData)
  }

  const [step, setStep] = useState(0)
  const ref = useRef<bottomSheetRef>(null)
  const { height: screenHeight } = useWindowDimensions()

  const isActionTrayOpened = useSharedValue(false)

  const close = useCallback(() => {
    ref.current?.close()
    isActionTrayOpened.value = false
    setStep(0)
    setModaleHeight(300)
  }, [])

  const rContentHeight = useDerivedValue(() => {
    return interpolate(step, [0, 1], [340, modaleHeight], Extrapolate.CLAMP)
  }, [step, modaleHeight])

  const rContentStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(rContentHeight.value),
    }
  }, [])

  const toggleActionTray = useCallback(() => {
    const isActive = ref.current?.isActive() ?? false
    isActionTrayOpened.value = !isActive
    isActive ? close() : ref.current?.open()
  }, [close, isActionTrayOpened])

  const title = useMemo(() => {
    switch (step) {
      case 0:
        return t('generateNewRecipe')
      case 1:
        return t('theIgredientForMyRecipe')
    }
  }, [step])

  return (
    <AppLayout useSafeAreaView>
      <LayoutSideColumns style={{ flex: 1 }}>
        <PageTitle
          title={t('recipes')}
          leftChild={
            <TouchableOpacity
              onPress={toggleActionTray}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 4,
              }}
            >
              <MainText color={colors.Alizarin} fontType="bold-italic">
                Ai
              </MainText>
              <PlusIcon size={iconSize.m} color={colors.Alizarin} />
            </TouchableOpacity>
          }
        />
        <View style={{ marginTop: spacing.m, marginBottom: spacing.xs }}>
          <SearchBar
            placeholder="Chercher une recette"
            onChangeText={updateSearch}
          />
        </View>
        <FlashListWrapper>
          <FlashList
            numColumns={2}
            data={search ? filteredData : DATA}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MealSmallCard
                title={item.title}
                kcal={item.kcal}
                imagePath={item.imagePath}
                tags={item.tags}
              />
            )}
          />
        </FlashListWrapper>
      </LayoutSideColumns>
      <MainBottomSheet
        ref={ref}
        maxHeight={screenHeight * 0.6}
        style={{
          backgroundColor: '#FFF',
          flex: 1,
          padding: 25,
        }}
        onClose={close}
      >
        <View style={{ marginBottom: spacing.s }}>
          <MainText color={colors.Alizarin} fontType="bold-italic" fontSize="l">
            {title}
          </MainText>
        </View>
        <Animated.View style={rContentStyle}>
          {step === 0 && <CreateRecipeFirstStep />}
        </Animated.View>
      </MainBottomSheet>
    </AppLayout>
  )
}

const FlashListWrapper = styled(View)`
  flex: 1;
  height: 100%;
`
