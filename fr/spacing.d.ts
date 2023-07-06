import type { SpacingToken, SpacingTokenByValue } from "./generatedFromCss/spacing";
export type { SpacingToken };
export declare function spacing<T extends SpacingToken>(token: T): SpacingTokenByValue[T];
export declare function spacing<Kind extends "padding" | "margin", Params extends Partial<Record<"topBottom" | "rightLeft" | "top" | "right" | "bottom" | "left", SpacingToken | number | "auto">>>(kind: Kind, params: Params): (Params extends {
    topBottom: SpacingToken | number | "auto";
} ? Record<`${Kind}${"Top" | "Bottom"}`, Params["topBottom"] extends SpacingToken ? SpacingTokenByValue[Params["topBottom"]] : Params["topBottom"]> : {}) & (Params extends {
    rightLeft: SpacingToken | number | "auto";
} ? Record<`${Kind}${"Right" | "Left"}`, Params["rightLeft"] extends SpacingToken ? SpacingTokenByValue[Params["rightLeft"]] : Params["rightLeft"]> : {}) & (Params extends {
    top: SpacingToken | number | "auto";
} ? Record<`${Kind}Top`, Params["top"] extends SpacingToken ? SpacingTokenByValue[Params["top"]] : Params["top"]> : {}) & (Params extends {
    right: SpacingToken | number | "auto";
} ? Record<`${Kind}Right`, Params["right"] extends SpacingToken ? SpacingTokenByValue[Params["right"]] : Params["right"]> : {}) & (Params extends {
    bottom: SpacingToken | number | "auto";
} ? Record<`${Kind}Bottom`, Params["bottom"] extends SpacingToken ? SpacingTokenByValue[Params["bottom"]] : Params["bottom"]> : {}) & (Params extends {
    left: SpacingToken | number | "auto";
} ? Record<`${Kind}Left`, Params["left"] extends SpacingToken ? SpacingTokenByValue[Params["left"]] : Params["left"]> : {});
