import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, View, StyleSheet } from 'react-native'

import { RightChevron } from '~assets/icons/rightChevron'
import { Checkbox } from '~components/atoms/checkbox'
import { Text } from '~components/atoms/text'
import { MainButton } from '~components/molecules/mainButton'
import { boxShadow, colors, iconSize, spacing } from '~constants/theme'

interface Props {
  signUpStep: number
  handleValidate: () => void
  isChecked: boolean
  handleCheck: () => void
}

export const ValidateFormBlock: FC<Props> = ({
  signUpStep,
  isChecked,
  handleCheck,
  handleValidate,
}) => {
  const { t } = useTranslation()

  return (
    <View style={styles.validateFormBlockWrapper}>
      <View style={styles.termOfUseContainer}>
        <View>
          <Checkbox isChecked={isChecked} setIsChecked={handleCheck} />
        </View>
        <View style={styles.termOfUseText}>
          <Pressable onPress={handleCheck}>
            <Text>{t('i-accept-the')}</Text>
          </Pressable>
          <Text color="Alizarin" textDecorationLine="underline">
            {t('terms-of-use')}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: spacing.m }}>
        <MainButton
          style={boxShadow}
          label={
            signUpStep === 1
              ? t('next')
              : t('signUpScreen.calculate-my-calories-need')
          }
          onPress={handleValidate}
          icon={signUpStep === 1 && <RightChevron size={iconSize.s} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  validateFormBlockWrapper: {
    width: '100%',
    backgroundColor: colors.light.PureWhite,
  },
  termOfUseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  termOfUseText: {
    flexDirection: 'row',
  },
})
