import { FC, RefObject } from 'react'
import { View, StyleSheet } from 'react-native'

import { Text } from '~components/atoms/text'
import BottomSheet from '@gorhom/bottom-sheet'
import { Picker } from '@react-native-picker/picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '~constants/theme'
import { t } from 'i18next'
import { Controller } from 'react-hook-form'
import { SignupStepsProps } from '../signUpTypes'

type StepTwoProps = SignupStepsProps & {
  bottomSheetRef: RefObject<BottomSheet>
}

export const ActivitySelector: FC<StepTwoProps> = ({
  control,
  bottomSheetRef,
}) => {
  const insets = useSafeAreaInsets()
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['30%']}
      index={-1}
      enablePanDownToClose={true}
      bottomInset={-insets.bottom}
      backgroundStyle={{
        backgroundColor: colors.White,
      }}
    >
      <View style={styles.modalView}>
        <Text>{t('signUpScreen.select-an-activity-level')}</Text>
        <Controller
          control={control}
          name="activityLevel"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item
                label={t('signUpScreen.sedentary')}
                value="sedentary"
              />
              <Picker.Item
                label={t('signUpScreen.lightlyActive')}
                value="lightlyActive"
              />
              <Picker.Item
                label={t('signUpScreen.moderatelyActive')}
                value="moderatelyActive"
              />
              <Picker.Item
                label={t('signUpScreen.veryActive')}
                value="veryActive"
              />
              <Picker.Item
                label={t('signUpScreen.superActive')}
                value="superActive"
              />
            </Picker>
          )}
        />
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
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
})
