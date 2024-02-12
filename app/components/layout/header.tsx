import { FC } from "react";
import { View } from "react-native";
import { styled } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { colors, spacing } from "~constants/theme";
import { MainText } from "~components/atoms/mainText";
import { LeftArrow } from "~assets/icons/leftArrow";

import { HeaderLogo } from "./atoms/headerLogo";

interface Props {
  isLogo?: boolean;
  isBackArrow?: boolean;
  isSeperatorLine?: boolean;
  pageTitle?: string;
}

export const AppHeader: FC<Props> = ({
  isLogo,
  isBackArrow,
  isSeperatorLine,
  pageTitle,
}: Props) => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        borderBottomColor: colors.Alizarin,
        borderBottomWidth: isSeperatorLine ? 0.3 : 0,
        paddingBottom: isLogo ? spacing.xs : spacing.m,
        paddingTop: isLogo ? spacing.xs : spacing.m,
      }}
    >
      <Wrapper>
        <View
          style={{
            position: "absolute",
            left: 0,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {isBackArrow && (
            <TouchableOpacity onPress={handleBackPress}>
              <LeftArrow color={colors.Alizarin} />
            </TouchableOpacity>
          )}
          {pageTitle && (
            <MainText
              style={{ marginLeft: spacing.s }}
              fontType="bold-italic"
              fontSize="xl"
            >
              {pageTitle}
            </MainText>
          )}
        </View>

        {isLogo && <HeaderLogo />}
      </Wrapper>
    </View>
  );
};

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
