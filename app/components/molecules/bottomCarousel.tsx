import { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";

import { Text } from "~components/atoms/text";
import { LeftChevron } from "~assets/icons/leftChevron";
import { colors, iconSize, spacing, spacingPx } from "~constants/theme";
import { RightChevron } from "~assets/icons/rightChevron";

export const BottomCarousel: FC<any> = ({
  getPagination,
  onPressRightArrow = () => null,
  onPressLeftArrow = () => null,
  hasLeftArrow = false,
  hasRightArrow = false,
}) => {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <TouchableOpacity onPress={onPressLeftArrow}>
        <LeftArrowContainer hasLeftArrow={hasLeftArrow}>
          <LeftChevron size={iconSize.s} color={colors.Alizarin} />
          <Text ml={spacing.s} fontFamily="Avenir-Medium" color="Alizarin">
            {t("previous")}
          </Text>
        </LeftArrowContainer>
      </TouchableOpacity>
      <PaginationWrapper>{getPagination}</PaginationWrapper>
      <TouchableOpacity onPress={onPressRightArrow}>
        <RightArrowContainer hasRightArrow={hasRightArrow}>
          <Text mr={spacing.s} fontFamily="Avenir-Medium" color="Alizarin">
            {t("next")}
          </Text>
          <RightChevron size={iconSize.s} color={colors.Alizarin} />
        </RightArrowContainer>
      </TouchableOpacity>
    </MainContainer>
  );
};

const PaginationWrapper = styled(View)`
  align-items: center;
  margin: 0 ${spacingPx.m};
`;

const MainContainer = styled(View)`
  align-self: center;
  display: flex;
  flex-direction: row;
`;

const LeftArrowContainer = styled(View)<{ hasLeftArrow: boolean }>`
  flex-direction: row;
  align-items: center;
  opacity: ${(props) => (props.hasLeftArrow ? 1 : 0.2)};
`;

const RightArrowContainer = styled(View)<{
  hasRightArrow: boolean;
}>`
  flex-direction: row;
  align-items: center;
  opacity: ${(props) => (props.hasRightArrow ? 1 : 0.2)};
`;
