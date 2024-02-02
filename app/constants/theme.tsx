export const colors = {
  light: {
    PureWhite: "#ffffff",
    WhiteSmoke: "#F8F8F8",
    Solitude: "#E8ECEF",
    AliceBlue: "#F3F8FE",
  },
  medium: {
    LinkWater: "#C4C8D8",
    StormyCloud: "#4C5673",
  },
  darker: {
    DarkestBlack: "#090513",
  },
  tags: {
    blue: "#D6E4FF",
    green: "#C5EFD7",
    orange: "#FCDEC0",
  },
  Alizarin: "#FF2749",
  Bloody: "#E02637",
  black: "#000000",
  White: "#FFFFFF",
  transparent: "transparent",
};

type ColorValues = string | { [key: string]: string };

type ColorGroups = keyof typeof colors;

type SpecificGroupColorKeys = {
  [K in ColorGroups]: (typeof colors)[K] extends Record<string, string>
    ? `${K}.${keyof (typeof colors)[K]}`
    : never;
}[ColorGroups];

// Sépare les clés de couleur directes (non groupées) des clés de groupe
type DirectColorKeys = {
  [K in ColorGroups]: (typeof colors)[K] extends string ? K : never;
}[ColorGroups];

// Le type ColorsKey inclut les clés de couleur directes et les combinaisons valides spécifiques à chaque groupe de couleurs
export type ColorsKey = DirectColorKeys | SpecificGroupColorKeys;

const flattenColorPalette = (
  colors: Record<string, ColorValues> | undefined
): Record<ColorsKey, string> => {
  return Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(
      ([color, values]: [string, ColorValues]) =>
        typeof values === "object"
          ? Object.entries(
              flattenColorPalette(values as Record<string, string>)
            ).map(([shade, hex]: [string, string]) => ({
              [color + (shade === "DEFAULT" ? "" : `.${shade}`)]: hex,
            }))
          : [{ [`${color}`]: values }]
    )
  );
};

export const flattenedColors = flattenColorPalette(colors);

export type FontFamily =
  | "Avenir-Regular"
  | "Avenir-Medium"
  | "Avenir-Bold"
  | "Avenir-Bold-Italic";

export interface FontType {
  regular: "regular";
  medium: "medium";
  bold: "bold";
  "bold-italic": "bold-italic";
}

export interface Spacing {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
}

export const spacing: Spacing = {
  xs: 8,
  s: 16,
  m: 24,
  l: 48,
  xl: 80,
};

export interface SpacingPx extends Record<keyof Spacing, string> {}

export const spacingPx = Object.fromEntries(
  Object.entries(spacing).map(([key, value]) => [key, `${value}px`])
);

export type FontSizeKey = keyof typeof IfontSize;

export const IfontSize = {
  xs: 12,
  s: 14,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 42,
};

export const fontSizePx = Object.fromEntries(
  Object.entries(IfontSize).map(([key, value]) => [key, `${value}px`])
);

export const boxShadow = {
  shadowColor: "#3A296A",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.2,
  shadowRadius: 20,
};

export const iconSize = {
  xs: 8,
  s: 16,
  m: 24,
  l: 32,
  xl: 48,
  xxl: 64,
};
