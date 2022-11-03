import memoize from "memoizee";
import type { Icon } from "./css_to_ts";
import { parseCss } from "./parseCss";
import * as css from "css";
import { exclude } from "tsafe/exclude";
import { assert } from "tsafe/assert";

type IconLike = Icon.Dsfr | Omit<Icon.Remixicon, "rawSvgCode">;

export function generateIconsRawCssCode(params: {
    usedIcons: IconLike[];
    rawCssCode: string;
}): string {
    const { usedIcons, rawCssCode } = params;

    const buildRule = (icon: IconLike, isHighContrast: boolean) => {
        const { iconId, prefix } = icon;

        const className = `${prefix}${iconId}`;

        const relativePath = (() => {
            switch (icon.prefix) {
                case "fr-icon-":
                    return `../../icons/${icon.category}/${iconId}.svg`;
                case "ri-":
                    return `../../icons/remixicon/${iconId}.svg`;
            }
        })();

        return [
            `.${className}::before,`,
            `.${className}::after {`,
            ...(isHighContrast
                ? [`    background-image: url("${relativePath}");`]
                : [
                      `    -webkit-mask-image: url("${relativePath}");`,
                      `    mask-image: url("${relativePath}");`
                  ]),
            `}`,
            ``
        ]
            .map(!isHighContrast ? line => line : line => `    ${line}`)
            .join("\n");
    };

    return [
        ...usedIcons.map(icon => buildRule(icon, false)),
        `@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {`,
        ...usedIcons.map(icon => buildRule(icon, true)),
        `}`,
        ``,
        ...(usedIcons.find(({ prefix }) => prefix === "ri-") !== undefined
            ? [
                  `/* This is all the parts of dsfr.css related to icons with .fr-icon- replaced by .ri- so that we can use remixicon as dsfr icons*/`,
                  getPatchedRawCssCodeForCompatWithRemixIcon(rawCssCode)
              ]
            : [])
    ].join("\n");
}

export const getPatchedRawCssCodeForCompatWithRemixIcon = memoize((rawCssCode: string) => {
    const parsedCss = parseCss(rawCssCode);

    const prefixRegExp = /fr-icon-[^-]/;

    (parsedCss as any).stylesheet.rules = (parsedCss as any).stylesheet.rules
        .map((rule: any) => {
            if (rule.type === "media") {
                //TODO

                rule.rules = rule.rules
                    .map((rule: any) => {
                        assert(rule.type === "rule");

                        if (prefixRegExp.test(rule.selectors.join(", "))) {
                            return rule;
                        }

                        return undefined;
                    })
                    .filter(exclude(undefined));

                if (rule.rules.length === 0) {
                    return undefined;
                }

                return rule;
            }

            assert(rule.type === "rule");

            if (prefixRegExp.test(rule.selectors.join(", "))) {
                return rule;
            }

            return undefined;
        })
        .filter(exclude(undefined));

    return css.stringify(parsedCss).replace(/fr-icon-/g, "ri-");
});
