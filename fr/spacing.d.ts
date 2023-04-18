import type { SpacingToken, SpacingTokenByValue } from "./generatedFromCss/spacing";
export type { SpacingToken };
export declare function spacing<T extends SpacingToken>(token: T): SpacingTokenByValue[T];
export declare function spacing<Kind extends "padding" | "margin", Params extends Partial<Record<"topBottom" | "rightLeft" | "top" | "right" | "bottom" | "left", SpacingToken | number>>>(kind: Kind, params: Params): (Params extends {
    topBottom: SpacingToken | number;
} ? Record<`${Kind}${"Top" | "Bottom"}`, Params["topBottom"] extends SpacingToken ? SpacingTokenByValue[Params["topBottom"]] : Params["topBottom"]> : {}) & (Params extends {
    rightLeft: SpacingToken | number;
} ? Record<`${Kind}${"Right" | "Left"}`, Params["rightLeft"] extends SpacingToken ? SpacingTokenByValue[Params["rightLeft"]] : Params["rightLeft"]> : {}) & (Params extends {
    top: SpacingToken | number;
} ? Record<`${Kind}Top`, Params["top"] extends SpacingToken ? SpacingTokenByValue[Params["top"]] : Params["top"]> : {}) & (Params extends {
    right: SpacingToken | number;
} ? Record<`${Kind}Right`, Params["right"] extends SpacingToken ? SpacingTokenByValue[Params["right"]] : Params["right"]> : {}) & (Params extends {
    bottom: SpacingToken | number;
} ? Record<`${Kind}Bottom`, Params["bottom"] extends SpacingToken ? SpacingTokenByValue[Params["bottom"]] : Params["bottom"]> : {}) & (Params extends {
    left: SpacingToken | number;
} ? Record<`${Kind}Left`, Params["left"] extends SpacingToken ? SpacingTokenByValue[Params["left"]] : Params["left"]> : {});
