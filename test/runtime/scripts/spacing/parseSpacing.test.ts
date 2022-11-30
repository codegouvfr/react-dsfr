import { it, expect } from "vitest";
import { parseSpacing } from "../../../../src/scripts/build/cssToTs/spacing";
import type { SpacingTokenAndValue } from "../../../../src/scripts/build/cssToTs/spacing";

it("Parse spacing successfully", () => {
    const input = `
.fr-m-7v {
  margin: 1.75rem !important;
}

.fr-m-12v,
.fr-m-6w {
  margin: 3rem !important;
}

@media (min-width: 36em) { }

@media (min-width: 48em) { }

@media (min-width: 62em) { }

@media (min-width: 78em) { }
`;

    const expected: SpacingTokenAndValue[] = [
        {
            "token": "7v",
            "value": "1.75rem"
        },
        {
            "token": "12v",
            "value": "3rem"
        },
        {
            "token": "6w",
            "value": "3rem"
        }
    ];

    const got = parseSpacing(input);

    expect(got).toStrictEqual(expected);
});
