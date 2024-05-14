import { FC, RefObject, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Text } from '~components/atoms/text'
import { Input } from '~components/molecules/input'
import { MainButton } from '~components/molecules/mainButton'
import { colors, spacing } from '~constants/theme'

import { ScrollView } from 'react-native-gesture-handler'
import { SignupStepsProps } from '../signUpTypes'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Picker } from '@react-native-picker/picker'
import { ActivitySelector } from './activitySelector'
import { DownChevron } from '~assets/icons/downChevron'

type StepTwoProps = SignupStepsProps & {
  bottomSheetRef: RefObject<BottomSheet>
  selectorValue: string
}

export const StepTwo: FC<StepTwoProps> = ({
  control,
  errors,
  bottomSheetRef,
  selectorValue,
}) => {
  const { t } = useTranslation()
  const openModal = () => {
    bottomSheetRef.current?.expand()
  }

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
            error={errors.size?.message}
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
            onChange={(text) => onChange(text.replace(',', '.'))}
            error={errors.weight?.message}
          />
        )}
      />
      <View style={{ marginTop: spacing.s }}>
        <Text fontFamily="Avenir-Medium" color="Alizarin" fontSize="m">
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
                    label={t('signUpScreen.woman')}
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
                <Text>{errors.gender?.message}</Text>
              </>
            )}
          />
        </View>
      </View>
      <View style={{ marginTop: spacing.s }}>
        <Text fontFamily="Avenir-Medium" color="Alizarin" fontSize="m">
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
                    label={t('signUpScreen.lose-weight')}
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
        <View style={{ marginTop: spacing.s, gap: spacing.xs }}>
          <Text fontFamily="Avenir-Medium" color="Alizarin" fontSize="m">
            {t('signUpScreen.activity-level')}
          </Text>
          <TouchableOpacity style={styles.selector} onPress={openModal}>
            <Text>
              {selectorValue
                ? t(`signUpScreen.${selectorValue}`)
                : t('signUpScreen.select-an-activity-level')}
            </Text>
            <DownChevron size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 150 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  selector: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: spacing.xs,
    padding: spacing.s,
    backgroundColor: colors.light.AliceBlue,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    width: '100%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
})
