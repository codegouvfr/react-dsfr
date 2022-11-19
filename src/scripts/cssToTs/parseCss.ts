import css from "css";
import memoize from "memoizee";

export type ParsedCss = css.Stylesheet;

export const parseCss = memoize((rawCssCode: string): ParsedCss => css.parse(rawCssCode));
