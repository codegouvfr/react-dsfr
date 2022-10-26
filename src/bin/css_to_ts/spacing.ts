/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { objectKeys } from "tsafe/objectKeys";
import { exclude } from "tsafe/exclude";
import { parseCss } from "./parseCss";
*/
import memoize from "memoizee";

export type SpacingTokenAndValue = { token: string; value: string };

export const parseSpacing = memoize((rawCssCode: string): SpacingTokenAndValue[] => {
    //const parsedCss = parseCss(rawCssCode);
    console.log(rawCssCode);

    return null as any;
});
