/* eslint-disable @typescript-eslint/ban-types */
import { assert } from "tsafe/assert";
import { capitalize } from "tsafe/capitalize";
import { spacingTokenByValue } from "./generatedFromCss/spacing";
import type { SpacingToken, SpacingTokenByValue } from "./generatedFromCss/spacing";

export type { SpacingToken };

export function spacing<T extends SpacingToken>(token: T): SpacingTokenByValue[T];
export function spacing<
    Kind extends "padding" | "margin",
    Params extends Partial<
        Record<
            "topBottom" | "rightLeft" | "top" | "right" | "bottom" | "left",
            SpacingToken | number | "auto"
        >
    >
>(
    kind: Kind,
    params: Params
): (Params extends { topBottom: SpacingToken | number | "auto" }
    ? Record<
          `${Kind}${"Top" | "Bottom"}`,
          Params["topBottom"] extends SpacingToken
              ? SpacingTokenByValue[Params["topBottom"]]
              : Params["topBottom"]
      >
    : {}) &
    (Params extends { rightLeft: SpacingToken | number | "auto" }
        ? Record<
              `${Kind}${"Right" | "Left"}`,
              Params["rightLeft"] extends SpacingToken
                  ? SpacingTokenByValue[Params["rightLeft"]]
                  : Params["rightLeft"]
          >
        : {}) &
    (Params extends { top: SpacingToken | number | "auto" }
        ? Record<
              `${Kind}Top`,
              Params["top"] extends SpacingToken
                  ? SpacingTokenByValue[Params["top"]]
                  : Params["top"]
          >
        : {}) &
    (Params extends { right: SpacingToken | number | "auto" }
        ? Record<
              `${Kind}Right`,
              Params["right"] extends SpacingToken
                  ? SpacingTokenByValue[Params["right"]]
                  : Params["right"]
          >
        : {}) &
    (Params extends { bottom: SpacingToken | number | "auto" }
        ? Record<
              `${Kind}Bottom`,
              Params["bottom"] extends SpacingToken
                  ? SpacingTokenByValue[Params["bottom"]]
                  : Params["bottom"]
          >
        : {}) &
    (Params extends { left: SpacingToken | number | "auto" }
        ? Record<
              `${Kind}Left`,
              Params["left"] extends SpacingToken
                  ? SpacingTokenByValue[Params["left"]]
                  : Params["left"]
          >
        : {});
export function spacing(
    kindOrToken: SpacingToken | "padding" | "margin",
    params?: Partial<
        Record<
            "topBottom" | "rightLeft" | "top" | "right" | "bottom" | "left",
            SpacingToken | number | "auto"
        >
    >
): any {
    if (["padding", "margin"].indexOf(kindOrToken) >= 0) {
        const kind = kindOrToken as "padding" | "margin";
        assert(params !== undefined);

        const out: any = {};

        const paramsWithOnlyDirection = {
            ...(() => {
                const { rightLeft } = params;

                return (
                    rightLeft !== undefined && {
                        "right": rightLeft,
                        "left": rightLeft
                    }
                );
            })(),
            ...(() => {
                const { topBottom } = params;

                return (
                    topBottom !== undefined && {
                        "top": topBottom,
                        "bottom": topBottom
                    }
                );
            })(),
            ...(params.top !== undefined && { "top": params.top }),
            ...(params.right !== undefined && { "right": params.right }),
            ...(params.bottom !== undefined && { "bottom": params.bottom }),
            ...(params.left !== undefined && { "left": params.left })
        };

        (["top", "right", "bottom", "left"] as const).forEach(p => {
            const v = paramsWithOnlyDirection[p];

            if (v === undefined) {
                return;
            }

            out[`${kind}${capitalize(p)}`] =
                typeof v === "number" ? v : v === "auto" ? v : spacingTokenByValue[v];
        });

        return out;
    } else {
        const token = kindOrToken as SpacingToken;

        return spacingTokenByValue[token];
    }
}
