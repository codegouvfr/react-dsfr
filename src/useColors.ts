"use client";

import { useIsDark } from "./useIsDark";
import { fr, type ColorOptions, type ColorDecisions } from "./fr";

export type ColorTheme = {
    isDark: boolean;
    options: ColorOptions<"css var">;
    decisions: ColorDecisions<"css var">;
};

/** @deprecated: A hook is no longer required to get the colors.
 *
 *  Before you would do:
 * ```ts
 * import { useColors } from "@codegouvfr/react-dsfr/useColors";
 * // ...
 * const theme = useColors();
 * // ...
 * theme.decisions.background.default.grey.default
 * ```
 * Now you should do:
 * ```ts
 * import { fr } from "@codegouvfr/react-dsfr";
 * // ...
 * fr.colors.decisions.background.default.grey.default
 * ```
 * We don't need a hook anymore as the the colors are expressed as CSS variables and thus don't need to be
 * switched at runtime when the user changes the dark mode.
 *
 * If however you need the colors in the HEX format you can do:
 *
 * ```ts
 * import { fr } from "@codegouvfr/react-dsfr";
 * import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
 * // ...
 * const { isDark } = useIsDark();
 * const theme = fr.colors.getHex({ isDark });
 * // ...
 * theme.decisions.background.default.grey.default
 * ```
 **/
export function useColors(): ColorTheme {
    const { isDark } = useIsDark();

    return {
        isDark,
        "options": fr.colors.options,
        "decisions": fr.colors.decisions
    };
}
