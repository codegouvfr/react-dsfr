import React, { useState } from "react";
import { Input } from "../dist/Input";
import { resolveColorHexCodeToDecision } from "../dist/fr/colorResolver";
import type { ColorDecision } from "../dist/fr/colorResolver";
import { useColors } from "../dist/useColors";
import { fr } from "../dist";

export function ColorResolver() {
    const [hexColorCode, setHexColorCode] = useState("#C9191E");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setHexColorCode(event.target.value);

    const state =
        hexColorCode === ""
            ? undefined
            : /^#[0-9A-F]+/.test(hexColorCode.toUpperCase())
            ? undefined
            : "error";

    return (
        <div>
            <Input
                label="Hex color code"
                hintText="A color that you know belongs to the DSFR pallet"
                nativeInputProps={{
                    "value": hexColorCode,
                    onChange
                }}
                state={state}
                stateRelatedMessage={state === "error" ? "This isn't a valid hex color" : undefined}
            />
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
