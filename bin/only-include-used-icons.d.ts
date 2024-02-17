#!/usr/bin/env node
/**
 * This script is ran with `npx only-include-used-icons`
 * It scans your codebase to find which icons are used and only include those in the final build.
 * Do do that it patches the node_modules/@codegouvfr/react-dsfr/dist/utility/icons/icons.css file
 * and the public/dsfr/utility/icons/icons.css file (if applicable, not in Next.js for example).
 * The script can figure out where your node_modules and public directories are.
 *
 * There are two optional arguments that you can use:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--publicDir <path>` to specify the public directory.
 *   In Vite projects we will read the vite.config.ts (or .js) file to find the public directory.
 *   In other projects we will assume it's <project root>/public.
 *   This path is expressed relative to the project directory.
 *   It is assumed that there is a dsfr directory in the public directory (copied over using the
 *   `npx copy-dsfr-to-public` script).
 * - `--silent` to disable console.log
 */
export declare const pathOfIconsJson: string;
export declare const pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist: string;
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
export {};
