import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { LoopIcon } from "@assets/icons/loopIcon";
import { colors, iconSize, spacingPx } from "@constants/theme";
import { TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  onSearch?: () => void;
}

export const SearchBar = ({ placeholder, onChangeText, onSearch }: Props) => {
  return (
    <Container>
      <Input
        placeholderTextColor={colors.medium.LinkWater}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      <SearchButton onPress={onSearch}>
        <LoopIcon size={iconSize.m} color={colors.Alizarin} />
      </SearchButton>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.light.Solitude};
  padding: 10px;
  border-radius: ${spacingPx.s};
  color: ${colors.darker.DarkestBlack};
`;

const Input = styled(TextInput)`
  flex: 1;
  height: 40px;
  padding-horizontal: 10px;
  color: ${colors.darker.DarkestBlack};
  font-family: "AvenirNext-Medium";
`;

const SearchButton = styled(TouchableOpacity)`
  padding: 10px;
`;
