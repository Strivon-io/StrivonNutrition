import { View } from 'react-native'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'
import { MainText } from '@components/atoms/mainText'
import { spacing } from '@constants/theme'

export const HomeWelcomeSection = () => {
  return (
    <View style={[{ marginBottom: spacing.m }]}>
      <LayoutSideColumns>
        <MainText fontType="bold-italic" fontSize="l">
          Salut, Hugues !
        </MainText>
        <MainText
          style={{ marginTop: spacing.xs }}
          fontType="regular"
          fontSize="m"
        >
          Voici ce que tu dois savoir aujourd'hui 👨‍🍳
        </MainText>
      </LayoutSideColumns>
    </View>
  )
}
