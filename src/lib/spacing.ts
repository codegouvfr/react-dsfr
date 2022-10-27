/* eslint-disable @typescript-eslint/ban-types */
import { assert } from "tsafe/assert";
import { capitalize } from "tsafe/capitalize";

const spacingTokenByValue = {
    "1v": "0.25rem",
    "1w": "0.50rem",
    "3v": "0.75rem",
    "2w": "1rem"
} as const;

type SpacingTokenByValue = typeof spacingTokenByValue;

export type SpacingToken = keyof SpacingTokenByValue;

export function spacing<T extends SpacingToken>(token: T): SpacingTokenByValue[T];
export function spacing<
    Kind extends "padding" | "margin",
    Params extends Partial<
        Record<
            "topBottom" | "rightLeft" | "top" | "right" | "bottom" | "left",
            SpacingToken | number
        >
    >
>(
    kind: Kind,
    params: Params
): (Params extends { topBottom: SpacingToken | number }
    ? Record<
          `${"top" | "bottom"}${Capitalize<Kind>}`,
          Params["topBottom"] extends SpacingToken
              ? SpacingTokenByValue[Params["topBottom"]]
              : Params["topBottom"]
      >
    : {}) &
    (Params extends { rightLeft: SpacingToken | number }
        ? Record<
              `${"right" | "left"}${Capitalize<Kind>}`,
              Params["rightLeft"] extends SpacingToken
                  ? SpacingTokenByValue[Params["rightLeft"]]
                  : Params["rightLeft"]
          >
        : {}) &
    (Params extends { top: SpacingToken | number }
        ? Record<
              `top${Capitalize<Kind>}`,
              Params["top"] extends SpacingToken
                  ? SpacingTokenByValue[Params["top"]]
                  : Params["top"]
          >
        : {}) &
    (Params extends { right: SpacingToken | number }
        ? Record<
              `right${Capitalize<Kind>}`,
              Params["right"] extends SpacingToken
                  ? SpacingTokenByValue[Params["right"]]
                  : Params["right"]
          >
        : {}) &
    (Params extends { bottom: SpacingToken | number }
        ? Record<
              `bottom${Capitalize<Kind>}`,
              Params["bottom"] extends SpacingToken
                  ? SpacingTokenByValue[Params["bottom"]]
                  : Params["bottom"]
          >
        : {}) &
    (Params extends { left: SpacingToken | number }
        ? Record<
              `left${Capitalize<Kind>}`,
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
            SpacingToken | number
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

                return rightLeft === undefined
                    ? undefined
                    : {
                          "right": rightLeft,
                          "left": rightLeft
                      };
            })(),
            ...(() => {
                const { topBottom } = params;

                return topBottom === undefined
                    ? undefined
                    : {
                          "top": topBottom,
                          "bottom": topBottom
                      };
            })(),
            "top": params.top,
            "right": params.right,
            "bottom": params.bottom,
            "left": params.left
        };

        (["top", "right", "bottom", "left"] as const).forEach(p => {
            const v = paramsWithOnlyDirection[p];

            if (v === undefined) {
                return;
            }

            out[`${kind}${capitalize(p)}`] = typeof v === "number" ? v : spacingTokenByValue[v];
        });

        return out;
    } else {
        const token = kindOrToken as SpacingToken;

        return spacingTokenByValue[token];
    }
}
