import { colorOptions, colorDecisions } from "./generatedFromCss/colorResolution";
import { exclude } from "tsafe/exclude";
import { threeDigitColorHexToSixDigitsColorHex } from "../tools/threeDigitColorHexToSixDigitsColorHex";

export type ColorDecision = {
    cssVarName: `--${string}`;
    decisionObjectPath: readonly string[];
    option: {
        color: `#${string}` | { light: `#${string}`; dark: `#${string}` };
        optionObjectPath: readonly string[];
        cssVarName: `--${string}`;
    };
};

export function resolveColorHexCodeToDecision(params: {
    /** Expects: #xxxxxx or #xxx */
    hexColorCode: string;
}): ColorDecision[] {
    let { hexColorCode } = params;

    hexColorCode = hexColorCode.toLowerCase();

    if (hexColorCode.length === 4) {
        hexColorCode = threeDigitColorHexToSixDigitsColorHex(hexColorCode);
    }

    const options = colorOptions
        .filter(({ color }) =>
            typeof color === "string"
                ? color === hexColorCode
                : color.dark === hexColorCode || color.light === hexColorCode
        )
        .map((colorOption): ColorDecision["option"] => ({
            "color": colorOption.color,
            "optionObjectPath": colorOption.themePath,
            "cssVarName": colorOption.colorOptionName
        }));

    return colorDecisions
        .map(colorDecision => {
            const option = options.find(
                ({ optionObjectPath }) =>
                    optionObjectPath.join(".") === colorDecision.optionThemePath.join(".")
            );
            return option === undefined ? undefined : ([colorDecision, option] as const);
        })
        .filter(exclude(undefined))
        .map(
            ([{ colorDecisionName, themePath }, option]): ColorDecision => ({
                "cssVarName": colorDecisionName,
                "decisionObjectPath": themePath,
                option
            })
        );
}
