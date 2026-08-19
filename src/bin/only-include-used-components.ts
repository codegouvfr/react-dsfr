#!/usr/bin/env node

/**
 * This script is ran with `npx react-dsfr only-include-used-components`
 * It scans your codebase to find which react-dsfr components are used and rebuilds
 * the node_modules/@codegouvfr/react-dsfr/dsfr/dsfr.css and dsfr.min.css files
 * with only the CSS of those components (plus the core, which is always included).
 * The public/dsfr/dsfr.min.css file is patched as well if applicable (not in Next.js for example).
 *
 * The trimmed stylesheets are rebuilt from the granular CSS files shipped by the DSFR
 * (dsfr/core/*, dsfr/component/*, dsfr/scheme/*) so no CSS rule is ever rewritten,
 * only whole components are included or excluded. This makes the output robust to
 * classes and attributes dynamically added by the DSFR JavaScript (data-fr-js-*).
 *
 * Usage of a component is detected by:
 * - Imports of `@codegouvfr/react-dsfr/<Component>` in your sources.
 * - Usage of the component's CSS class names (e.g. "fr-table") in your sources,
 *   for when you use raw DSFR classes without the React component.
 *
 * Stylesheets (.css, .scss...) are not scanned: class name detection is substring based,
 * so a single compiled bundle would mark every component as used.
 *
 * You can force the inclusion of components that the detection would miss by adding
 * to your package.json:
 * "react-dsfr": {
 *     "additionalComponents": ["table", "Range"]
 * }
 * (values are DSFR CSS component names or react-dsfr component names)
 *
 * There are three optional arguments that you can use:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--silent` to disable console.log
 * - `--strict` to exit with a non zero code instead of falling back to the untrimmed
 *   stylesheet when something can't be resolved. Recommended in CI, where the warning
 *   would otherwise go unnoticed and the build would silently ship the full bundle.
 */

import { getProjectRoot } from "./tools/getProjectRoot";
import * as fs from "fs";
import { join as pathJoin, relative as pathRelative } from "path";
import { assert } from "tsafe/assert";
import { exclude } from "tsafe/exclude";
import { writeFile, readFile, rm, cp } from "fs/promises";
import { crawl } from "./tools/crawl";
import { basename as pathBasename, sep as pathSep, dirname as pathDirname } from "path";
import yargsParser from "yargs-parser";
import { getAbsoluteAndInOsFormatPath } from "./tools/getAbsoluteAndInOsFormatPath";
import { readPublicDirPath } from "./readPublicDirPath";
import { existsAsync } from "./tools/fs.existsAsync";
import { fnv1aHashToHex } from "./tools/fnv1aHashToHex";
import { modifyHtmlHrefs } from "./tools/modifyHtmlHrefs";

/**
 * The DSFR CSS components (dsfr/component/<name> directories), listed in the
 * order in which they are concatenated in the upstream dsfr.css bundle.
 * Preserving this order preserves the CSS cascade of the original stylesheet.
 *
 * The order is the order of first occurrence of each `component/<name>/main.scss`
 * in the `sources` of `@gouvfr/dsfr/dist/dsfr.main.css.map`. It is asserted against
 * the installed DSFR in test/runtime/scripts/onlyIncludeUsedComponents/dsfrComponentsCascadeOrder.test.ts
 * so that it can't silently drift on a DSFR bump.
 * `radio` is the only component that has no `main.scss` upstream, its position is
 * taken from the first occurrence of any of its stylesheets (between notice and card).
 */
export const DSFR_COMPONENTS_CASCADE_ORDER = [
    "upload",
    "range",
    "accordion",
    "badge",
    "logo",
    "button",
    "connect",
    "quote",
    "breadcrumb",
    "form",
    "stepper",
    "tooltip",
    "link",
    "sidemenu",
    "callout",
    "highlight",
    "tab",
    "pagination",
    "summary",
    "tag",
    "download",
    "alert",
    "notice",
    "radio",
    "card",
    "checkbox",
    "input",
    "content",
    "segmented",
    "toggle",
    "skiplink",
    "select",
    "modal",
    "navigation",
    "share",
    "footer",
    "tile",
    "search",
    "consent",
    "follow",
    "password",
    "translate",
    "table",
    "transcription",
    "header"
] as const;

export type DsfrComponentName = typeof DSFR_COMPONENTS_CASCADE_ORDER[number];

/**
 * Map from react-dsfr module (the `@codegouvfr/react-dsfr/<moduleId>` import subpath)
 * to the DSFR CSS components its markup depends on, transitive dependencies included
 * (e.g. the Header renders a navigation, a search bar and a modal on mobile).
 * When in doubt a dependency is included: too much CSS is only a size cost,
 * not enough CSS is a rendering bug.
 * Modules that do not appear here and are not known non-component modules trigger
 * a fail-safe: every component is included.
 */
