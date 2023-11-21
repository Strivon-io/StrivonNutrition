import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput } from 'react-native' // Import TextInput
import { PlusIcon } from '@components/atoms/icons/plusIcon'
import { MainText } from '@components/atoms/mainText'
import { AppLayout } from '@components/layout/layout'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { PageTitle } from '@components/molecules/pageTitle'
import { MealSmallCard } from '@components/organisms/mealSmallCard'
import { colors, iconSize, spacing, spacingPx } from '@constants/theme'
import { useTranslation } from 'react-i18next'
import { FlashList } from '@shopify/flash-list'
import { SearchBar } from '@components/molecules/searchBar'
import styled from 'styled-components'
import { ScrollView } from 'react-native-gesture-handler'

export const RecipesScreen = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([])

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

  return (
    <AppLayout useSafeAreaView>
      <PageTitle
        title={t('recipes')}
        leftChild={
          <TouchableOpacity
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
      <LayoutSideColumns style={{ flex: 1 }}>
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
    </AppLayout>
  )
}

const FlashListWrapper = styled(View)`
  flex: 1;
  height: 100%;
`
