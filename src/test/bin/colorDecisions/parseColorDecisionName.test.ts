import { createParseColorDecisionName } from "../../../bin/css_to_ts/colorDecisions";
import type { ParsedColorDecisionName } from "../../../bin/css_to_ts/colorDecisions";
import { assert } from "tsafe/assert";
import { same } from "evt/tools/inDepth/same";

console.log(`Running test ${__filename}`);

const colorNames = ["grey", "orangeTerreBattue"];

const { parseColorDecisionName } = createParseColorDecisionName({ colorNames });

{
    const expected: ParsedColorDecisionName = {
        "context": "background",
        "usage": "default",
        "variant": undefined,
        "colorName": "grey",
        "state": "hover"
    };

    const got = parseColorDecisionName("--background-default-grey-hover");

    assert(same(got, expected));

    console.log("PASS 1");
}

{
    const expected: ParsedColorDecisionName = {
        "context": "background",
        "usage": "default",
        "variant": undefined,
        "colorName": "grey",
        "state": undefined
    };

    const got = parseColorDecisionName("--background-default-grey");

    assert(same(got, expected));

    console.log("PASS 2");
}

{
    const expected: ParsedColorDecisionName = {
        "context": "border",
        "usage": "action",
        "variant": "low",
        "colorName": "orangeTerreBattue",
        "state": undefined
    };

    const got = parseColorDecisionName("--border-action-low-orange-terre-battue");

    assert(same(got, expected));

    console.log("PASS 3");
}

{
    const expected: ParsedColorDecisionName = {
        "context": "background",
        "usage": "altRaised",
        "variant": undefined,
        "colorName": "grey",
        "state": "hover"
    };

    const got = parseColorDecisionName("--background-alt-raised-grey-hover");

    assert(same(got, expected));

    console.log("PASS 4");
}

{
    const expected: ParsedColorDecisionName = {
        "context": "background",
        "usage": "contrastOverlap",
        "variant": undefined,
        "colorName": "grey",
        "state": undefined
    };

    const got = parseColorDecisionName("--background-contrast-overlap-grey");

    assert(same(got, expected));

    console.log("PASS 5");
}
