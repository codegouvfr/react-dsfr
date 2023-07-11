import type { ColorScheme } from "./useIsDark";
type Params = {
    defaultColorScheme: ColorScheme | "system";
    verbose: boolean;
    nextParams: {
        doPersistDarkModePreferenceWithCookie: boolean;
        registerEffectAction: (effect: () => void) => void;
    } | undefined;
};
export declare function start(params: Params): Promise<void>;
export declare const prDsfrLoaded: Promise<void>;
export {};
