import { MainText } from '@components/atoms/mainText'
import { MainInput } from '@components/molecules/mainInput'
import { colors, spacing } from '@constants/theme'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

interface Props {
  calories: string
  setCalories: Dispatch<SetStateAction<string>>
}

export const NumberOfCaloriesSection = ({ calories, setCalories }: Props) => {
  const { t } = useTranslation()
  return (
    <View style={{ marginTop: spacing.m }}>
      <MainText
        style={{ marginBottom: spacing.xs }}
        fontType="bold"
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
  )
}
