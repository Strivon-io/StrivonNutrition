import { MainText } from '@components/atoms/mainText'
import { boxShadow, colors, spacingPx } from '@constants/theme'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import styled from 'styled-components'

interface Props {
  title: string
  informations: {
    protein: number
    carbohydrate: number
    calories: number
  }
}

export const RecipeTitleAndInformations = ({ title, informations }: Props) => {
  const { t } = useTranslation()
  return (
    <RecipeNameAndInformations>
      <MainText fontType="bold-italic" fontSize="m" textAlign="center">
        {title}
      </MainText>
      <InformationsWrapper>
        <InformationBlock title={t('protein')} value={'19g'} />
        <InformationBlock title={t('calories')} value={'540'} />
        <InformationBlock title={t('carbohydrate')} value={'19g'} />
      </InformationsWrapper>
    </RecipeNameAndInformations>
  )
}

const InformationBlock = ({ title, value }) => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <MainText color={colors.Alizarin} fontType="bold-italic" fontSize="m">
        {title}
      </MainText>
      <MainText fontType="medium" fontSize="m">
        {value}
      </MainText>
    </View>
  )
}

const InformationsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${spacingPx.s};
`

const RecipeNameAndInformations = styled(View)`
  ${boxShadow}
  width: 100%;
  background-color: ${colors.light.PureWhite};
  height: 150px;
  align-self: center;
  transform: translateY(-80px);
  border-radius: ${spacingPx.xs};
  padding: ${spacingPx.l};
  z-index: 100;
  justify-content: center;
`
