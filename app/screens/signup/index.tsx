import { useState, FC } from "react";
import { View } from "react-native";
import { styled } from "styled-components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { NavigatorParamList } from "~navigators/app-navigator";
import { isSmallScreen } from "~utils/deviceDetector";
import { Layout } from "~components/layout/layout";
import { SectionHeader } from "~components/molecules/sectionHeader";
import { spacingPx } from "~constants/theme";
import { MainText } from "~components/atoms/mainText";

import { ValidateFormBlock } from "./components/validateFormBlock";
import { StepOne } from "./components/stepOne";
import { StepTwo } from "./components/stepTwo";

import { LayoutSideColumns } from "~components/layout/layoutSideColumns";

type SignUpScreenProps = NativeStackScreenProps<NavigatorParamList, "signUp">;

export const SignupScreen: FC<SignUpScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const [signUpStep, setSignUpStep] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState<"female" | "male" | null>(null);
  const [goal, setGoal] = useState<"gain" | "lose" | null>(null);

  const handleValidate = () => {
    const isBeforeFinalStep = signUpStep <= 0;

    isBeforeFinalStep && setSignUpStep(signUpStep + 1);
    !isBeforeFinalStep && navigation.navigate("needsResult");
  };

  const handleCheck = () => setIsChecked(!isChecked);

  const handleBackArrow = () => {
    setSignUpStep(signUpStep - 1);
  };

  return (
    <Layout useSafeAreaView isHeaderLogo isBackArrow>
      <Wrapper>
        <LayoutSideColumns>
          <SectionHeader
            title={t("my-informations")}
            sideElement={
              <MainText fontType="bold-italic">{`(${
                signUpStep + 1
              }/2)`}</MainText>
            }
            handleBackArrow={handleBackArrow}
            isBackArrow={signUpStep > 0}
          />

          {signUpStep === 0 && <StepOne />}
          {signUpStep === 1 && (
            <StepTwo
              gender={gender}
              setGender={setGender}
              goal={goal}
              setGoal={setGoal}
            />
          )}
        </LayoutSideColumns>
      </Wrapper>
      <ValidateFormBlock
        signUpStep={signUpStep}
        handleValidate={handleValidate}
        isChecked={isChecked}
        handleCheck={handleCheck}
      />
    </Layout>
  );
};

const Wrapper = styled(View)`
  width: 100%;
  margin-top: ${isSmallScreen ? spacingPx.xs : spacingPx.m};
  position: relative;
`;
