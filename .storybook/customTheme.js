import { create } from "@storybook/theming";

const brandImage= "/logo.png";
const brandTitle= "@codegouvfr/react-dsfr";
const brandUrl= "https://github.com/@codegouvfr/react-dsfr";
const fontBase= '"Marianne", arial, sans-serif';
const fontCode= "monospace";

export const darkTheme = create({
    "base": "dark",
    "appBg": "#161616",
    "appContentBg": "#1E1E1E",
    "barBg": "#1E1E1E",
    "colorSecondary": "#8585F6",
    "textColor": "#FFFFFF",
    brandImage,
    brandTitle,
    brandUrl,
    fontBase,
    fontCode
});

export const lightTheme = create({
    "base": "light",
    "appBg": "#FFFFFF",
    "appContentBg": "#F6F6F6",
    "barBg": "#FFFFFF",
    "colorSecondary": "#000091",
    "textColor": "#212121",
    brandImage,
    brandTitle,
    brandUrl,
    fontBase,
    fontCode
});
