export type ColorScheme = "light" | "dark";
export type UseIsDark = () => {
    isDark: boolean;
    setIsDark: (isDark: boolean | "system" | ((currentIsDark: boolean) => boolean | "system")) => void;
};
export declare function getIsDarkClientSide(): boolean;
export declare const useIsDarkClientSide: UseIsDark;
export declare function startClientSideIsDarkLogic(params: {
    registerEffectAction: (action: () => void) => void;
    doPersistDarkModePreferenceWithCookie: boolean;
    colorSchemeExplicitlyProvidedAsParameter: ColorScheme | "system";
    doCheckNonce: boolean;
    trustedTypesPolicyName: string;
}): void;
