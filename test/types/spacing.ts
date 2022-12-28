import { spacing } from "../../src/fr/spacing";
import { assert } from "tsafe/assert";
import { Equals } from "tsafe";

{
    const got = spacing("margin", { "topBottom": 4 });

    type Expected = {
        marginTop: number;
        marginBottom: number;
    };

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("margin", { "topBottom": "1v" });

    type Expected = {
        marginTop: "0.25rem";
        marginBottom: "0.25rem";
    };

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("margin", { "topBottom": "1v", "rightLeft": 33 });

    type Expected = {
        marginTop: "0.25rem";
        marginBottom: "0.25rem";
        marginLeft: number;
        marginRight: number;
    };

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("margin", { "topBottom": "1v", "rightLeft": 33 });

    type Expected = {
        marginTop: "0.25rem";
        marginBottom: "0.25rem";
        marginLeft: number;
        marginRight: number;
    };

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("margin", { "bottom": "1v" });

    type Expected = {
        marginBottom: "0.25rem";
    };

    assert<Equals<typeof got, Expected>>();
}

{
    const got = spacing("padding", { "bottom": "1v", "rightLeft": 42 });

    type Expected = {
        paddingRight: number;
        paddingLeft: number;
        paddingBottom: "0.25rem";
    };

    assert<Equals<typeof got, Expected>>();
}
