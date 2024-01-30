import { SafeAreaView, View } from "react-native";
import { styled } from "styled-components/native";
import { spacingPx } from "~constants/theme";
import { AppHeader } from "./header";

interface Props {
  useSafeAreaView?: boolean;
  isHeaderLogo?: boolean;
  isBackArrow?: boolean;
  children: React.ReactNode;
  isHeader?: boolean;
  isSeperatorLine?: boolean;
  pageTitle?: string;
}

export const AppLayout = ({
  useSafeAreaView,
  isHeaderLogo,
  isBackArrow,
  children,
  isHeader,
  isSeperatorLine,
  pageTitle,
}: Props) => {
  return (
    <LayoutStyled>
      {useSafeAreaView && <SafeAreaView />}
      {isHeader && (
        <AppHeader
          isSeperatorLine={isSeperatorLine}
          isLogo={isHeaderLogo}
          isBackArrow={isBackArrow}
          pageTitle={pageTitle}
        />
      )}
      {children}
    </LayoutStyled>
  );
};

const LayoutStyled = styled(View)`
  height: 100%;
`;
