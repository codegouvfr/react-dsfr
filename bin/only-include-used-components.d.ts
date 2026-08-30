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
export declare const DSFR_COMPONENTS_CASCADE_ORDER: readonly ["upload", "range", "accordion", "badge", "logo", "button", "connect", "quote", "breadcrumb", "form", "stepper", "tooltip", "link", "sidemenu", "callout", "highlight", "tab", "pagination", "summary", "tag", "download", "alert", "notice", "radio", "card", "checkbox", "input", "content", "segmented", "toggle", "skiplink", "select", "modal", "navigation", "share", "footer", "tile", "search", "consent", "follow", "password", "translate", "table", "transcription", "header"];
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
export declare const REACT_DSFR_MODULE_TO_DSFR_COMPONENTS: Record<string, DsfrComponentName[]>;
/**
 * The stylesheet a DSFR component ships under `component/<name>/<name>.<ext>`, by order of
 * preference. Not every component has every variant: `download` for instance only ships
 * `download.css` and `download.min.css`, no `.main.` ones.
 */
export declare const DSFR_COMPONENT_CSS_FILE_EXTENSIONS: readonly ["main.min.css", "min.css", "main.css", "css"];
/**
 * CSS class name prefixes that reveal a direct usage of a DSFR component in the
 * sources (when raw fr-* classes are used without importing the React component).
 * Substring matching is intentional and fail-safe: matching too much only means
 * including a component's CSS that may not be needed.
 *
 * A prefix only belongs here if it opens a selector in that component's own stylesheet.
 * A class that the component merely *styles as a descendant* is not a usage signal: its
 * base rules live elsewhere (usually in the always included core), so detecting on it
 * pulls the whole component in for nothing. dsfrComponentDetectionClassPrefixes.test.ts
 * re-derives this rule against the installed @gouvfr/dsfr.
 */
export declare const DSFR_COMPONENT_DETECTION_CLASS_PREFIXES: Record<DsfrComponentName, string[]>;
export declare function getReactDsfrImportedModuleIds(params: {
    rawFileContent: string;
}): string[];
export declare function resolveModuleIdToDsfrComponents(params: {
    moduleId: string;
}): DsfrComponentName[] | undefined;
export declare function detectDsfrComponentsFromClassNames(params: {
    rawFileContent: string;
}): DsfrComponentName[];
export declare function rewriteCssRelativeUrls(params: {
    rawCssCode: string;
    /** Posix style, relative to the dsfr directory, e.g. "component/header" */
    cssFileRelativeDirPath: string;
}): string;
/**
 * The assets (fonts, icons, artwork...) referenced by a stylesheet whose url()
 * have already been rewritten relative to the dsfr directory root by
 * rewriteCssRelativeUrls(). Absolute and data: urls are skipped.
 */
export declare function getReferencedAssetRelativePaths(params: {
    rawCssCode: string;
}): string[];
/**
 * String level equivalent of scripts/build/patchCssForMui.ts, the selectors
 * `button:not(:disabled):hover` and `button:not(:disabled):active` only exist
 * in the core stylesheet, within the `(hover: hover) and (pointer: fine)` media query.
 */
export declare function patchCoreCssCodeForCompatWithMui(params: {
    rawCssCode: string;
}): string;
export declare function generateDsfrCssCode(params: {
    dsfrComponents: string[];
    isMinified: boolean;
    /** Returns the raw code of a file within the dsfr directory, undefined if it does not exist */
    readDsfrFile: (fileRelativePath: string) => string | undefined;
}): string;
export declare function main(args: string[]): Promise<void>;
