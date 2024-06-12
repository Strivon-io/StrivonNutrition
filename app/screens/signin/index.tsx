import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { boxShadow, colors, spacing } from "~constants/theme";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

import { NavigatorParamList } from "~navigators/app-navigator";
import { Text } from "~components/atoms/text";
import { Input } from "~components/molecules/input";
import { MainButton } from "~components/molecules/mainButton";
import { Layout } from "~components/layout/layout";
import { GoogleIcon } from "~assets/icons/googleIcon";
import { FacebookIcon } from "~assets/icons/facebookIcon";
import { AppleIcon } from "~assets/icons/appleIcon";

import { SocialNetworkConnectionButton } from "./components/molecules/socialConnectionButton";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "~contexts/authContext";
import { login } from "~services/routes/user.service";

type SignInScreenProps = NativeStackScreenProps<NavigatorParamList, "signIn">;

export const SigninScreen: FC<SignInScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { setAccessToken, setRefreshToken } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSignupPress = () => {
    navigation.navigate("signUp");
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: (data: {
      email: User["email"];
      password: User["password"];
    }) => {
      return login(data);
    },
    onSuccess: (value) => {
      setAccessToken(value.accessToken);
      setRefreshToken(value.refreshToken);

      navigation.navigate("bottomTab");
    },
  });

  const validations = {
    email: {
      required: t("loginScreen.email-is-required"),
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: t("loginScreen.email-is-invalid"),
      },
    },
    password: {
      required: t("loginScreen.password-is-required"),
      minLength: {
        value: 8,
        message: t("loginScreen.password-min-length"),
      },
    },
  };

  const onSubmit = (data: {
    email: User["email"];
    password: User["password"];
  }) => {
    mutate(data);
  };

  return (
    <Layout>
      <>
        <Text
          mb={spacing.m}
          fontSize="l"
          fontFamily="Avenir-Bold-Italic"
          textAlign="center"
        >
          {t("sign-in")}
        </Text>
        <View style={{ marginBottom: spacing.l }}>
          <Controller
            control={control}
            name="email"
            rules={validations.email}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                label={t("email")}
                placeholder={t("email-placeholder")}
                keyboardType="email-address"
                onChange={(text) => onChange(text.toLowerCase())}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={validations.password}
            render={({ field: { onChange, value } }) => (
              <Input
                isPassword
                value={value}
                label={t("password")}
                secureTextEntry={true}
                onChange={onChange}
                error={errors.password?.message}
              />
            )}
          />
          <Text
            color="Alizarin"
            fontSize="s"
            fontFamily="Avenir-Medium"
            textDecorationLine="underline"
          >
            {t("forgot-password")}
          </Text>
          {isError && (
            <Text
              style={{
                marginTop: spacing.s,
              }}
              color="Bloody"
              fontSize="m"
              fontFamily="Avenir-Medium"
            >
              {t("loginScreen.invalid-credentials")}
            </Text>
          )}
        </View>

        <MainButton
          label={t("loggin")}
          style={boxShadow}
          onPress={handleSubmit(onSubmit)}
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
      </>
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