export const REACT_DSFR_MODULE_TO_DSFR_COMPONENTS: Record<string, DsfrComponentName[]> = {
    "Accordion": ["accordion"],
    "AgentConnectButton": ["connect", "button"],
    "Alert": ["alert", "link", "button"],
    "Badge": ["badge"],
    "Breadcrumb": ["breadcrumb", "link"],
    "Button": ["button", "link"],
    "ButtonsGroup": ["button", "link"],
    "CallOut": ["callout", "button", "link"],
    "Card": ["card", "badge", "link"],
    // The Chart components pull their CSS from the @gouvfr/dsfr-chart peer dependency.
    "Chart": [],
    "Checkbox": ["checkbox", "radio", "form"],
    "Display": ["modal", "radio", "form", "button", "link"],
    "Download": ["download", "link"],
    "Follow": ["follow", "form", "input", "upload", "button", "link", "alert", "checkbox"],
    "Footer": ["footer", "logo", "button", "link"],
    "FranceConnectButton": ["connect", "button"],
    "Header": [
        "header",
        "navigation",
        "modal",
        "logo",
        "button",
        "link",
        "search",
        "input",
        "form"
    ],
    "Highlight": ["highlight"],
    "Input": ["input", "form", "upload"],
    "LanguageSelect": ["translate", "navigation", "button", "link"],
    "MainNavigation": ["navigation", "link"],
    "Modal": ["modal", "button", "link"],
    "MonCompteProButton": ["connect", "button"],
    "Notice": ["notice", "button", "link"],
    "Pagination": ["pagination", "link"],
    "ProConnectButton": ["connect", "button"],
    "Quote": ["quote"],
    "RadioButtons": ["radio", "checkbox", "form"],
    "Range": ["range", "form"],
    "SearchBar": ["search", "input", "form", "button"],
    "SegmentedControl": ["segmented", "form"],
    "Select": ["select", "form"],
    "SelectNext": ["select", "form"],
    "SideMenu": ["sidemenu", "link"],
    "SkipLinks": ["skiplink", "link"],
    "Stepper": ["stepper"],
    "Summary": ["summary", "link"],
    "Table": ["table"],
    "Tabs": ["tab"],
    "Tag": ["tag"],
    "TagsGroup": ["tag"],
    "Tile": ["tile", "link"],
    "ToggleSwitch": ["toggle", "form"],
    "ToggleSwitchGroup": ["toggle", "form"],
    "Tooltip": ["tooltip", "button"],
    "Upload": ["upload", "input", "form"],
    "blocks/PasswordInput": ["password", "input", "form", "link", "checkbox"],
    "consentManagement": ["consent", "modal", "button", "link", "radio", "form"],
    // `link` is the registerLink module, its Link fallback renders a `fr-link` button.
    "link": ["link"],
    // `shared` only contains Fieldset, the internal building block of
    // Checkbox / RadioButtons: it renders fr-fieldset, fr-label, fr-hint-text and fr-radio-rich.
    "shared": ["form", "radio", "checkbox"]
};

/**
 * CSS class name prefixes that reveal a direct usage of a DSFR component in the
 * sources (when raw fr-* classes are used without importing the React component).
 * Substring matching is intentional and fail-safe: matching too much only means
 * including a component's CSS that may not be needed.
 */
export const DSFR_COMPONENT_DETECTION_CLASS_PREFIXES: Record<DsfrComponentName, string[]> = {
    "accordion": ["fr-accordion"],
    "alert": ["fr-alert"],
    "badge": ["fr-badge"],
    "breadcrumb": ["fr-breadcrumb"],
    "button": ["fr-btn"],
    "callout": ["fr-callout"],
    "card": ["fr-card"],
    "checkbox": ["fr-checkbox"],
    "connect": ["fr-connect"],
    "consent": ["fr-consent"],
    "content": ["fr-content-media", "fr-responsive-img", "fr-responsive-vid"],
    "download": ["fr-download"],
    "follow": ["fr-follow"],
    "footer": ["fr-footer"],
    "form": ["fr-fieldset", "fr-label", "fr-hint-text", "fr-message", "fr-input-group"],
    "header": ["fr-header"],
    "highlight": ["fr-highlight"],
    "input": ["fr-input"],
    "link": ["fr-link"],
    "logo": ["fr-logo"],
    "modal": ["fr-modal"],
    "navigation": ["fr-nav", "fr-menu", "fr-mega-menu"],
    "notice": ["fr-notice"],
    "pagination": ["fr-pagination"],
    "password": ["fr-password"],
    "quote": ["fr-quote"],
    "radio": ["fr-radio"],
    "range": ["fr-range"],
    "search": ["fr-search-bar"],
    "segmented": ["fr-segmented"],
    "select": ["fr-select"],
    "share": ["fr-share"],
    "sidemenu": ["fr-sidemenu"],
    "skiplink": ["fr-skiplink"],
    "stepper": ["fr-stepper"],
    "summary": ["fr-summary"],
    "tab": ["fr-tabs"],
    "table": ["fr-table"],
    "tag": ["fr-tag"],
    "tile": ["fr-tile"],
    "toggle": ["fr-toggle"],
    "tooltip": ["fr-tooltip"],
    "transcription": ["fr-transcription"],
    "translate": ["fr-translate"],
    "upload": ["fr-upload"]
};

