import { MainText } from "~components/atoms/mainText";
import {
  boxShadow,
  colors,
  iconSize,
  spacing,
  spacingPx,
} from "~constants/theme";
import { CameraIcon } from "~assets/icons/cameraIcon";
import { EditIcon } from "~assets/icons/editIcon";
import { useNavigation } from "@react-navigation/native";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";

export const CreateRecipeFirstStep = ({}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View
      style={{
        columnGap: spacing.s,
      }}
    >
      <TouchableOpacity>
        <WayCardToSelectIgredients
          text={t("takePicturesOfMyIngredients")}
          icon={<CameraIcon size={iconSize.xl} color={colors.Alizarin} />}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("createRecipeSettings");
        }}
      >
        <WayCardToSelectIgredients
          text={t("writeTheNameOfMyIngredients")}
          icon={<EditIcon size={iconSize.xl} color={colors.Alizarin} />}
        />
      </TouchableOpacity>
    </View>
  );
};

const WayCardToSelectIgredients = ({ icon, text }) => {
  return (
    <CardWrapper>
      {icon}
      <MainText
        style={{ marginTop: spacing.xs }}
        fontType="medium"
        fontSize="m"
        textAlign="center"
      >
        {text}
      </MainText>
    </CardWrapper>
  );
};

const CardWrapper = styled(View)`
  ${boxShadow}
  background-color: ${colors.light.PureWhite};
  border-radius: ${spacingPx.s};
  justify-content: center;
  align-items: center;
  height: 150px;
  margin: ${spacingPx.xs};
  padding: ${spacingPx.xs};
`;

const FlashListWrapper = styled(View)`
  flex: 1;
  height: 100%;
`;
