import { useContext, createContext } from "react"
import { flavors } from "@catppuccin/palette"

export default interface Theme {
  name: string,
  dark: boolean,
  text: string,
}

export enum ThemeMixMode {
  PRIMARY,
  SECONDARY,
  LIGHT_PRIMARY,
  LIGHT_SECONDARY,
  DARK_PRIMARY,
  DARK_SECONDARY,
}



export function mixThemes(mode: ThemeMixMode, primary: Theme, secondary: Theme) -> string {
  switch (mode) {
    case ThemeMixMode.PRIMARY:
      return css`
        ${primary.text}
      `
    case ThemeMixMode.SECONDARY:
      return css`
        ${secondary.text}
      `
    case ThemeMixMode.LIGHT_PRIMARY:
      return css`
        ${secondary.text}
        @media (prefers-color-scheme: light) {
          ${primary.text}
        }
      `
    case ThemeMixMode.LIGHT_SECONDARY:
      return css`
        ${primary.text}
        @media (prefers-color-scheme: light) {
          ${secondary.text}
        }
      `
    case ThemeMixMode.DARK_PRIMARY:
      return css`
        ${secondary.text}
        @media (prefers-color-scheme: dark) {
          ${primary.text}
        }
      `
    case ThemeMixMode.DARK_SECONDARY:
      return css`
        ${primary.text}
        @media (prefers-color-scheme: dark) {
          ${secondary.text}
        }
      `
    default:
      let _: never = mode
  }
}

export const THEMES = {
  light: LIGHT,
  dark: DARK,
  latte: CATPPUCCIN_LATTE,
  frappé: CATPPUCCIN_FRAPPÉ,
  macchiato: CATPPUCCIN_MACCHIATO,
  mocha: CATPPUCCIN_MOCHA,
}

export const LIGHT: NamedTheme = {
  name: "Light",
  isDark: false,
  text: "#000000",
  bg: "#eeeeee",
  sidebar: "#aaaaaa",
}
export const DARK: NamedTheme = {
  name: "Dark",
  isDark: true,
  text: "#eeeeee",
  bg: "#333344",
  sidebar: "#444455",
}
export const CATPPUCCIN_LATTE: NamedTheme = makeCatppuccinTheme(flavors.latte)
export const CATPPUCCIN_FRAPPÉ: NamedTheme = makeCatppuccinTheme(flavors.frappé)
export const CATPPUCCIN_MACCHIATO: NamedTheme = makeCatppuccinTheme(flavors.macchiato)
export const CATPPUCCIN_MOCHA: NamedTheme = makeCatppuccinTheme(flavors.mocha)

function makeCatppuccinTheme({ name, dark, colors }): NamedTheme {
  return {
    name: `Catppuccin ${name}`,
    isDark: dark,
    text: colors.text.hex,
    bg: colors.base.hex,
    sidebar: colors.surface0.hex,
  }
}
