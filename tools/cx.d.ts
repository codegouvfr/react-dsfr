export type CxArg = undefined | null | string | boolean | Partial<Record<string, boolean | null | undefined>> | readonly CxArg[];
export declare const cx: (...args: CxArg[]) => string;
