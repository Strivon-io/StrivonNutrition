import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Input } from '~components/molecules/input'

import { spacing } from '~constants/theme'
import { SignupStepsProps } from '../signUpTypes'

export const StepOne: FC<SignupStepsProps> = ({
  control,
  errors,
  validations,
}) => {
  const { t } = useTranslation()
  return (
    <View style={{ marginTop: spacing.m, marginBottom: spacing.s }}>
      <View style={{ marginTop: spacing.s, marginBottom: spacing.s }}>
        <Controller
          control={control}
          rules={validations.username}
          name="username"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              label={t('signUpScreen.username')}
              placeholder="Doe"
              onChange={onChange}
              error={errors.username?.message}
            />
          )}
        />
      </View>
      <Controller
        control={control}
        name="email"
        rules={validations.email}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            label={t('email')}
            placeholder={t('signUpScreen.email-placeholder')}
            keyboardType="email-address"
            onChange={(text) => onChange(text.toLowerCase())}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={validations.password}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            isPassword
            value={value}
            label={t('password')}
            onChange={onChange}
            secureTextEntry={true}
            error={errors.password?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={validations.confirmPassword}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <Input
            isPassword
            value={value}
            label={t('signUpScreen.confirm-password')}
            error={errors.confirmPassword?.message}
            secureTextEntry={true}
            onChange={onChange}
          />
        )}
      />
    </View>
  )
}
