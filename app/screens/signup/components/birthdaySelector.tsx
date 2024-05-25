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
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

type StepTwoProps = SignupStepsProps & {
  birthdaySelectorRef: RefObject<BottomSheet>
}

export const BirthdaySelector: FC<StepTwoProps> = ({
  control,
  birthdaySelectorRef,
}) => {
  const insets = useSafeAreaInsets()
  return (
    <BottomSheet
      ref={birthdaySelectorRef}
      snapPoints={['30%']}
      index={-1}
      enablePanDownToClose={true}
      bottomInset={-insets.bottom}
      backgroundStyle={{
        backgroundColor: colors.White,
      }}
    >
      <View style={styles.modalView}>
        <Text>{t('signUpScreen.select-your-birth-date')}</Text>
        <Controller
          control={control}
          name="birthday"
          render={({ field: { onChange, value } }) => (
            <RNDateTimePicker
              value={value ? new Date(value) : new Date()}
              onChange={(_, selectedDate) => {
                if (selectedDate) {
                  const formattedDate = format(selectedDate, 'dd/MM/yyyy')
                  onChange(selectedDate)
                }
              }}
              display="spinner"
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
              }}
              mode="date"
            />
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
