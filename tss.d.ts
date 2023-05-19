/// <reference types="react" />
/** @see <https://docs.tss-react.dev/setup> */
export declare const makeStyles: <Params = void, RuleNameSubsetReferencableInNestedSelectors extends string = never>(params?: {
    name?: string | Record<string, unknown> | undefined;
    uniqId?: string | undefined;
} | undefined) => <RuleName_2 extends string>(cssObjectByRuleNameOrGetCssObjectByRuleName: Record<RuleName_2, import("tss-react").CSSObject> | ((theme: import("./useColors").ColorTheme, params: Params, classes: Record<RuleNameSubsetReferencableInNestedSelectors, string>) => Record<RuleNameSubsetReferencableInNestedSelectors | RuleName_2, import("tss-react").CSSObject>)) => (params: Params, styleOverrides?: {
    props: {
        classes?: Record<string, string> | undefined;
    } & Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<RuleName_2, string>;
    theme: import("./useColors").ColorTheme;
    css: import("tss-react").Css;
    cx: import("tss-react").Cx;
}, withStyles: <C extends keyof import("react").ReactHTML | import("tss-react/tools/ReactComponent").ReactComponent<any>, Props extends C extends import("tss-react/tools/ReactComponent").ReactComponent<infer P> ? P : C extends keyof import("react").ReactHTML ? import("react").ReactHTML[C] extends import("tss-react/tools/ReactComponent").ReactComponent<infer P_1> ? NonNullable<P_1> : never : never, CssObjectByRuleName extends Props extends {
    classes?: Partial<infer ClassNameByRuleName> | undefined;
} ? { [RuleName in keyof ClassNameByRuleName]?: import("tss-react").CSSObject | undefined; } & {
    [mediaQuery: `@media${string}`]: { [RuleName_1 in keyof ClassNameByRuleName]?: import("tss-react").CSSObject | undefined; };
} : {
    root: import("tss-react").CSSObject;
} & {
    [mediaQuery: `@media${string}`]: {
        root: import("tss-react").CSSObject;
    };
}>(Component: C, cssObjectByRuleNameOrGetCssObjectByRuleName: (CssObjectByRuleName & {
    [mediaQuery: `@media${string}`]: { [Key in keyof CssObjectByRuleName]?: import("tss-react").CSSObject | undefined; };
}) | ((theme: import("./useColors").ColorTheme, props: Props, classes: Record<Exclude<keyof CssObjectByRuleName, `@media${string}`>, string>) => CssObjectByRuleName), params?: {
    name?: string | Record<string, unknown> | undefined;
    uniqId?: string | undefined;
} | undefined) => C extends keyof import("react").ReactHTML ? import("react").ReactHTML[C] : C, useStyles: () => {
    theme: import("./useColors").ColorTheme;
    css: import("tss-react").Css;
    cx: import("tss-react").Cx;
};
