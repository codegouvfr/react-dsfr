import { readFile } from "fs/promises";
import { join as pathJoin, basename as pathBasename, dirname as pathDirname } from "path";
import { id } from "tsafe/id";
import { crawl } from "../../tools/crawl";

export type Icon = Icon.Dsfr | Icon.Remixicon;

export namespace Icon {
    export type Common = {
        iconId: string;
    };

    export type Dsfr = Common & {
        prefix: "fr-icon-";
        category: string;
    };

    export type Remixicon = Common & {
        prefix: "ri-";
        rawSvgCode: string;
    };
}

export async function collectIcons(params: {
    dsfrDistDirPath: string;
    remixiconDirPath: string;
}): Promise<Icon[]> {
    const { dsfrDistDirPath, remixiconDirPath } = params;

    return (
        await Promise.all([
            (async () => {
                const iconDirPath = pathJoin(remixiconDirPath, "icons");

                return Promise.all(
                    (await crawl({ "dirPath": iconDirPath }))
                        .filter(filePath => filePath.endsWith(".svg"))
                        .map(async svgFilePath =>
                            id<Icon.Remixicon>({
                                "prefix": "ri-",
                                "iconId": pathBasename(svgFilePath).replace(/\.svg$/, ""),
                                "rawSvgCode": (
                                    await readFile(pathJoin(iconDirPath, svgFilePath))
                                ).toString("utf8")
                            })
                        )
                );
            })(),
            (async () =>
                (
                    await crawl({
                        "dirPath": pathJoin(dsfrDistDirPath, "icons"),
                        "getDoCrawlInDir": ({ relativeDirPath }) =>
                            pathBasename(relativeDirPath) !== "remixicon"
                    })
                )
                    .filter(filePath => filePath.endsWith(".svg"))
                    .map(svgFilePath =>
                        id<Icon.Dsfr>({
                            "prefix": "fr-icon-",
                            "category": pathBasename(pathDirname(svgFilePath)),
                            "iconId": pathBasename(svgFilePath).replace(/\.svg$/, "")
                        })
                    ))()
        ])
    ).flat();
}
