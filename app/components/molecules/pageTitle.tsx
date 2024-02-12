import { FC } from "react";
import { View } from "react-native";
import styled from "styled-components";

import { Text } from "~components/atoms/text";

interface Props {
  title: string;
  rightChild?: JSX.Element;
}

export const PageTitle: FC<Props> = ({ title, rightChild }) => {
  return (
    <View style={{ width: "100%" }}>
      <PageTitleWrapper>
        <Text fontFamily="Avenir-Bold-Italic" fontSize="xxl">
          {title}
        </Text>
        {rightChild && rightChild}
      </PageTitleWrapper>
    </View>
  );
};

const PageTitleWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
