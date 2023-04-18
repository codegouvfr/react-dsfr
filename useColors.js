"use client";
import { useIsDark } from "./useIsDark";
import { getColors } from "./fr/colors";
export function useColors() {
    const { isDark } = useIsDark();
    return getColors(isDark);
}
//# sourceMappingURL=useColors.js.map