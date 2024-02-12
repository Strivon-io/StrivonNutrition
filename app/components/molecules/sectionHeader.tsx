import { FC } from "react";
import { styled } from "styled-components";
import { View } from "react-native";

import { colors, iconSize, spacing } from "~constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LeftChevron } from "~assets/icons/leftChevron";
import { Text } from "~components/atoms/text";

interface Props {
  title: string;
  sideElement?: JSX.Element;
  isBackArrow?: boolean;
  handleBackArrow?: () => void;
}

export const SectionHeader: FC<Props> = ({
  title,
  sideElement,
  isBackArrow,
  handleBackArrow,
}) => {
  return (
    <SectionHeaderStyled>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isBackArrow && (
          <TouchableOpacity onPress={handleBackArrow}>
            <LeftChevron size={iconSize.m} color={colors.darker.DarkestBlack} />
          </TouchableOpacity>
        )}
        <Text
          ml={isBackArrow ? spacing.s : 0}
          fontSize="xl"
          fontFamily="Avenir-Medium"
        >
          {title}
        </Text>
      </View>
      {sideElement}
    </SectionHeaderStyled>
  );
};

const SectionHeaderStyled = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
