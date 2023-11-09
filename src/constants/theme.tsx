export const colors = {
  light: {
    PureWhite: '#ffffff',
    WhiteSmoke: '#F8F8F8',
    Solitude: '#E8ECEF',
    AliceBlue: '#F3F8FE',
  },
  medium: {
    LinkWater: '#C4C8D8',
    StormyCloud: '#4C5673',
  },
  darker: {
    DarkestBlack: '#090513',
  },
  Alizarin: '#FF2749',
  Bloody: '#E02637',
}

export interface Spacing {
  xs: number
  s: number
  m: number
  l: number
  xl: number
}

export const spacing: Spacing = {
  xs: 8,
  s: 16,
  m: 24,
  l: 48,
  xl: 80,
}

export interface SpacingPx extends Record<keyof Spacing, string> {}

export const spacingPx = Object.fromEntries(
  Object.entries(spacing).map(([key, value]) => [key, `${value}px`]),
)

export interface FontSize {
  xs: number
  s: number
  m: number
  l: number
  xl: number
  xxl: number
}

export const fontSize: FontSize = {
  xs: 12,
  s: 14,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 42,
}

export interface FontSizePx extends Record<keyof FontSize, string> {}

export const fontSizePx = Object.fromEntries(
  Object.entries(fontSize).map(([key, value]) => [key, `${value}px`]),
)

export interface BoxShadow {
  shadowColor: string
  shadowOffset: {
    width: number
    height: number
  }
  shadowOpacity: number
  shadowRadius: number
}

export const boxShadow: BoxShadow = {
  shadowColor: '#3A296A',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.2,
  shadowRadius: 20,
}
