import { Dispatch, SetStateAction, useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
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
import { StepOne } from './components/stepOne'
import { StepTwo } from './components/stepTwo'
import { LeftArrow } from '@components/atoms/icons/leftArrow'
import { LeftChevron } from '@components/atoms/icons/leftChevron'
import { useNavigation } from '@react-navigation/native'
import { LayoutSideColumns } from '@components/layout/layoutSideColumns'

export const SignupScreen = () => {
  const [signUpStep, setSignUpStep] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [gender, setGender] = useState<'female' | 'male' | null>(null)
  const [goal, setGoal] = useState<'gain' | 'lose' | null>(null)
  const navigation = useNavigation()

  const handleValidate = () => {
    const isBeforeFinalStep = signUpStep <= 0
    isBeforeFinalStep && setSignUpStep(signUpStep + 1)
    !isBeforeFinalStep && navigation.navigate('NeedsResult')
  }
  const handleCheck = () => setIsChecked(!isChecked)
  return (
    <>
      <AppLayout useSafeAreaView isHeaderLogo isBackArrow>
        {isSmallScreen ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RenderedContent
              signUpStep={signUpStep}
              setSignUpStep={setSignUpStep}
              gender={gender}
              setGender={setGender}
              goal={goal}
              setGoal={setGoal}
            />
          </ScrollView>
        ) : (
          <RenderedContent
            signUpStep={signUpStep}
            setSignUpStep={setSignUpStep}
            gender={gender}
            setGender={setGender}
            goal={goal}
            setGoal={setGoal}
          />
        )}
        <ValidateFormBlock
          signUpStep={signUpStep}
          handleValidate={handleValidate}
          isChecked={isChecked}
          handleCheck={handleCheck}
        />
      </AppLayout>
    </>
  )
}

interface Props {
  signUpStep: number
  setSignUpStep: Dispatch<SetStateAction<number>>
  gender: string | null
  setGender: Dispatch<SetStateAction<string>>
  goal: string | null
  setGoal: Dispatch<SetStateAction<string>>
}

const RenderedContent = ({
  signUpStep,
  setSignUpStep,
  gender,
  setGender,
  goal,
  setGoal,
}: Props) => {
  const { t } = useTranslation()

  const handleBackArrow = () => {
    setSignUpStep(signUpStep - 1)
  }

  return (
    <Wrapper>
      <LayoutSideColumns>
        <SectionHeader
          title={t('my-informations')}
          sideElement={
            <MainText fontType="bold-italic">{`(${
              signUpStep + 1
            }/2)`}</MainText>
          }
          handleBackArrow={handleBackArrow}
          isBackArrow={signUpStep > 0}
        />

        {signUpStep === 0 && <StepOne />}
        {signUpStep === 1 && (
          <StepTwo
            gender={gender}
            setGender={setGender}
            goal={goal}
            setGoal={setGoal}
          />
        )}
      </LayoutSideColumns>
    </Wrapper>
  )
}

const Wrapper = styled(View)`
  width: 100%;
  margin-top: ${isSmallScreen ? spacingPx.xs : spacingPx.m};
  position: relative;
`
