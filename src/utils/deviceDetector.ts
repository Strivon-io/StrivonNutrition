import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const smallScreenWidthSize = 375;

export const isSmallScreen = width <= smallScreenWidthSize;
