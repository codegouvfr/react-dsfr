import { exclude } from "tsafe/exclude";
import { sep } from "path";
import * as css from "css";
import { pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist } from "./pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist";

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
