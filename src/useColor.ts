"use client";

import { useIsDark } from "./useIsDark";
import { getColors } from "./fr/colors";
import type { ColorTheme } from "./fr/colors";

export type { ColorTheme };

export function useColors(): ColorTheme {
    const { isDark } = useIsDark();

    return getColors(isDark);
}
