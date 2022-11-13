import { readFile } from "fs/promises";
import { join as pathJoin, basename as pathBasename } from "path";
import { id } from "tsafe/id";
import { crawl } from "../../../tools/crawl";
import { parseCss } from "../../parseCss";
import { assert } from "tsafe/assert";
import { exclude } from "tsafe/exclude";

export type Icon = Icon.Dsfr | Icon.Remixicon;

export namespace Icon {
    export type Common = {
        iconId: string;
    };

    export type Dsfr = Common & {
        prefix: "fr-icon-";
        svgRelativePath: string;
    };

    export type Remixicon = Common & {
        prefix: "ri-";
        rawSvgCode: string;
    };
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
