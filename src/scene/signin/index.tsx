import React from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { boxShadow, colors, spacing, spacingPx } from '@constants/theme'
import { css, styled } from 'styled-components'

import { useTranslation } from 'react-i18next'

import { useNavigation } from '@react-navigation/native'
import { isSmallScreen } from '@utils/deviceDetector'

import { MainText } from '@components/atoms/mainText'
import { MainInput } from '@components/molecules/mainInput'
import { MainButton } from '@components/molecules/mainButton'
import { GoogleIcon } from '@components/atoms/icons/googleIcon'
import { FacebookIcon } from '@components/atoms/icons/facebookIcon'
import { AppleIcon } from '@components/atoms/icons/appleIcon'
import { AppLayout } from '@components/layout/layout'
import { SocialNetworkConnectionButton } from './components/molecules/socialConnectionButton'
import { ScrollSafeZone } from '@utils/scrollSafeZone'

export const SigninScreen = () => {
  return (
    <AppLayout isSideSafeColumns useSafeAreaView isHeaderLogo>
      {isSmallScreen ? (
        <WrapperScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RenderedContent />
        </WrapperScrollView>
      ) : (
        <Wrapper>
          <RenderedContent />
        </Wrapper>
      )}
    </AppLayout>
  )
}

const WrapperStyled = css`
  margin-top: ${spacingPx.m};
`

const Wrapper = styled(View)`
  ${WrapperStyled}
  justify-content: center;
  align-items: center;
`
const WrapperScrollView = styled(ScrollView)`
  ${WrapperStyled}
`

const RenderedContent = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const handleSignupPress = () => {
    // TODO fake nav error : maybe to fix later
    navigation.navigate('Signup')
  }

  const handleSignInPress = () => {}

  return (
    <>
      <MainText
        style={{ marginBottom: spacing.m }}
        fontSize="l"
        fontType="bold-italic"
      >
        {t('sign-in')}
      </MainText>
      <View style={{ width: '100%', marginBottom: spacing.l }}>
        <View style={{ marginBottom: spacing.s }}>
          <MainInput
            label={t('email')}
            placeholder={t('email-placeholder')}
            keyboardType="email-address"
          />
        </View>
        <MainInput label={t('password')} secureTextEntry={true} />
        <ForgotPasswordText onPress={() => {}}>
          <MainText
            color={colors.Alizarin}
            fontSize="s"
            fontType="medium"
            underline
          >
            {t('forgot-password')}
          </MainText>
        </ForgotPasswordText>
      </View>
      <MainButton
        label={t('log-in')}
        style={boxShadow}
        onPress={handleSignInPress}
      />
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
          <MainText color={colors.Alizarin} underline>
            {t('sign-up')}
          </MainText>
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
      <ScrollSafeZone />
    </>
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

const ForgotPasswordText = styled(TouchableOpacity)`
  align-self: flex-start;
`
