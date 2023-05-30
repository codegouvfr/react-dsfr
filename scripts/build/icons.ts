import { readFile } from "fs/promises";
import { join as pathJoin, basename as pathBasename } from "path";
import { id } from "tsafe/id";
import { crawl } from "../../src/bin/tools/crawl";
import { parseCss } from "./parseCss";
import { assert } from "tsafe/assert";
import { exclude } from "tsafe/exclude";
import type { Icon } from "../../src/bin/only-include-used-icons";
import { pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist } from "../../src/bin/only-include-used-icons";
import { sep } from "path";
import * as css from "css";

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

export async function collectIcons(params: {
    iconsCssRawCode: string;
    remixiconDirPath: string;
}): Promise<Icon[]> {
    const { iconsCssRawCode, remixiconDirPath } = params;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dsfrIcons = parseCss(iconsCssRawCode)
        .stylesheet!.rules.filter(({ type }) => type === "rule")
        .map(({ selectors: [selector], declarations }: any) => {
            const iconId = (() => {
                const matchArray = (selector as string).match(/^\.fr-icon-([^:]+)/);

                if (matchArray === null) {
                    return undefined;
                }

                return matchArray[1];
            })();

            if (iconId === undefined) {
                return;
            }

            const svgRelativePath = (() => {
                const declaration = declarations.find(
                    ({ property }: any) => property === "mask-image"
                );

                assert(declaration !== undefined);

                const matchArray = declaration.value.match(/^url\(["']([^"']+)["']\)$/);

                assert(matchArray !== null);

                return matchArray[1];
            })();

            return id<Icon.Dsfr>({
                iconId,
                "prefix": "fr-icon-",
                svgRelativePath
            });
        })
        .filter(exclude(undefined));

    const remixiconIcons = await (async () => {
        const iconDirPath = pathJoin(remixiconDirPath, "icons");

        return Promise.all(
            (await crawl({ "dirPath": iconDirPath }))
                .filter(filePath => filePath.endsWith(".svg"))
                .map(async svgFilePath =>
                    id<Icon.Remixicon>({
                        "prefix": "ri-",
                        "iconId": pathBasename(svgFilePath).replace(/\.svg$/, ""),
                        "rawSvgCode": (await readFile(pathJoin(iconDirPath, svgFilePath))).toString(
                            "utf8"
                        )
                    })
                )
        );
    })();

    return [...dsfrIcons, ...remixiconIcons];
}
