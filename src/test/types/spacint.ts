import { spacing } from "../../lib/spacing";
import { assert } from "tsafe/assert";
import { Equals } from "tsafe";

{
    const got = spacing("margin", { "topBottom": "1v" });

    type Expected = Record<"topMargin" | "bottomMargin", "0.25rem">;

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("margin", { "topBottom": "1v" });

    type Expected = Record<"topMargin" | "bottomMargin", "0.25rem">;

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("margin", { "topBottom": "1v", "rightLeft": 33 });

    type Expected = Record<"topMargin" | "bottomMargin", "0.25rem"> &
        Record<"leftMargin" | "rightMargin", number>;

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("margin", { "topBottom": "1v", "rightLeft": 33 });

    type Expected = Record<"topMargin" | "bottomMargin", "0.25rem"> &
        Record<"leftMargin" | "rightMargin", number>;

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("margin", { "bottom": "1v" });

    type Expected = Record<"bottomMargin", "0.25rem">;

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("padding", { "bottom": "1v", "rightLeft": 42 });

    type Expected = Record<"rightPadding" | "leftPadding", number> &
        Record<"bottomPadding", "0.25rem">;

    assert<Equals<typeof got, Expected>>();
}
