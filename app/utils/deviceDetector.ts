import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const smallScreenWidthSize = 375;
const bigScreenWidthSize = 430;

export const isSmallScreen = width <= smallScreenWidthSize;
export const isBigScreen = width >= bigScreenWidthSize;
