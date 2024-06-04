import { useState, FC, useRef, useEffect } from 'react'
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
import { useForm } from 'react-hook-form'
import { ActivitySelector } from './components/activitySelector'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '~contexts/authContext'
import { createUser, login } from '~services/routes/user'
import { BirthdaySelector } from './components/birthdaySelector'

type SignUpScreenProps = NativeStackScreenProps<NavigatorParamList, 'signUp'>

export const SignupScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { setAccessToken, setRefreshToken } = useAuth()

  const [signUpStep, setSignUpStep] = useState(1)
  const [isChecked, setIsChecked] = useState(false)
  const activitySelectorRef = useRef<BottomSheet>(null)
  const birthdaySelectorRef = useRef<BottomSheet>(null)

  const handleCheck = () => setIsChecked(!isChecked)

  const handleBackArrow = () => {
    signUpStep > 1 ? setSignUpStep(signUpStep - 1) : navigation.goBack()
  }

  const { mutate: logUser } = useMutation({
    mutationFn: (data: {
      email: User['email']
      password: User['password']
    }) => {
      return login(data)
    },
    onSuccess: (value) => {
      setAccessToken(value.accessToken)
      setRefreshToken(value.refreshToken)
    },
  })

  const { mutate, isError, error } = useMutation({
    mutationFn: (data: CreateUser) => {
      return createUser(data)
    },
    onSuccess: (_, data) => {
      logUser({ email: data.email, password: data.password })
      navigation.navigate('needsResult')
    },
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  const handleValidate = (data: CreateUser) => {
    if (signUpStep === 2) {
      onSubmit(data)
    } else {
      setSignUpStep(signUpStep + 1)
    }
  }

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      size: '',
      weight: '',
      birthday: new Date(),
      gender: '',
      goal: '',
      activityLevel: '',
    },
    mode: 'onChange',
  })

  const validations = {
    email: {
      required: t('loginScreen.email-is-required'),
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: t('loginScreen.email-is-invalid'),
      },
    },
    password: {
      required: t('loginScreen.password-is-required'),
      minLength: {
        value: 8,
        message: t('loginScreen.password-min-length'),
      },
    },
    confirmPassword: {
      required: t('signUpScreen.confirm-password-is-required'),
      validate: (value: string) =>
        value === watch('password') || t('signUpScreen.passwords-must-match'),
    },
    username: {
      required: t('signUpScreen.username-is-required'),
      message: t('signUpScreen.username-is-required'),
    },
    size: {
      required: t('signUpScreen.size-is-required'),
      message: t('signUpScreen.size-is-required'),
    },
    weight: {
      required: t('signUpScreen.weight-is-required'),
      message: t('signUpScreen.weight-is-required'),
    },
    gender: {
      required: t('signUpScreen.gender-is-required'),
      message: t('signUpScreen.gender-is-required'),
    },
    birthday: {
      required: t('signUpScreen.birthday-is-required'),
      message: t('signUpScreen.birthday-is-required'),
    },
  }

  return (
    <>
      <Layout isHeaderLogo isBackArrow>
        <>
          <SectionHeader
            title={t('signUpScreen.my-informations')}
            sideElement={
              <Text fontFamily="Avenir-Bold-Italic">{`(${signUpStep}/2)`}</Text>
            }
            handleBackArrow={handleBackArrow}
            isBackArrow={true}
          />
          <View style={{ flex: 1 }}>
            {signUpStep === 1 && (
              <StepOne
                control={control}
                errors={errors}
                validations={validations}
              />
            )}
            {signUpStep === 2 && (
              <StepTwo
                activitySelectorRef={activitySelectorRef}
                birthdaySelectorRef={birthdaySelectorRef}
                control={control}
                errors={errors}
                validations={validations}
                activityLevel={watch('activityLevel')}
                birthdayDate={watch('birthday')}
              />
            )}
          </View>
          <ValidateFormBlock
            signUpStep={signUpStep}
            handleValidate={handleSubmit(handleValidate)}
            isChecked={isChecked}
            handleCheck={handleCheck}
          />
          {isError && <Text>{error.message}</Text>}
          <ActivitySelector
            activitySelectorRef={activitySelectorRef}
            control={control}
            errors={errors}
            validations={validations}
          />
          <BirthdaySelector
            birthdaySelectorRef={birthdaySelectorRef}
            control={control}
            errors={errors}
            validations={validations}
          />
        </>
      </Layout>
    </>
  )
}
