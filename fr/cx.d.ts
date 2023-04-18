import type { FrClassName } from "./generatedFromCss/classNames";
export type FrCxArg = undefined | null | FrClassName | boolean | Partial<Record<FrClassName, boolean | null | undefined>> | readonly FrCxArg[];
/** Copy pasted from
 * https://github.com/emotion-js/emotion/blob/23f43ab9f24d44219b0b007a00f4ac681fe8712e/packages/react/src/class-names.js#L17-L63
 **/
export declare const cx: (...args: FrCxArg[]) => string;
