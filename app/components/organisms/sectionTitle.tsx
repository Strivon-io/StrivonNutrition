import { FC } from "react";

import { Text } from "~components/atoms/text";
import { FontFamily, spacingPx } from "~constants/theme";
import { View } from "react-native";
import styled from "styled-components";

interface Props {
  title: string;
  leftChild?: JSX.Element;
  fontType?: FontFamily;
  fontSize?: "xs" | "s" | "m" | "l" | "xl";
}

export const SectionTitle: FC<Props> = ({
  title,
  leftChild,
  fontType,
  fontSize,
}) => {
  return (
    <HeaderTitle>
      <Text fontFamily={fontType ?? "Avenir-Medium"} fontSize={fontSize ?? "l"}>
        {title}
      </Text>

      {leftChild}
    </HeaderTitle>
  );
};

const HeaderTitle = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin: ${spacingPx.s} 0;
`;
