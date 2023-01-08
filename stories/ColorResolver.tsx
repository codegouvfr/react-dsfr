import React, { useState } from "react";
import { Input } from "../dist/Input";
import { resolveColorHexCodeToDecision } from "../dist/fr/colorResolver";
import type { ColorDecision } from "../dist/fr/colorResolver";
import { useColors } from "../dist/useColors";

export function ColorResolver() {
    const [hexColorCode, setHexColorCode] = useState("#161616");

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
                hintText="Color code, starting by #"
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

    return (
        <div>
            <p>
                <span>CSS variable: </span>: {cssVarName}
            </p>
            <p>
                <span>Decision path: </span>{" "}
                <code>theme.decisions.{decisionObjectPath.join(".")}</code>
            </p>
            <p>Corresponding color option:</p>
            <p>
                <span>CSS variable: </span>: {option.cssVarName}
            </p>
            <p>
                <span>Option path: </span>{" "}
                <code>theme.options.{option.optionObjectPath.join(".")}</code>
            </p>

            {typeof option.color === "string" ? (
                <p>
                    <span>Colors: </span>: <ColoredSquare hexColorCode={option.color} />
                </p>
            ) : (
                <p>
                    <span>Colors: </span>:<span>Light: </span>
                    <ColoredSquare hexColorCode={option.color.light} />
                    <span>Dark: </span>
                    <ColoredSquare hexColorCode={option.color.dark} />
                </p>
            )}
        </div>
    );
}

function ColoredSquare(props: { hexColorCode: string }) {
    const { hexColorCode } = props;

    const theme = useColors();

    return (
        <>
            <span>{hexColorCode}</span>:
            <div
                style={{
                    "borderWidth": "2",
                    "borderStyle": "solid",
                    "borderColor": theme.decisions.border.default.grey.default,
                    "width": 30,
                    "height": 30,
                    "backgroundColor": hexColorCode
                }}
            />
        </>
    );
}
