
import type { PaletteMode, Color } from "@mui/material";
import type { CommonColors, PaletteTonalOffset, PaletteColor, TypeText, TypeDivider, TypeAction, TypeBackground, PaletteAugmentColorOptions } from "@mui/material/styles/createPalette";

export interface Palette {
  common: CommonColors;
  mode: PaletteMode;
  contrastThreshold: number;
  tonalOffset: PaletteTonalOffset;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  grey: Color;
  text: TypeText;
  divider: TypeDivider;
  action: TypeAction;
  background: TypeBackground;
  getContrastText: (background: string) => string;
  augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
}