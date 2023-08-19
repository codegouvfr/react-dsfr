import { type ColorOptions } from "./generatedFromCss/colorOptions";
import { type ColorDecisions } from "./generatedFromCss/colorDecisions";
export type Colors = {
    options: ColorOptions<"css var">;
    decisions: ColorDecisions<"css var">;
    getHex: (params: {
        isDark: boolean;
    }) => {
        options: ColorOptions<"hex">;
        decisions: ColorDecisions<"hex">;
    };
};
export declare const colors: Colors;
