import { colorOptions, colorDecisions } from "./generatedFromCss/colorResolution";
import { exclude } from "tsafe/exclude";

type ColorDecision = {
    cssVarName: `--${string}`;
    decisionObjectPath: readonly string[];
    option: {
        color: `#${string}` | { light: `#${string}`; dark: `#${string}` };
        optionObjectPath: readonly string[];
        cssVarName: `--${string}`;
    };
};

export function resolveColorHexCodeToDecision(params: {
    hexColorCode: `#${string}`;
}): ColorDecision[] {
    const { hexColorCode } = params;

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
