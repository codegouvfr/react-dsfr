import { type ColorOptions } from "./generatedFromCss/colorOptions";
import { type ColorDecisions } from "./generatedFromCss/getColorDecisions";
export type Colors = {
    options: ColorOptions<"css var">;
    decisions: ColorDecisions<"css var">;
    getHex: (params: {
        isDark: boolean;
    }) => {
        isDark: boolean;
        options: ColorOptions<"hex">;
        decisions: ColorDecisions<"hex">;
    };
};
export declare const colors: Colors;
