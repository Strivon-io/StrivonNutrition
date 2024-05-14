import { FC, useState } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'

import { colors, spacing } from '~constants/theme'
import { Text } from '~components/atoms/text'
import { EyeIcon } from '~assets/icons/eyeIcon'
import { EyeOffIcon } from '~assets/icons/eyeOffIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface InputProps {
  value: string
  placeholder?: string
  label?: string
  secureTextEntry?: boolean
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'visible-password'
  placeholderTextColor?: string
  onChange: (text: string) => void
  error?: string
  isPassword?: boolean
}

export const Input: FC<InputProps> = ({
  label,
  placeholder,
  secureTextEntry,
  onChange,
  keyboardType,
  value,
  error,
  isPassword,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const styles = getDynamicStyles(secureTextEntry)
  return (
    <View style={styles.inputWrapper}>
      {label && (
        <Text fontFamily="Avenir-Medium" color="Alizarin" fontSize="m">
          {label}
        </Text>
      )}
      <View style={styles.inputAndEyeWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.medium.LinkWater}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !passwordVisible}
          onChangeText={onChange}
          value={value}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeWrapper}
            onPress={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <EyeIcon size={20} color={colors.Alizarin} />
            ) : (
              <EyeOffIcon size={20} color={colors.Alizarin} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text fontSize={'m'} fontFamily="Avenir-Medium" color="Bloody" mt={4}>
          {error}
        </Text>
      )}
    </View>
  )
}

const getDynamicStyles = (isPassword: boolean | undefined) =>
  StyleSheet.create({
    inputWrapper: {
      width: '100%',
    },
    input: {
      flex: 1,
      padding: spacing.s,
      marginVertical: spacing.xs,
      backgroundColor: colors.light.AliceBlue,
      borderRadius: spacing.xs,
      borderTopRightRadius: isPassword ? 0 : spacing.xs,
      borderBottomRightRadius: isPassword ? 0 : spacing.xs,
      fontFamily: 'AvenirNext-Medium',
    },
    inputAndEyeWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    eyeWrapper: {
      borderTopRightRadius: spacing.xs,
      borderBottomRightRadius: spacing.xs,
      padding: spacing.s,
      backgroundColor: colors.light.AliceBlue,
    },
  })
