import type { Icon } from "./css_to_ts";
import { exclude } from "tsafe/exclude";
import { join as pathJoin, sep } from "path";
import * as css from "css";

type IconLike = Icon.Dsfr | Omit<Icon.Remixicon, "rawSvgCode">;

export function generateIconsRawCssCode(params: {
    usedIcons: IconLike[];
    patchedRawCssCodeForCompatWithRemixIcon: string;
}): string {
    const { usedIcons, patchedRawCssCodeForCompatWithRemixIcon } = params;

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
        ...(usedIcons.length === 0
            ? []
            : [
                  `@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {`,
                  ...usedIcons.map(icon => buildRule(icon, true)),
                  `}`,
                  ``
              ]),
        ...(usedIcons.find(({ prefix }) => prefix === "ri-") === undefined
            ? []
            : [patchedRawCssCodeForCompatWithRemixIcon])
    ].join("\n");
}

export const pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist = pathJoin(
    "utility",
    "icons",
    "dsfr_remixicon.css"
);

export function getPatchedRawCssCodeForCompatWithRemixIcon(params: { rawCssCode: string }) {
    const { rawCssCode } = params;

    const parsedCss = css.parse(rawCssCode);

    const prefixRegExp = /fr-icon-[^-]/;

    (parsedCss as any).stylesheet.rules = (parsedCss as any).stylesheet.rules
        .map((rule: any) => {
            if (rule.type === "media") {
                rule.rules = rule.rules
                    .map((rule: any) => {
                        if (rule.type !== "rule") {
                            return undefined;
                        }

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

            if (rule.type !== "rule") {
                return undefined;
            }

            if (prefixRegExp.test(rule.selectors.join(", "))) {
                return rule;
            }

            return undefined;
        })
        .filter(exclude(undefined));

    const back =
        new Array(
            pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist.split(sep).length - 1
        )
            .fill("..")
            .join("/") + "/";

    return css
        .stringify(parsedCss)
        .replace(/fr-icon-/g, "ri-")
        .replace(/url\("/g, `url("${back}`)
        .replace(/url\('/g, `url('${back}`);
}
