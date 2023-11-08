import React, { ReactNode } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderLogo } from '../../components/layout/headerLogo'
import {
  boxShadow,
  colors,
  fontSize,
  spacing,
  spacingPx,
} from '../../constants/theme'
import { styled } from 'styled-components'
import { AppLayout } from '../../components/layout/layout'
import { useTranslation } from 'react-i18next'
import { MainText } from '../../components/atoms/mainText'
import { MainInput } from '../../components/molecules/mainInput'
import { MainButton } from '../../components/molecules/mainButton'

export const SigninScreen = () => {
  const { t } = useTranslation()

  return (
    <AppLayout useSafeAreaView={true}>
      <Wrapper>
        <MainText
          style={{ marginBottom: spacing.m }}
          fontSize={fontSize.l}
          fontWeight="bold-italic"
        >
          {t('sign-in')}
        </MainText>
        <View style={{ width: '100%', marginBottom: spacing.l }}>
          <MainInput
            placeholder={t('email-placeholder')}
            keyboardType="email-address"
          />
          <MainInput placeholder={t('password')} secureTextEntry={true} />
          <ForgotPasswordText onPress={() => {}}>
            <MainText
              color={colors.Alizarin}
              fontSize={fontSize.s}
              fontWeight="medium"
            >
              {t('forgotten-password')}
            </MainText>
          </ForgotPasswordText>
        </View>
        <MainButton label={t('log-in')} style={boxShadow} onPress={() => {}} />
        <MainText style={{ marginTop: spacing.m }}>
          {t('dont-have-an-account?')}
        </MainText>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Separator />
          <Or>
            <MainText
              color={colors.darker.DarkestBlack}
              fontSize={fontSize.l}
              fontWeight="medium"
            >
              {t('or')}
            </MainText>
          </Or>
        </View>
      </Wrapper>
    </AppLayout>
  )
}

const Separator = styled(View)`
  width: 100%;
  height: 1px;
  margin: ${spacingPx.m};
  background-color: ${colors.darker.DarkestBlack};
`

const Or = styled(View)`
  position: absolute;
  top: 10px;
  width: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.light.PureWhite};
`

const Wrapper = styled(View)`
  margin-top: ${spacingPx.l};
  justify-content: center;
  align-items: center;
`

const ForgotPasswordText = styled(TouchableOpacity)`
  align-self: flex-start;
`
