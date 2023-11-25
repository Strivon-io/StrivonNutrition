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

interface Props {
  addIngredient: (ingredient: string) => void
  setCalories: Dispatch<SetStateAction<string>>
  calories: string
}

export const CreateRecipeSettings = ({ calories, setCalories }: Props) => {
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])

  const { t } = useTranslation()
  const scrollViewRef = useRef<ScrollView>(null)

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true })
  }

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

  const handleNewIngredientSubmit = () => {
    if (newIngredient.trim() !== '') {
      addIngredient(newIngredient)
      setNewIngredient('')
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }

  return (
    <AppLayout isSeperatorLine isBackArrow isHeaderLogo useSafeAreaView>
      <LayoutSideColumns>
        <ScrollView>
          <View style={{ marginBottom: 200, marginTop: spacing.m }}>
            <View>
              <MainText
                style={{ marginBottom: spacing.xs }}
                fontType="bold-italic"
                fontSize="l"
                onSubmitEditing={handleNewIngredientSubmit}
              >
                {t('ingredients')} :
              </MainText>
              <CreateIngredientInputWrapper>
                <MainInput
                  placeholder={t('ingredients')}
                  style={{ width: '90%', marginRight: spacing.s }}
                  value={newIngredient}
                  onChangeText={(text) => {
                    setNewIngredient(text)
                  }}
                />
                <TouchableOpacity onPress={handleNewIngredientSubmit}>
                  <PlusIcon size={iconSize.m} color={colors.Alizarin} />
                </TouchableOpacity>
              </CreateIngredientInputWrapper>
              <IngredientListScrollView ref={scrollViewRef}>
                <IngredientList>
                  {ingredients.map((ingredient, index) => (
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <StyledInput
                        key={index.toString()}
                        value={ingredient}
                        onChangeText={(e) => handleIngredientChange(e, index)}
                      />
                      <IconInputWrapper onPress={() => removeIngredient(index)}>
                        <DeleteIcon size={iconSize.m} color={colors.Alizarin} />
                      </IconInputWrapper>
                    </View>
                  ))}
                </IngredientList>
              </IngredientListScrollView>
              <View
                style={{
                  marginTop: spacing.xs,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <MainCheckbox isChecked={true} setIsChecked={() => {}} />
                <MainText
                  style={{ marginLeft: spacing.xs }}
                  fontType="medium"
                  color={colors.Alizarin}
                  fontSize="s"
                >
                  {t('onlyUseIngredientOfThisList')}
                </MainText>
              </View>
            </View>
            <View style={{ marginTop: spacing.m }}>
              <MainText
                style={{ marginBottom: spacing.xs }}
                fontType="bold-italic"
                fontSize="l"
              >
                {t('dietaryRestrictions')} :
              </MainText>
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: spacing.xs,
                  rowGap: spacing.xs,
                  marginTop: spacing.s,
                  flexWrap: 'wrap',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <MainCheckbox isChecked={true} setIsChecked={() => {}} />
                  <MainText
                    style={{ marginLeft: spacing.xs }}
                    fontType="medium"
                    fontSize="m"
                  >
                    {t('dairyFree')}
                  </MainText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <MainCheckbox isChecked={true} setIsChecked={() => {}} />
                  <MainText
                    style={{ marginLeft: spacing.xs }}
                    fontType="medium"
                    fontSize="m"
                  >
                    {t('glutenFree')}
                  </MainText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <MainCheckbox isChecked={true} setIsChecked={() => {}} />
                  <MainText
                    style={{ marginLeft: spacing.xs }}
                    fontType="medium"
                    fontSize="m"
                  >
                    {t('vegan')}
                  </MainText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <MainCheckbox isChecked={true} setIsChecked={() => {}} />
                  <MainText
                    style={{ marginLeft: spacing.xs }}
                    fontType="medium"
                    fontSize="m"
                  >
                    {t('vegetarian')}
                  </MainText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <MainCheckbox isChecked={true} setIsChecked={() => {}} />
                  <MainText
                    style={{ marginLeft: spacing.xs }}
                    fontType="medium"
                    fontSize="m"
                  >
                    {t('pescatarian')}
                  </MainText>
                </View>
              </View>
            </View>
            <View style={{ marginTop: spacing.m }}>
              <MainText
                style={{ marginBottom: spacing.xs }}
                fontType="bold-italic"
                fontSize="l"
              >
                {t('numberOfCalories')} :
              </MainText>
              <MainInput
                style={{
                  width: 200,
                  marginRight: spacing.s,
                }}
                value={calories}
                onChangeText={(text) => {
                  setCalories(text)
                }}
                textColor={colors.Alizarin}
                fontType={'bold'}
              />
            </View>
            <MainButton
              style={{
                marginTop: spacing.m,
              }}
              onPress={() => {}}
              label={t('generate')}
            />
          </View>
        </ScrollView>
      </LayoutSideColumns>
    </AppLayout>
  )
}

const CreateIngredientInputWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const IngredientListScrollView = styled(ScrollView)``

const IngredientList = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: ${spacingPx.xs};
  width: 100%;
`

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
