import { colorOptions, type ColorOptions } from "./generatedFromCss/colorOptions";
import { getColorOptionsHex } from "./generatedFromCss/getColorOptionsHex";
import { getColorDecisions, type ColorDecisions } from "./generatedFromCss/getColorDecisions";

export type Colors = {
    options: ColorOptions<"css var">;
    decisions: ColorDecisions<"css var">;
    getHex: (params: { isDark: boolean }) => {
        isDark: boolean;
        options: ColorOptions<"hex">;
        decisions: ColorDecisions<"hex">;
    };
};

export const colors: Colors = {
    "options": colorOptions,
    "decisions": getColorDecisions({ colorOptions }),
    "getHex": (() => {
        const getHex: Colors["getHex"] = ({ isDark }) => {
            const options = getColorOptionsHex({ isDark });

            const decisions = getColorDecisions({ colorOptions });

            return {
                isDark,
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
