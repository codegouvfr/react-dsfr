import React from "react";
import type { ColorDecisionAndCorrespondingOption } from "../../src/scripts/build/cssToTs/colorDecisionAndCorrespondingOptions";
import { useColors } from "../../dist/useColors";
import { fr } from "../../dist/fr";
import Tooltip from "@mui/material/Tooltip";
import { useStyles } from "./makeStyles";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export function ColorDecisionCard(
    props: { className?: string } & ColorDecisionAndCorrespondingOption
) {
    const { className, colorDecisionName, themePath, colorOption } = props;

    const theme = useColors();

    const { cx, css } = useStyles();

    return (
        <div
            className={cx(
                css({
                    "borderWidth": 2,
                    "borderStyle": "solid",
                    "borderColor": theme.decisions.border.default.grey.default,
                    "&:hover": {
                        "borderColor": theme.decisions.border.plain.grey.default
                    },
                    "boxShadow": "0px 6px 10px 0px rgba(0,0,0,0.07)",
                    "padding": fr.spacing("4v")
                }),
                className
            )}
        >
            <div>
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    CSS variable:{" "}
                </span>
                &nbsp;<code>{colorDecisionName}</code>
            </div>
            <div style={{ "marginTop": fr.spacing("3v") }}>
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    Decision path{" "}
                    <Tooltip
                        title={
                            <a
                                href="https://react-dsfr.etalab.studio/css-in-js#colors"
                                target="_blank"
                            >
                                How to access the <code>theme</code> object
                            </a>
                        }
                        placement="top"
                        arrow
                    >
                        <i className={fr.cx("ri-information-line")} />
                    </Tooltip>{" "}
                    :
                </span>{" "}
                <code>
                    theme.decisions.<strong>{themePath.join(".")}</strong>
                </code>
                <CopyToClipboardButton
                    textToCopy={["theme", "decisions", ...themePath].join(".")}
                />
            </div>

            <div style={{ "marginTop": fr.spacing("2v") }}>
                {typeof colorOption.color === "string" ? (
                    <>
                        <span>Colors: </span>: <ColoredSquare hexColorCode={colorOption.color} />
                    </>
                ) : (
                    <>
                        <span
                            style={{
                                "color": theme.decisions.text.mention.grey.default
                            }}
                        >
                            Dark mode:{" "}
                        </span>
                        <ColoredSquare hexColorCode={colorOption.color.dark} />
                        &nbsp; &nbsp;
                        <span
                            style={{
                                "color": theme.decisions.text.mention.grey.default
                            }}
                        >
                            Light mode:{" "}
                        </span>
                        <ColoredSquare hexColorCode={colorOption.color.light} />
                    </>
                )}
            </div>

            {/*
            <h6>Corresponding color option:</h6>
            <p>
                <span
                    style={{
                        "color": theme.decisions.text.mention.grey.default
                    }}
                >
                    CSS variable:{" "}
                </span>
                : {colorOption.colorOptionName}
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
                    theme.options.<strong>{colorOption.themePath.join(".")}</strong>
                </code>
            </p>
                */}
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
