import { parseColorOptions } from "./colorOptions";
import { parseColorDecision } from "./colorDecisions";
import { exclude } from "tsafe/exclude";
import type { ColorDecision } from "./colorDecisions";
import type { ColorOption } from "./colorOptions";
import { symToStr } from "tsafe/symToStr";

export type ColorDecisionAndCorrespondingOption = Omit<
    ColorDecision,
    "optionThemePath"
> & { colorOption: ColorOption }

export function generateColorDecisionsAndCorrespondingOptionTsCode(rawCssCode: string): string {
    const colorOptions = parseColorOptions(rawCssCode);

    const colorDecisionAndCorrespondingOption = parseColorDecision(rawCssCode)
        .map(colorDecision => {
            const colorOption = colorOptions.find(
                colorOption =>
                    colorOption.themePath.join(".") === colorDecision.optionThemePath.join(".")
            );
            return colorOption === undefined ? undefined : ([colorDecision, colorOption] as const);
        })
        .filter(exclude(undefined))
        .map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([{ optionThemePath, ...colorDecision }, colorOption]): ColorDecisionAndCorrespondingOption => ({
                ...colorDecision,
                colorOption
            })
        );

    return [
        ``,
        `export const ${symToStr({ colorDecisionAndCorrespondingOption })}= ${JSON.stringify(
            colorDecisionAndCorrespondingOption,
            null,
            4
        )} as const;`,
        ``
    ].join("\n");
}
