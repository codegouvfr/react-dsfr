import type { State } from "./colorOptions";
import { states } from "./colorOptions";
import { id } from "tsafe/id";
import { assert } from "tsafe/assert";
import { capitalize } from "tsafe/capitalize";
import css from "css";
import { exclude } from "tsafe/exclude";
import { is } from "tsafe/is";
import { parseColorOptionName, getThemePath as getColorOptionThemePath } from "./colorOptions";

const contexts = ["background", "text", "border", "artwork"] as const;

type Context = typeof contexts[number];

const variants = ["hight", "low"] as const;

type Variant = typeof variants[number];

export type ParsedColorDecisionName = {
    context: Context;
    usage: string; //default alt contrast altOverlap contrastRaised
    variant: Variant | undefined;
    colorName: string; // "grey" "blueFrance"
    state: State | undefined;
};

export function createParseColorDecisionName(params: {
    /** Like [ "grey", "blueFrance", ... ]
     * All the the color name in camel case that we deduce from Options
     * it help parsing without making assumption on what is a valid Usage
     */
    colorNames: string[];
}) {
    const { colorNames } = params;

    function parseColorDecisionName(colorDecisionName: `--${string}`): ParsedColorDecisionName {
        /*
        colorDecisionName: 
        --background-default-grey-hover
        --background-default-grey
        --border-action-low-orange-terre-battue
        --background-alt-raised-grey-hover
        --background-contrast-overlap-grey
        */

        const parsedColorDecisionName: ParsedColorDecisionName = {} as any;

        let arr = colorDecisionName.replace(/^--/, "").split("-");

        /*
        arr: 
        [ "background", "default", "grey", "hover" ]
        [ "background", "default", "grey" ]
        [ "border", "action-low", "orange", "terre", "battue"]
        [ "background", "alt", "raised", "grey", "hover" ]
        [ "background", "contrast-overlap", "grey" ]
        */

        //parse context
        {
            const [firstWord, ...rest] = arr;

            arr = rest;

            assert(id<readonly string[]>(contexts).includes(firstWord));

            parsedColorDecisionName.context = firstWord as any;
        }

        parse_state: {
            const [lastWord, ...rest] = [...arr].reverse();
            rest.reverse();

            if (!id<readonly string[]>(states).includes(lastWord)) {
                parsedColorDecisionName.variant = undefined;
                break parse_state;
            }

            arr = rest;

            parsedColorDecisionName.state = lastWord as any;
        }

        parse_colorName: {
            for (const colorName of colorNames) {
                const kebabCaseColorName = colorName.replace(
                    /([A-Z])/g,
                    group => `-${group.toLowerCase()}`
                );

                const join = arr.join("-");

                if (!join.endsWith(kebabCaseColorName)) {
                    continue;
                }

                arr = join.split("-" + kebabCaseColorName)[0].split("-");

                parsedColorDecisionName.colorName = colorName;

                break parse_colorName;
            }

            assert(false);
        }

        parse_variant: {
            const [lastWord, ...rest] = [...arr].reverse();
            rest.reverse();

            if (!id<readonly string[]>(variants).includes(lastWord)) {
                parsedColorDecisionName.variant = undefined;
                break parse_variant;
            }

            arr = rest;

            parsedColorDecisionName.variant = lastWord as any;
        }

        parsedColorDecisionName.usage = arr
            .map((word, i) => (i === 0 ? word : capitalize(word)))
            .join("");

        return parsedColorDecisionName;
    }

    return { parseColorDecisionName };
}

/**
 * Exported only for tests
 *
 * getThemePath(createParseColorDecisionName("--background-alt-raised-grey-hover"))
 * ->
 * ["background", "altRaised", "normal", "grey", "hover"]
 *
 * getThemePath(createParseColorDecisionName("--border-action-low-orange-terre-battue"))
 * ->
 * ["border", "action", "low", "orangeTerreBattue", "default"]
 */
export function getThemePath(parsedColorDecisionName: ParsedColorDecisionName) {
    return [
        parsedColorDecisionName.context,
        parsedColorDecisionName.usage,
        parsedColorDecisionName.variant ?? "normal",
        parsedColorDecisionName.colorName,
        parsedColorDecisionName.state ?? "default"
    ];
}

export type ColorDecision = {
    themePath: string[];
    optionThemePath: string[];
};

export function createParseColorDecision(params: {
    /** Like [ "grey", "blueFrance", ... ]
     * All the the color name in camel case that we deduce from Options
     * it help parsing without making assumption on what is a valid Usage
     */
    colorNames: string[];
    /** ["--grey-1000-50-hover", "--grey-1000-50", ... ] */
    colorOptionNames: `--${string}`[];
}) {
    const { colorNames, colorOptionNames } = params;

    const { parseColorDecisionName } = createParseColorDecisionName({ colorNames });

    function parseColorDecision(rawCssCode: string): ColorDecision[] {
        const parsedCss = css.parse(rawCssCode);

        const { declarations } = (() => {
            const node = parsedCss.stylesheet?.rules.find(
                rule => rule.type === "rule" && (rule as any)?.selectors?.[0] === ":root"
            );

            assert(node !== undefined);

            const { declarations } = node as any;

            return { declarations };
        })();

        return declarations
            .map(({ property, value }: { property: string; value: string }) => {
                const mathArray = value.match(/^var\((--[^)]+)\)$/);

                if (mathArray === null) {
                    return undefined;
                }

                const colorOptionName = mathArray[1];

                assert(is<`--${string}`>(colorOptionName));

                if (!id<string[]>(colorOptionNames).includes(colorOptionName)) {
                    return undefined;
                }

                assert(is<`--${string}`>(property));

                return {
                    "themePath": getThemePath(parseColorDecisionName(property)),
                    "optionThemePath": getColorOptionThemePath(
                        parseColorOptionName(colorOptionName)
                    )
                };
            })
            .filter(exclude(undefined));
    }

    return { parseColorDecision };
}
