import { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { styled } from 'styled-components'

import { useTranslation } from 'react-i18next'
import { isSmallScreen } from '@utils/deviceDetector'

import { AppLayout } from '@components/layout/layout'
import { SectionHeader } from '@components/molecules/sectionHeader'
import { colors, iconSize, spacing, spacingPx } from '@constants/theme'
import { MainInput } from '@components/molecules/mainInput'
import { MainText } from '@components/atoms/mainText'
import { MainButton } from '@components/molecules/mainButton'
import { MainCheckbox } from '@components/atoms/mainCheckbox'
import { RightChevron } from '@components/atoms/icons/rightChevron'
import { ValidateFormBlock } from './components/validateFormBlock'

export const SignupScreen = () => {
  const [signUpStep, setSignUpStep] = useState(0)
  const { t } = useTranslation()

  const handleValidate = () => {
    setSignUpStep(signUpStep + 1)
  }
  return (
    <>
      <AppLayout useSafeAreaView isHeaderLogo isBackArrow>
        <Wrapper>
          <SectionHeader
            title={t('my-informations')}
            sideElement={
              <MainText fontType="bold-italic">{`(${
                signUpStep + 1
              }/2)`}</MainText>
            }
          />
        </Wrapper>
        <ValidateFormBlock handleValidate={handleValidate} />
      </AppLayout>
    </>
  )
}

const Wrapper = styled(View)`
  margin-top: ${isSmallScreen ? spacingPx.s : spacingPx.l};
  position: relative;
`
