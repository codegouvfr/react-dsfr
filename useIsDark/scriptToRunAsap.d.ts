import type { ColorScheme } from "./client";
type GetScriptToRunAsap = (props: {
    defaultColorScheme: ColorScheme | "system";
    nonce: string | undefined;
    trustedTypesPolicyName: string;
}) => string;
declare global {
    interface Window {
        ssrWasPerformedWithIsDark?: boolean;
        ssrNonce?: string;
    }
}
export declare const getScriptToRunAsap: GetScriptToRunAsap;
export {};
