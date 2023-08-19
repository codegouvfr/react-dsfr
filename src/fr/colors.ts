import { colorOptions, type ColorOptions } from "./generatedFromCss/colorOptions";
import { getColorOptionsHex } from "./generatedFromCss/getColorOptionsHex";
import { colorDecisions, type ColorDecisions } from "./generatedFromCss/colorDecisions";
import { getColorDecisionsHex } from "./generatedFromCss/getColorDecisionsHex";

export type Colors = {
    options: ColorOptions<"css var">;
    decisions: ColorDecisions<"css var">;
    getHex: (params: { isDark: boolean }) => {
        options: ColorOptions<"hex">;
        decisions: ColorDecisions<"hex">;
    };
};

export const colors: Colors = {
    "options": colorOptions,
    "decisions": colorDecisions,
    "getHex": (() => {
        const getHex: Colors["getHex"] = ({ isDark }) => {
            const options = getColorOptionsHex({ isDark });

            const decisions = getColorDecisionsHex({ "colorOptions": options });

            return {
                options,
                decisions
            };
        };

        const cache: Record<"light" | "dark", ReturnType<Colors["getHex"]> | undefined> = {
            "light": undefined,
            "dark": undefined
        };

        return ({ isDark }) => (cache[isDark ? "dark" : "light"] ??= getHex({ isDark }));
    })()
};
