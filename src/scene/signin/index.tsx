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
import { GoogleIcon } from '../../components/atoms/icons/googleIcon'
import { FacebookIcon } from '../../components/atoms/icons/facebookIcon'
import { AppleIcon } from '../../components/atoms/icons/appleIcon'
import { SocialNetworkConnectionButton } from './components/molecules/socialConnectionButton'
import { useNavigation } from '@react-navigation/native'

export const SigninScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const handleSignupPress = () => {
    // fake error : maybe to fix later
    navigation.navigate('Signup')
  }

  return (
    <AppLayout useSafeAreaView isHeaderLogo>
      <Wrapper>
        <MainText
          style={{ marginBottom: spacing.m }}
          fontSize="l"
          fontType="bold-italic"
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
            <MainText color={colors.Alizarin} fontSize="s" fontType="medium">
              {t('forgotten-password')}
            </MainText>
          </ForgotPasswordText>
        </View>
        <MainButton label={t('log-in')} style={boxShadow} onPress={() => {}} />
        <View
          style={{
            marginTop: spacing.m,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MainText style={{ marginRight: spacing.xs }}>
            {t('dont-have-an-account?')}
          </MainText>
          <TouchableOpacity onPress={handleSignupPress}>
            <MainText color={colors.Alizarin}>{t('sign-up')}</MainText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: spacing.s,
            marginTop: spacing.s,
          }}
        >
          <Separator />
          <Or>
            <MainText
              color={colors.darker.DarkestBlack}
              fontSize="l"
              fontType="medium"
            >
              {t('or')}
            </MainText>
          </Or>
        </View>
        <SocialNetworkConnectionButton
          onPress={() => {}}
          icon={<GoogleIcon />}
          text={`${t('sign-in')} ${t('with-google')}`}
        />
        <View
          style={{
            width: '100%',
            marginTop: spacing.s,
            marginBottom: spacing.s,
          }}
        >
          <SocialNetworkConnectionButton
            onPress={() => {}}
            icon={<AppleIcon />}
            text={`${t('sign-in')} ${t('with-apple')}`}
          />
        </View>
        <SocialNetworkConnectionButton
          onPress={() => {}}
          icon={<FacebookIcon />}
          text={`${t('sign-in')} ${t('with-facebook')}`}
        />
      </Wrapper>
    </AppLayout>
  )
}

const Separator = styled(View)`
  width: 100%;
  height: 1px;
  margin: ${spacingPx.m};
  background-color: ${colors.medium.LinkWater};
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
  margin-top: ${spacingPx.m};
  justify-content: center;
  align-items: center;
`

const ForgotPasswordText = styled(TouchableOpacity)`
  align-self: flex-start;
`
