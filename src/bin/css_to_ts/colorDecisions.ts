import type { State } from "./colorOptions";

//export type Context= "background" | "border" | "text" | "illustration";

//export type Usage = "action" |
//"active" | "disabled" | "error" | "success"  |
//"default" | "title" | "label" | "contrast";

//export type Usage = "default" | "alt";

//Not in path
//export type Variant = "high" | "low";

const contexts = ["background", "text", "border", "artwork"] as const;

type Context = typeof contexts[number];

const usages = [
    "default",
    "alt",
    "contrast",
    "flat",
    "action",
    "active",
    "open",
    "disabled",
    "raised",
    "altRaised",
    "altOverlap",
    "contrastRaised"
] as const;

//type Usage = typeof usages[number];

export type ParsedColorDecisionName = {
    context: Context;
    usage: string; //Usage In reality use string because it's susceptible to change.
    variant: "high" | "low" | undefined;
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

    function parseColorDecisionName(desicsionName: `--${string}`): ParsedColorDecisionName {
        return null as any;
    }

    return { parseColorDecisionName };
}
