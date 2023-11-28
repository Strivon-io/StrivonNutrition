import { MainText } from '@components/atoms/mainText'
import { InputStyle, MainInput } from '@components/molecules/mainInput'
import { SectionHeader } from '@components/molecules/sectionHeader'
import { colors, spacing, spacingPx } from '@constants/theme'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import styled from 'styled-components'

interface Props {
  calories: string
  setCalories: Dispatch<SetStateAction<string>>
}

export const NumberOfCaloriesSection = ({ calories, setCalories }: Props) => {
  const { t } = useTranslation()
  return (
    <View>
      <SectionHeader title={t('numberOfCalories')} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: spacing.s,
        }}
      >
        <CustomInput
          keyboardType="number-pad"
          placeholder={t('numberOfCalories')}
          style={{
            width: 180,
          }}
          value={calories}
          onChangeText={(text) => {
            setCalories(text)
          }}
          textColor={colors.Alizarin}
          fontType={'bold'}
        />
        <KcalWrapper>
          <MainText fontType="medium" color={colors.Alizarin} fontSize="m">
            Kcal
          </MainText>
        </KcalWrapper>
      </View>
    </View>
  )
}

const KcalWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: ${spacingPx.s};
  background-color: ${colors.light.AliceBlue};
  border-radius: 0 ${spacingPx.s} ${spacingPx.s} 0;
`

const CustomInput = styled(MainInput)`
  ${InputStyle}
  height: 60px;
  padding: 0;
  margin: 0;
  margin-right: 0;
  border-radius: ${spacingPx.s} 0 0 ${spacingPx.s};
`
