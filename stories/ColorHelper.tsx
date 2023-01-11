import React, { useState, useEffect } from "react";
import { SearchBar } from "../dist/SearchBar";
import { colorDecisionAndCorrespondingOption } from "../dist/fr/generatedFromCss/colorDecisionAndCorrespondingOption";
import type { ColorDecisionAndCorrespondingOption } from "../src/scripts/build/cssToTs/colorDecisionsAndCorrespondingOption";
import { useColors } from "../dist/useColors";
import { fr } from "../dist/fr";
import { waitForDebounceFactory } from "./tools/waitForDebounce";
import { useConst } from "powerhooks/useConst";

/*
    let { hexColorCode } = params;

    hexColorCode = hexColorCode.toLowerCase();

    if (hexColorCode.length === 4) {
        hexColorCode = threeDigitColorHexToSixDigitsColorHex(hexColorCode);
    }

    const options = colorOptions
        .filter(({ color }) =>
            typeof color === "string"
                ? color === hexColorCode
                : color.dark === hexColorCode || color.light === hexColorCode
        )
        */


export function ColorHelper() {
    const [search, setSearch] = useState("");

    const { waitForDebounce } = useConst(() => waitForDebounceFactory({ "delay": 500 }));

    useEffect(
        ()=> {

            (async ()=> {

                await waitForDebounce();





            })();

        },
        [search]
    );

    return (
        <div>
            <SearchBar
                label="Hex color code, CSS variable name, 'background'..."
                nativeInputProps={{
                    "value": search,
                    "onChange": event=> setSearch(event.target.value)
                }}
            />
            {colorDecisionAndCorrespondingOption.map(entry=> )}

            {state === undefined &&
                resolveColorHexCodeToDecision({ hexColorCode }).map((colorDecision, i) => (
                    <ColorDecisionShowcase {...colorDecision} key={i} />
                ))}

        </div>
    );
}

function ColorDecisionShowcase(props: ColorDecision) {
    const { cssVarName, decisionObjectPath, option } = props;

    const theme = useColors();

    return (
        <div
            style={{
                "borderWidth": 2,
                "borderStyle": "solid",
                "borderColor": theme.decisions.border.default.grey.default,
                "boxShadow": "0px 6px 10px 0px rgba(0,0,0,0.07)",
                "padding": fr.spacing("4v"),
                "marginTop": fr.spacing("4v")
            }}
        >
            <h5>Color decision:</h5>
            <p>
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    CSS variable:{" "}
                </span>
                &nbsp;{cssVarName}
            </p>
            <p>
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    Decision path:{" "}
                </span>{" "}
                <code>
                    theme.decisions.<strong>{decisionObjectPath.join(".")}</strong>
                </code>
            </p>
            <h5>Corresponding color option:</h5>
            <p>
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    CSS variable:{" "}
                </span>
                : {option.cssVarName}
            </p>
            <p
                style={{
                    "marginBottom": 12
                }}
            >
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    Option path:{" "}
                </span>{" "}
                <code>
                    theme.options.<strong>{option.optionObjectPath.join(".")}</strong>
                </code>
            </p>

            {typeof option.color === "string" ? (
                <p>
                    <span>Colors: </span>: <ColoredSquare hexColorCode={option.color} />
                </p>
            ) : (
                <>
                    <span
                        style={{
                            "color": theme.decisions.text.mention.grey.default
                        }}
                    >
                        Dark mode:{" "}
                    </span>
                    <ColoredSquare hexColorCode={option.color.light} />
                    &nbsp; &nbsp;
                    <span
                        style={{
                            "color": theme.decisions.text.mention.grey.default
                        }}
                    >
                        Light mode:{" "}
                    </span>
                    <ColoredSquare hexColorCode={option.color.dark} />
                </>
            )}
        </div>
    );
}

function ColoredSquare(props: { hexColorCode: string }) {
    const { hexColorCode } = props;

    const theme = useColors();

    return (
        <div
            style={{
                display: "inline"
            }}
        >
            <code>{hexColorCode}</code>
            &nbsp;
            <div
                style={{
                    "display": "inline-block",
                    "borderWidth": 2,
                    "borderStyle": "solid",
                    "borderColor": theme.decisions.border.default.grey.default,
                    "width": 30,
                    "height": 30,
                    "backgroundColor": hexColorCode,
                    "position": "relative",
                    "top": 8
                }}
            />
        </div>
    );
}
