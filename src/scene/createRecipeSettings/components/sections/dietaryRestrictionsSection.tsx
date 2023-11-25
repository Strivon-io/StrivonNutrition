import { MainCheckbox } from '@components/atoms/mainCheckbox'
import { MainText } from '@components/atoms/mainText'
import { spacing } from '@constants/theme'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

interface Props {}

export const DietaryRestrictionsSection = ({}: Props) => {
  const { t } = useTranslation()
  return (
    <View style={{ marginTop: spacing.m }}>
      <MainText
        style={{ marginBottom: spacing.xs }}
        fontType="bold"
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
  )
}
