#!/usr/bin/env node
/**
 * This script is ran with `npx react-dsfr include-used-icons`
 * It scans your codebase to find which icons are used and only include those in the final build.
 * Do do that it patches the node_modules/@codegouvfr/react-dsfr/dist/utility/icons/icons.css file
 * and the public/dsfr/utility/icons/icons.css file (if applicable, not in Next.js for example).
 * The script can figure out where your node_modules and public directories are.
 *
 * There are two optional arguments that you can use:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--silent` to disable console.log
 */
export declare const PATH_OF_ICONS_JSON: string;
export declare const PATH_OF_PATCHED_RAW_CSS_CODE_FOR_COMPAT_WITH_REMIXICON_RELATIVE_TO_DSFR: string;
export type Icon = Icon.Dsfr | Icon.Remixicon;
export declare namespace Icon {
    type Common = {
        iconId: string;
    };
    type Dsfr = Common & {
        prefix: "fr-icon-";
        svgRelativePath: string;
    };
    type Remixicon = Common & {
        prefix: "ri-";
        rawSvgCode: string;
    };
}
type IconLike = Icon.Dsfr | Omit<Icon.Remixicon, "rawSvgCode">;
export declare function generateIconsRawCssCode(params: {
    usedIcons: IconLike[];
    patchedRawCssCodeForCompatWithRemixIcon: string;
}): string;
export declare function main(args: string[]): Promise<void>;
export {};
