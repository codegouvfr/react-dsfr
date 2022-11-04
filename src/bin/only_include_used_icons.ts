#!/usr/bin/env node
import { collectIcons } from "./css_to_ts";
import {
    generateIconsRawCssCode,
    pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist
} from "./css_to_ts/icons";
import { getProjectRoot } from "./tools/getProjectRoot";
import * as fs from "fs";
import { join as pathJoin } from "path";
import { assert } from "tsafe/assert";
import { exclude } from "tsafe/exclude";
import { writeFile, readFile } from "fs/promises";
import { crawl } from "./tools/crawl";
import { basename as pathBasename } from "path";
import type { Icon } from "./css_to_ts";
import type { Equals } from "tsafe";

(async () => {
    const dsfrProjectRoot = getProjectRoot();

    const dsfrDistDirPath = pathJoin(dsfrProjectRoot, "dsfr");

    const cwd = process.cwd();

    const icons = await collectIcons({
        "dsfrDistDirPath": dsfrDistDirPath,
        "remixiconDirPath": (() => {
            const nodeModulesDirPath = pathJoin(cwd, "node_modules");

            at_the_root: {
                const remixiconDirPath = pathJoin(nodeModulesDirPath, "remixicon");

                if (!fs.existsSync(remixiconDirPath)) {
                    break at_the_root;
                }

                return remixiconDirPath;
            }

            const remixiconDirPath = pathJoin(
                nodeModulesDirPath,
                JSON.parse(
                    fs.readFileSync(pathJoin(dsfrProjectRoot, "package.json")).toString("utf8")
                )["name"],
                "remixicon"
            );

            assert(fs.existsSync(remixiconDirPath));

            return remixiconDirPath;
        })()
    });

    const { usedIconClassNames } = await (async function getUsedIconClassNames() {
        const candidateFilePaths = (
            await crawl({
                "dirPath": cwd,
                "getDoCrawlInDir": ({ relativeDirPath }) => {
                    const dirBasename = pathBasename(relativeDirPath);

                    if (dirBasename === "node_modules") {
                        return false;
                    }

                    if (dirBasename.startsWith(".")) {
                        return false;
                    }

                    return true;
                }
            })
        ).filter(
            filePath =>
                ["tsx", "jsx", "js", "ts", "html", "htm"].find(ext =>
                    filePath.endsWith(`.${ext}`)
                ) !== undefined
        );

        const prefixes = { "prefixDsfr": "fr-icon-", "prefixRemixIcon": "ri-" } as const;

        assert<Equals<typeof prefixes[keyof typeof prefixes], Icon["prefix"]>>();

        const { prefixDsfr, prefixRemixIcon, ...rest } = prefixes;

        assert<Equals<keyof typeof rest, never>>();

        const { availableDsfrIconClassNames, availableRemixiconIconClassNames } = (() => {
            const allAvailableIconClassNames = icons.map(
                ({ prefix, iconId }) => `${prefix}${iconId}`
            );

            const availableDsfrIconClassNames: string[] = [];
            const availableRemixiconIconClassNames: string[] = [];

            allAvailableIconClassNames.forEach(className => {
                if (className.startsWith(prefixDsfr)) {
                    availableDsfrIconClassNames.push(className);
                    return;
                }
                if (className.startsWith(prefixRemixIcon)) {
                    availableRemixiconIconClassNames.push(className);
                    return;
                }
            });

            return { availableDsfrIconClassNames, availableRemixiconIconClassNames };
        })();

        const usedIconClassNames: string[] = [];

        await Promise.all(
            candidateFilePaths.map(async candidateFilePath => {
                const rawFileContent = (await readFile(candidateFilePath)).toString("utf8");

                [
                    ...(!rawFileContent.includes(prefixDsfr) ? [] : availableDsfrIconClassNames),
                    ...(!rawFileContent.includes(prefixRemixIcon)
                        ? []
                        : availableRemixiconIconClassNames)
                ].forEach(className => {
                    if (!rawFileContent.includes(className)) {
                        return;
                    }

                    usedIconClassNames.push(className);
                });
            })
        );

        return { usedIconClassNames };
    })();

    const usedIcons = usedIconClassNames.map(className => {
        const icon = icons.find(({ prefix, iconId }) => `${prefix}${iconId}` === className);

        assert(icon !== undefined);

        return icon;
    });

    const rawIconCssCodeBuffer = Buffer.from(
        generateIconsRawCssCode({
            "patchedRawCssCodeForCompatWithRemixIcon": fs
                .readFileSync(
                    pathJoin(
                        dsfrDistDirPath,
                        pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist
                    )
                )
                .toString("utf8"),
            usedIcons
        }),
        "utf8"
    );

    [
        dsfrDistDirPath,
        ...(() => {
            const dsfrDistInPublic = pathJoin(cwd, "public", "dsfr");

            return fs.existsSync(dsfrDistInPublic) ? [dsfrDistInPublic] : [];
        })()
    ].forEach(async dsfrDistDirPath => {
        const remixiconDirPath = pathJoin(dsfrDistDirPath, "icons", "remixicon");

        if (!fs.existsSync(remixiconDirPath)) {
            fs.mkdirSync(remixiconDirPath);
        }

        usedIcons
            .map(icon => (icon.prefix !== "ri-" ? undefined : icon))
            .filter(exclude(undefined))
            .map(({ iconId, rawSvgCode }) =>
                writeFile(
                    pathJoin(remixiconDirPath, `${iconId}.svg`),
                    Buffer.from(rawSvgCode, "utf8")
                )
            );

        ["icons.css", "icons.min.css"].forEach(cssFileBasename =>
            writeFile(
                pathJoin(dsfrDistDirPath, "utility", "icons", cssFileBasename),
                rawIconCssCodeBuffer
            )
        );
    });
})();
