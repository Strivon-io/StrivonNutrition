import { useState, FC } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { NavigatorParamList } from '~navigators/app-navigator'
import { Layout } from '~components/layout/layout'
import { SectionHeader } from '~components/molecules/sectionHeader'
import { Text } from '~components/atoms/text'

import { ValidateFormBlock } from './components/validateFormBlock'
import { StepOne } from './components/stepOne'
import { StepTwo } from './components/stepTwo'

type SignUpScreenProps = NativeStackScreenProps<NavigatorParamList, 'signUp'>

export const SignupScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()

  const [signUpStep, setSignUpStep] = useState(1)
  const [isChecked, setIsChecked] = useState(false)
  const [gender, setGender] = useState<'female' | 'male' | null>(null)
  const [goal, setGoal] = useState<'gain' | 'lose' | null>(null)

  const handleValidate = () => {
    if (signUpStep === 2) {
      navigation.navigate('needsResult')
    } else {
      setSignUpStep(signUpStep + 1)
    }
  }

  const handleCheck = () => setIsChecked(!isChecked)

  const handleBackArrow = () => {
    setSignUpStep(signUpStep - 1)
  }

  return (
    <Layout isHeaderLogo isBackArrow>
      <>
        <SectionHeader
          title={t('my-informations')}
          sideElement={
            <Text fontFamily="Avenir-Bold-Italic">{`(${signUpStep}/2)`}</Text>
          }
          handleBackArrow={handleBackArrow}
          isBackArrow={signUpStep > 1}
        />
        <View style={{ flex: 1 }}>
          {signUpStep === 1 && <StepOne />}

          {signUpStep === 2 && (
            <StepTwo
              gender={gender}
              setGender={setGender}
              goal={goal}
              setGoal={setGoal}
            />
          )}
        </View>

        <ValidateFormBlock
          signUpStep={signUpStep}
          handleValidate={handleValidate}
          isChecked={isChecked}
          handleCheck={handleCheck}
        />
      </>
    </Layout>
  )
}
