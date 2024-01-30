import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, TouchableOpacity } from "react-native";
import { boxShadow, colors, spacing, spacingPx } from "~constants/theme";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";

import { NavigatorParamList } from "~navigators/app-navigator";
import { MainText } from "~components/atoms/mainText";
import { MainInput } from "~components/molecules/mainInput";
import { MainButton } from "~components/molecules/mainButton";
import { AppLayout } from "~components/layout/layout";
import { LayoutSideColumns } from "~components/layout/layoutSideColumns";
import { GoogleIcon } from "~assets/icons/googleIcon";
import { FacebookIcon } from "~assets/icons/facebookIcon";
import { AppleIcon } from "~assets/icons/appleIcon";

import { SocialNetworkConnectionButton } from "./components/molecules/socialConnectionButton";

type SignInScreenProps = NativeStackScreenProps<NavigatorParamList, "signIn">;

export const SigninScreen: FC<SignInScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const handleSignupPress = () => {
    navigation.navigate("signUp");
  };

  const handleSignInPress = () => {};

  return (
    <AppLayout useSafeAreaView isHeaderLogo>
      <LayoutSideColumns>
        <Wrapper>
          <MainText
            style={{ marginBottom: spacing.m }}
            fontSize="l"
            fontType="bold-italic"
          >
            {t("sign-in")}
          </MainText>
          <View style={{ width: "100%", marginBottom: spacing.l }}>
            <View style={{ marginBottom: spacing.s }}>
              <MainInput
                label={t("email")}
                placeholder={t("email-placeholder")}
                keyboardType="email-address"
              />
            </View>
            <MainInput label={t("password")} secureTextEntry={true} />
            <ForgotPasswordText onPress={() => {}}>
              <MainText
                color={colors.Alizarin}
                fontSize="s"
                fontType="medium"
                underline
              >
                {t("forgot-password")}
              </MainText>
            </ForgotPasswordText>
          </View>

          <MainButton
            label={t("loggin")}
            style={boxShadow}
            onPress={handleSignInPress}
          />

          <View
            style={{
              marginTop: spacing.m,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MainText style={{ marginRight: spacing.xs }}>
              {t("dont-have-an-account?")}
            </MainText>
            <TouchableOpacity onPress={handleSignupPress}>
              <MainText color={colors.Alizarin} underline>
                {t("sign-up")}
              </MainText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
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
                {t("or")}
              </MainText>
            </Or>
          </View>
          <SocialNetworkConnectionButton
            onPress={() => {}}
            icon={<GoogleIcon />}
            text={`${t("sign-in")} ${t("with-google")}`}
          />
          <View
            style={{
              width: "100%",
              marginTop: spacing.s,
              marginBottom: spacing.s,
            }}
          >
            <SocialNetworkConnectionButton
              onPress={() => {}}
              icon={<AppleIcon />}
              text={`${t("sign-in")} ${t("with-apple")}`}
            />
          </View>
          <SocialNetworkConnectionButton
            onPress={() => {}}
            icon={<FacebookIcon />}
            text={`${t("sign-in")} ${t("with-facebook")}`}
          />
        </Wrapper>
      </LayoutSideColumns>
    </AppLayout>
  );
};

const Wrapper = styled(View)`
  margin-top: ${spacingPx.m};
  justify-content: center;
  align-items: center;
`;

const Separator = styled(View)`
  width: 100%;
  height: 1px;
  margin: ${spacingPx.m};
  background-color: ${colors.medium.LinkWater};
`;

const Or = styled(View)`
  position: absolute;
  top: 10px;
  width: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.light.PureWhite};
`;

const ForgotPasswordText = styled(TouchableOpacity)`
  align-self: flex-start;
`;
