import { assert } from "tsafe/assert";
import { typeGuard } from "tsafe/typeGuard";
import type { FrClassName } from "./generatedFromCss/classNames";

export type FrCxArg =
    | undefined
    | null
    | FrClassName
    | boolean
    | Partial<Record<FrClassName, boolean | null | undefined>>
    | readonly FrCxArg[];

/** Copy pasted from
 * https://github.com/emotion-js/emotion/blob/23f43ab9f24d44219b0b007a00f4ac681fe8712e/packages/react/src/class-names.js#L17-L63
 **/
export const cx = (...args: FrCxArg[]): string => {
    const len = args.length;
    let i = 0;
    let cls = "";
    for (; i < len; i++) {
        const arg = args[i];
        if (arg == null) continue;

        let toAdd;
        switch (typeof arg) {
            case "boolean":
                break;
            case "object": {
                if (Array.isArray(arg)) {
                    toAdd = cx(arg);
                } else {
                    assert(!typeGuard<{ length: number }>(arg, false));

                    toAdd = "";
                    for (const k in arg) {
                        if (arg[k as FrClassName] && k) {
                            toAdd && (toAdd += " ");
                            toAdd += k;
                        }
                    }
                }
                break;
            }
            default: {
                toAdd = arg;
            }
        }
        if (toAdd) {
            cls && (cls += " ");
            cls += toAdd;
        }
    }
    return cls;
};