/**
 * react-dsfr modules that are known not to render any DSFR component markup
 * (hooks, utilities, integration helpers, assets...).
 */
const NON_COMPONENT_MODULE_IDS = new Set<string>([
    "fr",
    "i18n",
    "spa",
    "start",
    "tss",
    "mui",
    "picto",
    "tools",
    "assets",
    "favicon",
    "main.css",
    "dsfr.css",
    "next-appdir",
    "next-app-router",
    "next-pagesdir",
    "useBreakpointsValues",
    "useBreakpointsValuesPx",
    "useColors",
    "useIsDark",
    "eulerianAnalytics",
    "getHtmlAttributes",
    "zz_internal"
]);

/**
 * Regexes matching the specifier of an actual import statement.
 * Matching any textual occurrence of "@codegouvfr/react-dsfr/..." instead would
 * pick up urls and comments (a link to https://www.npmjs.com/package/@codegouvfr/react-dsfr/v/1.32.5
 * would resolve to the unknown module "v" and trigger the include-everything fail-safe).
 */
const IMPORT_SPECIFIER_REGEXES = [
    // import X from "..." / export * from "..."
    /\bfrom\s*["'`]([^"'`\n]+)["'`]/g,
    // import "..." / import("...")
    /\bimport\s*\(?\s*["'`]([^"'`\n]+)["'`]/g,
    // require("...")
    /\brequire\s*\(\s*["'`]([^"'`\n]+)["'`]/g,
    // @import "..." / @import url("...")
    /@import\s+(?:url\(\s*)?["'`]([^"'`\n]+)["'`]/g
];

const REACT_DSFR_PACKAGE_NAME = "@codegouvfr/react-dsfr";

export function getReactDsfrImportedModuleIds(params: { rawFileContent: string }): string[] {
    const { rawFileContent } = params;

    const moduleIds = new Set<string>();

    if (!rawFileContent.includes(REACT_DSFR_PACKAGE_NAME)) {
        return [];
    }

    const importSpecifiers = new Set(
        IMPORT_SPECIFIER_REGEXES.map(regex =>
            Array.from(rawFileContent.matchAll(regex), ([, specifier]) => specifier)
        ).flat()
    );

    for (const importSpecifier of importSpecifiers) {
        if (!importSpecifier.startsWith(`${REACT_DSFR_PACKAGE_NAME}/`)) {
            continue;
        }

        const subpath = importSpecifier.slice(`${REACT_DSFR_PACKAGE_NAME}/`.length);

        const segments = subpath
            .replace(/\.(?:js|mjs|cjs|ts|tsx|jsx)$/, "")
            .split("/")
            .filter(segment => segment !== "index" && segment !== "");

        if (segments.length === 0) {
            continue;
        }

        moduleIds.add(
            (() => {
                switch (segments[0]) {
                    case "blocks":
                        return segments.slice(0, 2).join("/");
                    case "dsfr":
                        return segments.slice(0, 3).join("/");
                    default:
                        return segments[0];
                }
            })()
        );
    }

    return Array.from(moduleIds);
}

export function resolveModuleIdToDsfrComponents(params: {
    moduleId: string;
}): DsfrComponentName[] | undefined {
    const { moduleId } = params;

    direct_import_of_a_dsfr_component_stylesheet: {
        const match = moduleId.match(/^dsfr\/component\/([^/]+)/);

        if (match === null) {
            break direct_import_of_a_dsfr_component_stylesheet;
        }

        const dsfrComponent = DSFR_COMPONENTS_CASCADE_ORDER.find(
            componentName => componentName === match[1]
        );

        return dsfrComponent === undefined ? undefined : [dsfrComponent];
    }

    if (moduleId.startsWith("dsfr/")) {
        return [];
    }

    {
        const dsfrComponents = REACT_DSFR_MODULE_TO_DSFR_COMPONENTS[moduleId.split("/")[0]];

        if (dsfrComponents !== undefined) {
            return dsfrComponents;
        }
    }

    {
        const dsfrComponents = REACT_DSFR_MODULE_TO_DSFR_COMPONENTS[moduleId];

        if (dsfrComponents !== undefined) {
            return dsfrComponents;
        }
    }

    const firstSegment = moduleId.split("/")[0];

    if (NON_COMPONENT_MODULE_IDS.has(firstSegment)) {
        return [];
    }

    // A component this script does not know about (newer react-dsfr version?),
    // or a new non-component module missing from NON_COMPONENT_MODULE_IDS.
    return undefined;
}

export function detectDsfrComponentsFromClassNames(params: {
    rawFileContent: string;
}): DsfrComponentName[] {
    const { rawFileContent } = params;

    if (!rawFileContent.includes("fr-")) {
        return [];
    }

    return Object.entries(DSFR_COMPONENT_DETECTION_CLASS_PREFIXES)
        .filter(([, classPrefixes]) =>
            classPrefixes.some(classPrefix => rawFileContent.includes(classPrefix))
        )
        .map(([componentName]) => componentName as DsfrComponentName);
}

export function rewriteCssRelativeUrls(params: {
    rawCssCode: string;
    /** Posix style, relative to the dsfr directory, e.g. "component/header" */
    cssFileRelativeDirPath: string;
}): string {
    const { rawCssCode, cssFileRelativeDirPath } = params;

    return rawCssCode.replace(/url\((["']?)([^)"']+)\1\)/g, (match, quote: string, url: string) => {
        if (/^(?:data:|https?:|\/)/.test(url)) {
            return match;
        }

        const pathSegments: string[] = [];

        for (const segment of [...cssFileRelativeDirPath.split("/"), ...url.split("/")]) {
            if (segment === "." || segment === "") {
                continue;
            }

            if (segment === ".." && pathSegments.length !== 0) {
                pathSegments.pop();
                continue;
            }

            pathSegments.push(segment);
        }

        return `url(${quote}${pathSegments.join("/")}${quote})`;
    });
}

/**
 * The assets (fonts, icons, artwork...) referenced by a stylesheet whose url()
 * have already been rewritten relative to the dsfr directory root by
 * rewriteCssRelativeUrls(). Absolute and data: urls are skipped.
 */
export function getReferencedAssetRelativePaths(params: { rawCssCode: string }): string[] {
    const { rawCssCode } = params;

    const assetRelativePaths = new Set<string>();

    for (const [, , url] of rawCssCode.matchAll(/url\((["']?)([^)"']+)\1\)/g)) {
        if (/^(?:data:|https?:|\/)/.test(url)) {
            continue;
        }

        const [urlWithoutQuery] = url.split(/[?#]/);

        if (urlWithoutQuery === "") {
            continue;
        }

        assetRelativePaths.add(urlWithoutQuery);
    }

    return Array.from(assetRelativePaths);
}

/**
 * String level equivalent of scripts/build/patchCssForMui.ts, the selectors
 * `button:not(:disabled):hover` and `button:not(:disabled):active` only exist
 * in the core stylesheet, within the `(hover: hover) and (pointer: fine)` media query.
 */
export function patchCoreCssCodeForCompatWithMui(params: { rawCssCode: string }): string {
    const { rawCssCode } = params;

    return rawCssCode
        .replace(
            /button:not\(:disabled\):hover(?![\w:([-])/g,
            'button:not(:disabled):hover:not([class^="Mui"])'
        )
        .replace(
            /button:not\(:disabled\):active(?![\w:([-])/g,
            'button:not(:disabled):active:not([class^="Mui"])'
        );
}

export function generateDsfrCssCode(params: {
    dsfrComponents: string[];
    isMinified: boolean;
    /** Returns the raw code of a file within the dsfr directory, undefined if it does not exist */
    readDsfrFile: (fileRelativePath: string) => string | undefined;
}): string {
    const { dsfrComponents, isMinified, readDsfrFile } = params;

    const sortedDsfrComponents = [
        ...DSFR_COMPONENTS_CASCADE_ORDER.filter(componentName =>
            dsfrComponents.includes(componentName)
        ),
        // Fail-safe for component directories unknown to this script
        // (newer DSFR version): appended in alphabetical order.
        ...dsfrComponents
            .filter(
                componentName =>
                    !DSFR_COMPONENTS_CASCADE_ORDER.includes(componentName as DsfrComponentName)
            )
            .sort()
    ];

    const readCssChunks = (params: {
        getFileRelativePathCandidates: (dirRelativePath: string, basename: string) => string[];
    }) => {
        const { getFileRelativePathCandidates } = params;

        return [
            ["core", "core"],
            ["scheme", "scheme"],
            ...sortedDsfrComponents.map(componentName => [
                `component/${componentName}`,
                componentName
            ])
        ]
            .map(([dirRelativePath, basename]) => {
                for (const fileRelativePath of getFileRelativePathCandidates(
                    dirRelativePath,
                    basename
                )) {
                    const rawCssCode = readDsfrFile(fileRelativePath);

                    if (rawCssCode === undefined) {
                        continue;
                    }

                    return {
                        dirRelativePath,
                        rawCssCode
                    };
                }

                return undefined;
            })
            .filter(exclude(undefined));
    };

    const cssChunks = [
        ...readCssChunks({
            "getFileRelativePathCandidates": (dirRelativePath, basename) =>
                (isMinified
                    ? [`${basename}.main.min.css`, `${basename}.min.css`]
                    : [`${basename}.main.css`, `${basename}.css`]
                ).map(fileBasename => `${dirRelativePath}/${fileBasename}`)
        }),
        ...readCssChunks({
            "getFileRelativePathCandidates": (dirRelativePath, basename) =>
                (isMinified ? [`${basename}.print.min.css`] : [`${basename}.print.css`]).map(
                    fileBasename => `${dirRelativePath}/${fileBasename}`
                )
        })
    ];

    assert(
        cssChunks.length !== 0,
        "Can't find the granular DSFR stylesheets to rebuild dsfr.css from"
    );

    return [
        `/*! DSFR stylesheet rebuilt by react-dsfr only-include-used-components, components: ${sortedDsfrComponents.join(
            ", "
        )} */`,
        ...cssChunks.map(({ dirRelativePath, rawCssCode }) => {
            let cssCode = rawCssCode
                .replace(/@charset "UTF-8";\s*/g, "")
                .replace(/^\/\*![\s\S]*?\*\/\s*/, "")
                .replace(/\/\*# sourceMappingURL=[^*]*\*\/\s*/g, "");

            cssCode = rewriteCssRelativeUrls({
                "rawCssCode": cssCode,
                "cssFileRelativeDirPath": dirRelativePath
            });

            if (dirRelativePath === "core") {
                cssCode = patchCoreCssCodeForCompatWithMui({ "rawCssCode": cssCode });
            }

            return cssCode.trim();
        })
    ].join("\n");
}

type CommandContext = {
    projectDirPath: string;
    srcFilePaths: string[];
    dsfrDirPath: string;
    spaParams:
        | {
              dsfrDirPath_static: string;
              // Undefined whenever public/dsfr exists but no index.html was found to add
              // a cache busting query parameter to: a monorepo invoked with --projectDir,
              // a project that used to be a Vite/CRA app, or a Next.js app that opted into
              // copy-static-assets (the documented Next.js setup has no public/dsfr at all).
              htmlFilePath: string | undefined;
          }
        | undefined;
    isSilent: boolean;
    isStrict: boolean;
};

const CODEGOUV_REACT_DSFR: string = JSON.parse(
    fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
)["name"];

async function getCommandContext(args: string[]): Promise<CommandContext | undefined> {
    const argv = yargsParser(args);

    const projectDirPath: string = (() => {
        read_from_argv: {
            const arg = argv["projectDir"];

            if (arg === undefined) {
                break read_from_argv;
            }

            return getAbsoluteAndInOsFormatPath({ "pathIsh": arg, "cwd": process.cwd() });
        }

        return process.cwd();
    })();

    special_case_for_our_storybook: {
        const packageJsonFilePath = pathJoin(process.cwd(), "package.json");

        if (!(await existsAsync(packageJsonFilePath))) {
            break special_case_for_our_storybook;
        }

        const packageJson = JSON.parse((await readFile(packageJsonFilePath)).toString("utf8"));

        if (packageJson["name"] !== CODEGOUV_REACT_DSFR) {
            break special_case_for_our_storybook;
        }

        // The storybook documents every component, there is nothing to trim.
        return undefined;
    }

    const nodeModulesDirPath = await (async function callee(n: number): Promise<string> {
        if (n >= projectDirPath.split(pathSep).length) {
            throw new Error("Need to install node modules?");
        }

        const nodeModulesDirPath = pathJoin(
            ...[projectDirPath, ...new Array(n).fill(".."), "node_modules"]
        );

        const doesExist = await existsAsync(
            pathJoin(...[nodeModulesDirPath, ...CODEGOUV_REACT_DSFR.split("/")])
        );

        if (!doesExist) {
            return callee(n + 1);
        }

        return nodeModulesDirPath;
    })(0);

    const dsfrDirPath = pathJoin(
        ...[nodeModulesDirPath, ...CODEGOUV_REACT_DSFR.split("/"), "dsfr"]
    );

    const dsfrDirPath_static = await (async () => {
        const dsfrDirPath_static = pathJoin(await readPublicDirPath({ projectDirPath }), "dsfr");

        if (!(await existsAsync(dsfrDirPath_static))) {
            return undefined;
        }

        return dsfrDirPath_static;
    })();

    const htmlFilePath = await (async () => {
        if (dsfrDirPath_static === undefined) {
            return undefined;
        }

        vite: {
            const filePath = pathJoin(projectDirPath, "index.html");

            if (!fs.existsSync(filePath)) {
                break vite;
            }

            return filePath;
        }

        cra: {
            const filePath = pathJoin(pathDirname(dsfrDirPath_static), "index.html");

            if (!fs.existsSync(filePath)) {
                break cra;
            }

            return filePath;
        }

        // Next.js
        return undefined;
    })();

    const isSilent = argv["silent"] === true;
    const isStrict = argv["strict"] === true;

    const srcFilePaths = (
        await Promise.all([
            crawl({
                "dirPath": projectDirPath,
                "returnedPathsType": "absolute",
                "getDoCrawlInDir": async ({ relativeDirPath }) => {
                    if (relativeDirPath === "dist") {
                        return false;
                    }

                    if (relativeDirPath === "build") {
                        return false;
                    }

                    if (pathBasename(relativeDirPath) === "node_modules") {
                        return false;
                    }

                    if (
                        await existsAsync(pathJoin(projectDirPath, relativeDirPath, "dsfr.min.css"))
                    ) {
                        // We don't want to search in public/dsfr
                        return false;
                    }

                    if (pathBasename(relativeDirPath).startsWith(".")) {
                        return false;
                    }

                    return true;
                }
            }),
            crawl({
                "dirPath": nodeModulesDirPath,
                "returnedPathsType": "absolute",
                "getDoCrawlInDir": async ({ relativeDirPath }) => {
                    if (
                        relativeDirPath.startsWith("@") &&
                        relativeDirPath.split(pathSep).length === 1
                    ) {
                        return true;
                    }

                    if (
                        relativeDirPath.split(pathSep).length === 1 ||
                        (relativeDirPath.startsWith("@") &&
                            relativeDirPath.split(pathSep).length === 2)
                    ) {
                        const parsedPackageJson = await readFile(
                            pathJoin(nodeModulesDirPath, relativeDirPath, "package.json")
                        ).then(
                            buff => JSON.parse(buff.toString("utf8")),
                            () => undefined
                        );

                        if (parsedPackageJson === undefined) {
                            return false;
                        }

                        if (parsedPackageJson["name"] === CODEGOUV_REACT_DSFR) {
                            // Scanning react-dsfr's own sources would mark every component as used.
                            return false;
                        }

                        if (parsedPackageJson["name"] === "tss-react") {
                            return false;
                        }

                        if (parsedPackageJson["name"] === "@gouvfr/dsfr-chart") {
                            return false;
                        }

                        if (parsedPackageJson["name"] === "@gouvfr/dsfr") {
                            return false;
                        }

                        for (const packageName of [
                            CODEGOUV_REACT_DSFR,
                            "@gouvfr/dsfr",
                            "@dataesr/react-dsfr"
                        ]) {
                            if (
                                Object.keys({
                                    ...parsedPackageJson["dependencies"],
                                    ...parsedPackageJson["devDependencies"],
                                    ...parsedPackageJson["peerDependencies"]
                                }).includes(packageName)
                            ) {
                                return true;
                            }
                        }

                        return false;
                    }

                    if (pathBasename(relativeDirPath) === "generatedFromCss") {
                        return false;
                    }

                    if (pathBasename(relativeDirPath) === "node_modules") {
                        return false;
                    }

                    if (pathBasename(relativeDirPath).startsWith(".")) {
                        return false;
                    }

                    return true;
                }
            })
        ])
    )
        .flat()
        .filter(
            filePath =>
                // NOTE: Stylesheets are deliberately not scanned: detectDsfrComponentsFromClassNames()
                // does substring matching, so a single compiled bundle (a leftover out/, a
                // dependency shipping the DSFR) would mark every component as used.
                // Use "react-dsfr"."additionalComponents" in your package.json for the
                // components you only reference from a stylesheet.
                ["tsx", "jsx", "js", "ts", "mdx", "html", "htm", "svelte", "vue"].find(ext =>
                    filePath.endsWith(`.${ext}`)
                ) !== undefined
        );

    return {
        projectDirPath,
        srcFilePaths,
        dsfrDirPath,
        "spaParams": (() => {
            if (dsfrDirPath_static === undefined) {
                return undefined;
            }

            return {
                dsfrDirPath_static,
                htmlFilePath
            };
        })(),
        isSilent,
        isStrict
    };
}

export async function main(args: string[]) {
    const commandContext = await getCommandContext(args);

    if (commandContext === undefined) {
        return;
    }

    const log = commandContext.isSilent ? undefined : console.log;

    const componentsDirPath = pathJoin(commandContext.dsfrDirPath, "component");

    if (!fs.existsSync(componentsDirPath)) {
        assert(
            false,
            [
                `Can't find the granular DSFR stylesheets in ${componentsDirPath},`,
                `is your installation of ${CODEGOUV_REACT_DSFR} complete?`
            ].join(" ")
        );
    }

    const availableDsfrComponents = fs
        .readdirSync(componentsDirPath, { "withFileTypes": true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(componentName =>
            ["main.min.css", "min.css", "main.css", "css"].some(ext =>
                fs.existsSync(
                    pathJoin(
                        commandContext.dsfrDirPath,
                        "component",
                        componentName,
                        `${componentName}.${ext}`
                    )
                )
            )
        );

    const usedDsfrComponents = new Set<string>();

    let doIncludeAllComponents = false;

    await Promise.all(
        commandContext.srcFilePaths.map(async srcFilePath => {
            const rawFileContent = (await readFile(srcFilePath)).toString("utf8");

            for (const moduleId of getReactDsfrImportedModuleIds({ rawFileContent })) {
                const dsfrComponents = resolveModuleIdToDsfrComponents({ moduleId });

                if (dsfrComponents === undefined) {
                    // NOTE: Deliberately not routed through log?.(), --silent must not hide
                    // the fact that the optimization has been disabled for this run.
                    console.warn(
                        [
                            `[react-dsfr] Unknown react-dsfr module "${moduleId}" imported in`,
                            `${pathRelative(process.cwd(), srcFilePath)}:`,
                            `no CSS is trimmed at all for this run, every component is included.`,
                            `Please report it: https://github.com/codegouvfr/react-dsfr/issues`
                        ].join(" ")
                    );

                    doIncludeAllComponents = true;

                    continue;
                }

                if (dsfrComponents.length === 0) {
                    continue;
                }

                log?.(`Found import of ${moduleId} in ${pathRelative(process.cwd(), srcFilePath)}`);

                dsfrComponents.forEach(componentName => usedDsfrComponents.add(componentName));
            }

            for (const componentName of detectDsfrComponentsFromClassNames({ rawFileContent })) {
                if (usedDsfrComponents.has(componentName)) {
                    continue;
                }

                log?.(
                    `Found usage of ${componentName} classes in ${pathRelative(
                        process.cwd(),
                        srcFilePath
                    )}`
                );

                usedDsfrComponents.add(componentName);
            }
        })
    );

    additional_components_from_package_json: {
        const packageJsonFilePath = pathJoin(commandContext.projectDirPath, "package.json");

        if (!(await existsAsync(packageJsonFilePath))) {
            break additional_components_from_package_json;
        }

        const reactDsfrConfig: unknown = JSON.parse(
            (await readFile(packageJsonFilePath)).toString("utf8")
        )["react-dsfr"];

        const additionalComponents: unknown =
            reactDsfrConfig === null || typeof reactDsfrConfig !== "object"
                ? undefined
                : (reactDsfrConfig as Record<string, unknown>)["additionalComponents"];

        if (additionalComponents === undefined) {
            if (reactDsfrConfig !== null && typeof reactDsfrConfig === "object") {
                // A typo in the key would otherwise silently disable the escape hatch.
                console.warn(
                    [
                        `[react-dsfr] The "react-dsfr" entry of your package.json has no`,
                        `"additionalComponents" key, is it a typo? Found:`,
                        `${Object.keys(reactDsfrConfig as Record<string, unknown>).join(", ")}`
                    ].join(" ")
                );
            }

            break additional_components_from_package_json;
        }

        assert(
            Array.isArray(additionalComponents) &&
                additionalComponents.every((value): value is string => typeof value === "string"),
            'Malformed "react-dsfr"."additionalComponents" in package.json, expected an array of strings'
        );

        for (const additionalComponent of additionalComponents) {
            const dsfrComponents =
                REACT_DSFR_MODULE_TO_DSFR_COMPONENTS[additionalComponent] ??
                (availableDsfrComponents.includes(additionalComponent)
                    ? [additionalComponent]
                    : undefined);

            if (dsfrComponents === undefined) {
                console.warn(
                    [
                        `[react-dsfr] Unknown component "${additionalComponent}" in`,
                        `"react-dsfr"."additionalComponents" of your package.json:`,
                        `no CSS is trimmed at all for this run, every component is included.`
                    ].join(" ")
                );

                doIncludeAllComponents = true;

                continue;
            }

            if (dsfrComponents.length === 0) {
                // Reporting "Including <X>" here would be the exact opposite of what happens,
                // and this escape hatch is precisely what one reaches for when something is unstyled.
                console.warn(
                    [
                        `[react-dsfr] "${additionalComponent}" of`,
                        `"react-dsfr"."additionalComponents" maps to no DSFR stylesheet,`,
                        `nothing was added.`,
                        ...(additionalComponent === "Chart"
                            ? [`The Chart CSS comes from the @gouvfr/dsfr-chart package.`]
                            : [])
                    ].join(" ")
                );

                continue;
            }

            log?.(`Including ${additionalComponent} (from package.json additionalComponents)`);

            dsfrComponents.forEach(componentName => usedDsfrComponents.add(componentName));
        }
    }

    if (doIncludeAllComponents && commandContext.isStrict) {
        console.error(
            [
                `[react-dsfr] Aborting because of --strict:`,
                `something could not be resolved (see the warning(s) above),`,
                `so this run would have shipped the untrimmed dsfr.min.css.`,
                `Fix the cause or add the component to "react-dsfr"."additionalComponents"`,
                `in your package.json.`
            ].join(" ")
        );

        process.exit(1);
    }

    const dsfrComponents = doIncludeAllComponents
        ? availableDsfrComponents
        : availableDsfrComponents.filter(componentName => usedDsfrComponents.has(componentName));

    log?.(
        `Including the CSS of ${dsfrComponents.length} DSFR components (out of ${availableDsfrComponents.length}).`
    );

    const readDsfrFile = (fileRelativePath: string) => {
        const filePath = pathJoin(commandContext.dsfrDirPath, ...fileRelativePath.split("/"));

        if (!fs.existsSync(filePath)) {
            return undefined;
        }

        return fs.readFileSync(filePath).toString("utf8");
    };

    const rawDsfrCssCodeBuffer = Buffer.from(
        generateDsfrCssCode({
            dsfrComponents,
            "isMinified": false,
            readDsfrFile
        }),
        "utf8"
    );

    const rawDsfrMinCssCodeBuffer = Buffer.from(
        generateDsfrCssCode({
            dsfrComponents,
            "isMinified": true,
            readDsfrFile
        }),
        "utf8"
    );

    let hasChanged = false;

    await Promise.all(
        [
            {
                "dsfrDirPath": commandContext.dsfrDirPath,
                "cssFileBasenames": ["dsfr.css", "dsfr.min.css"] as const
            },
            ...(commandContext.spaParams === undefined
                ? []
                : [
                      {
                          "dsfrDirPath": commandContext.spaParams.dsfrDirPath_static,
                          // copy-dsfr-to-public only keeps the minified variant.
                          "cssFileBasenames": ["dsfr.min.css"] as const
                      }
                  ])
        ].map(async ({ dsfrDirPath, cssFileBasenames }) =>
            Promise.all(
                cssFileBasenames.map(async cssFileBasename => {
                    const cssFilePath = pathJoin(dsfrDirPath, cssFileBasename);

                    if (!(await existsAsync(cssFilePath))) {
                        return;
                    }

                    const buffer =
                        cssFileBasename === "dsfr.min.css"
                            ? rawDsfrMinCssCodeBuffer
                            : rawDsfrCssCodeBuffer;

                    if (Buffer.compare(await readFile(cssFilePath), buffer) === 0) {
                        return;
                    }

                    hasChanged = true;

                    await writeFile(cssFilePath, buffer);
                })
            )
        )
    );

    // NOTE: Deliberately outside of the `hasChanged` guard below.
    // copy-dsfr-to-public builds its keep list from the url() of the dsfr.min.css it
    // finds in node_modules, then early returns on every later run as long as
    // public/dsfr/version.txt matches the @gouvfr/dsfr version. So once it has run
    // against an already trimmed stylesheet, public/dsfr is frozen on that asset subset
    // and growing the component set later can never bring the missing files back.
    // Copying them ourselves also makes a purged public/dsfr repairable when the CSS
    // itself did not change.
    await (async function copyUsedDsfrAssetsToStatic() {
        if (commandContext.spaParams === undefined) {
            return;
        }

        const { dsfrDirPath_static } = commandContext.spaParams;

        await Promise.all(
            getReferencedAssetRelativePaths({
                "rawCssCode": rawDsfrMinCssCodeBuffer.toString("utf8")
            }).map(async assetRelativePath => {
                const pathSegments = assetRelativePath.split("/");

                const srcFilePath = pathJoin(commandContext.dsfrDirPath, ...pathSegments);

                if (!(await existsAsync(srcFilePath))) {
                    return;
                }

                await cp(srcFilePath, pathJoin(dsfrDirPath_static, ...pathSegments));
            })
        );
    })();

    // NOTE: Deliberately outside of the `hasChanged` guard below. The rewrite is
    // idempotent, and inside the guard a stale or hand reverted hash could never be
    // repaired as long as dsfr.min.css itself did not change.
    await (async function addHashQueryParameterInIndexHtml() {
        const htmlFilePath = commandContext.spaParams?.htmlFilePath;

        if (htmlFilePath === undefined) {
            return;
        }

        const html = (await readFile(htmlFilePath)).toString("utf8");

        const { modifiedHtml } = modifyHtmlHrefs({
            "html": html,
            "getModifiedHref": href => {
                if (!href.includes("dsfr.min.css")) {
                    return href;
                }

                const [urlWithoutQuery] = href.split("?");

                return `${urlWithoutQuery}?hash=${fnv1aHashToHex(
                    rawDsfrMinCssCodeBuffer.toString("utf8")
                )}`;
            }
        });

        if (modifiedHtml === html) {
            return;
        }

        await writeFile(htmlFilePath, Buffer.from(modifiedHtml, "utf8"));
    })();

    if (!hasChanged) {
        log?.("No change since last run");
        return;
    }

    await Promise.all([
        (async function clearCache() {
            await Promise.all(
                [
                    pathJoin(".next", "cache"),
                    pathJoin(".vite"),
                    pathJoin(".cache", "storybook"),
                    pathJoin(".cache", "babel-loader"),
                    pathJoin(".cache", "default-development")
                ]
                    .map(relativeDirPath =>
                        pathJoin(commandContext.projectDirPath, "node_modules", relativeDirPath)
                    )
                    .map(async dirPath => {
                        if (!(await existsAsync(dirPath))) {
                            return;
                        }

                        await rm(dirPath, { "recursive": true, "force": true });
                    })
            );
        })()
    ]);
}

if (require.main === module) {
    main(process.argv.slice(2));
}
