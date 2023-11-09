import { View, Text } from 'react-native'
import { AppLayout } from '../../components/layout/layout'
import { styled } from 'styled-components'
import { MainText } from '../../components/atoms/mainText'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from '../../components/molecules/sectionHeader'
import { spacingPx } from '../../constants/theme'

export const SignupScreen = () => {
  const { t } = useTranslation()
  return (
    <AppLayout useSafeAreaView isHeaderLogo>
      <Wrapper>
        <SectionHeader
          title={t('my-informations_plural')}
          sideElement={<MainText fontType="bold-italic">(1/2)</MainText>}
        />
      </Wrapper>
    </AppLayout>
  )
}

const Wrapper = styled(View)`
  margin-top: ${spacingPx.l};
`
