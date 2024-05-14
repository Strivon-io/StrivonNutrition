import { Dispatch, SetStateAction, FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Text } from '~components/atoms/text'
import { Input } from '~components/molecules/input'
import { MainButton } from '~components/molecules/mainButton'
import { spacing, spacingPx } from '~constants/theme'

import { ScrollView } from 'react-native-gesture-handler'
import { SignupInformations } from '../signUpTypes'

interface Props {
  gender: string | null
  setGender: Dispatch<SetStateAction<string>>
  goal: string | null
  setGoal: Dispatch<SetStateAction<string>>
  control: Control<SignupInformations>
}

export const StepTwo: FC<Props> = ({ control }) => {
  const { t } = useTranslation()

  return (
    <ScrollView style={{ marginTop: spacing.m, marginBottom: spacing.s }}>
      <Controller
        control={control}
        name="size"
        render={({ field: { onChange, value } }) => (
          <Input
            keyboardType="decimal-pad"
            value={value}
            label={t('signUpScreen.my-size-(in-cm)')}
            placeholder="170"
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="weight"
        render={({ field: { onChange, value } }) => (
          <Input
            keyboardType="decimal-pad"
            value={value}
            label={t('signUpScreen.my-weight-(in-kg)')}
            placeholder="65.4"
            onChange={onChange}
          />
        )}
      />
      <View style={{ marginTop: spacing.s }}>
        <Text fontFamily="Avenir-Medium" color="Alizarin">
          {`${t('signUpScreen.i-was-born-as-a')} :`}
        </Text>
        <View style={styles.buttonWrapper}>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <>
                <View style={{ width: '49%' }}>
                  <MainButton
                    label={t('woman')}
                    isHighlighted={value !== 'female'}
                    onPress={() => {
                      onChange('female')
                    }}
                  />
                </View>
                <View style={{ width: '49%' }}>
                  <MainButton
                    label={t('signUpScreen.man')}
                    isHighlighted={value !== 'male'}
                    onPress={() => {
                      onChange('male')
                    }}
                  />
                </View>
              </>
            )}
          />
        </View>
      </View>
      <View style={{ marginTop: spacing.s }}>
        <Text fontFamily="Avenir-Medium" color="Alizarin">
          {`${t('signUpScreen.my-goal')} :`}
        </Text>
        <View style={styles.buttonWrapper}>
          <Controller
            control={control}
            name="goal"
            render={({ field: { onChange, value } }) => (
              <>
                <View style={{ width: '49%' }}>
                  <MainButton
                    label={t('lose-weight')}
                    isHighlighted={value !== 'lose'}
                    onPress={() => {
                      onChange('lose')
                    }}
                  />
                </View>
                <View style={{ width: '49%' }}>
                  <MainButton
                    label={t('signUpScreen.gain-weight')}
                    isHighlighted={value !== 'gain'}
                    onPress={() => {
                      onChange('gain')
                    }}
                  />
                </View>
              </>
            )}
          />
        </View>
      </View>
      <View style={{ marginBottom: 150 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
})
