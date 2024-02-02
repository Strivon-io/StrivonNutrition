import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { boxShadow, colors, spacing } from "~constants/theme";
import { useTranslation } from "react-i18next";

import { NavigatorParamList } from "~navigators/app-navigator";
import { Text } from "~components/atoms/text";
import { Input } from "~components/molecules/input";
import { MainButton } from "~components/molecules/mainButton";
import { Layout } from "~components/layout/layout";
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
    <Layout isHeaderLogo bg="White">
      <Text
        mb={spacing.m}
        fontSize="l"
        fontFamily="Avenir-Bold-Italic"
        textAlign="center"
      >
        {t("sign-in")}
      </Text>

      <View style={{ marginBottom: spacing.l }}>
        <Input
          value=""
          label={t("email")}
          placeholder={t("email-placeholder")}
          keyboardType="email-address"
          onChange={() => {}}
        />
        <Input
          value=""
          label={t("password")}
          secureTextEntry={true}
          onChange={() => {}}
        />
        <Text
          color="Alizarin"
          fontSize="s"
          fontFamily="Avenir-Medium"
          textDecorationLine="underline"
        >
          {t("forgot-password")}
        </Text>
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
        <Text mr={spacing.xs}>{t("dont-have-an-account?")}</Text>
        <TouchableOpacity onPress={handleSignupPress}>
          <Text color="Alizarin" textDecorationLine="underline">
            {t("sign-up")}
          </Text>
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
        <View style={styles.separator} />
        <View style={styles.or}>
          <Text
            color="darker.DarkestBlack"
            fontSize="l"
            fontFamily="Avenir-Medium"
          >
            {t("or")}
          </Text>
        </View>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    margin: spacing.m,
    backgroundColor: colors.medium.LinkWater,
  },
  or: {
    position: "absolute",
    top: 10,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light.PureWhite,
  },
});
