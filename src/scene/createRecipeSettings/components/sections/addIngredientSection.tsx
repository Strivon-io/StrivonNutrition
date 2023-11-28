import { MainCheckbox } from '@components/atoms/mainCheckbox'
import { MainText } from '@components/atoms/mainText'
import { MainInput } from '@components/molecules/mainInput'
import { colors, iconSize, spacing, spacingPx } from '@constants/theme'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { InputWithIcon } from '../molecules/inputWithIcon'
import { PlusIcon } from '@components/atoms/icons/plusIcon'
import { SectionHeader } from '@components/molecules/sectionHeader'

interface Props {
  ingredients: string[]
  handleNewIngredientSubmit: (
    newIngredient: string,
    setNewIngredient: Dispatch<SetStateAction<string>>,
    scrollToBottom: () => void,
  ) => void
  handleIngredientChange: (text: string, index: number) => void
  removeIngredient: (index: number) => void
  onlyUseIngredients: boolean
  setOnlyUseIngredients: Dispatch<SetStateAction<boolean>>
}

export const AddIngredientSection = ({
  ingredients,
  handleNewIngredientSubmit,
  handleIngredientChange,
  removeIngredient,
  onlyUseIngredients,
  setOnlyUseIngredients,
}: Props) => {
  const [newIngredient, setNewIngredient] = useState('')
  const scrollViewRef = useRef<ScrollView>(null)
  const { t } = useTranslation()

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true })
  }

  return (
    <View>
      <SectionHeader title={`${t('ingredient')}s`} />
      <CreateIngredientInputWrapper>
        <MainInput
          placeholder={t('addIngredientToTheRecipe')}
          style={{
            width: '80%',
            marginRight: spacing.s,
          }}
          value={newIngredient}
          onChangeText={(text) => {
            setNewIngredient(text)
          }}
        />
        <TouchableOpacity
          onPress={() =>
            handleNewIngredientSubmit(
              newIngredient,
              setNewIngredient,
              scrollToBottom,
            )
          }
        >
          <PlusIcon size={iconSize.m} color={colors.Alizarin} />
        </TouchableOpacity>
      </CreateIngredientInputWrapper>
      <IngredientListScrollView ref={scrollViewRef}>
        <IngredientList>
          {ingredients.map((ingredient, index) => (
            <InputWithIcon
              ingredient={ingredient}
              index={index}
              handleIngredientChange={handleIngredientChange}
              removeIngredient={removeIngredient}
            />
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
        <MainCheckbox
          isChecked={onlyUseIngredients}
          setIsChecked={() => {
            setOnlyUseIngredients(!onlyUseIngredients)
          }}
        />
        <MainText
          style={{ marginLeft: spacing.xs }}
          fontType="medium"
          color={colors.darker.DarkestBlack}
          fontSize="s"
        >
          {t('onlyUseIngredientOfThisList')}
        </MainText>
      </View>
    </View>
  )
}

const CreateIngredientInputWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: ${spacingPx.xs};
`

const IngredientListScrollView = styled(ScrollView)``

const IngredientList = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: ${spacingPx.xs};
  width: 100%;
`
