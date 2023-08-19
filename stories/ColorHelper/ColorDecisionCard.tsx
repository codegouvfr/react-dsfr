import React from "react";
import type { ColorDecisionAndCorrespondingOption } from "../../scripts/build/cssToTs/colorDecisionAndCorrespondingOptions";
import { fr } from "../../dist/fr";
import Tooltip from "@mui/material/Tooltip";
import { useStyles } from "tss-react";
import { CopyToClipboardButton } from "./CopyToClipboardButton";
import { Accordion } from "../../dist/Accordion";
import { Evt } from "evt";
import { useConst } from "powerhooks/useConst";

export function ColorDecisionCard(
    props: { className?: string } & ColorDecisionAndCorrespondingOption
) {
    const { className, colorDecisionName, themePath, colorOption } = props;

    const { cx, css } = useStyles();

    const evtCopyToClipboardButtonAction = useConst(() => Evt.create<"trigger click">());

    return (
        <div
            className={cx(
                css({
                    "borderWidth": 2,
                    "borderStyle": "solid",
                    "borderColor": fr.colors.decisions.border.default.grey.default,
                    "&:hover": {
                        "borderColor": fr.colors.decisions.border.plain.grey.default
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
                        "color": fr.colors.decisions.text.mention.grey.default
                    }}
                >
                    Color Decision path :
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <code>
                    <Tooltip
                        classes={{
                            tooltip: css({
                                "maxWidth": "none"
                            })
                        }}
                        title={
                            <code
                                style={{
                                    "fontSize": "1.7em"
                                }}
                            >
                                var({colorDecisionName})
                            </code>
                        }
                        placement="top-end"
                    >
                        <span
                            style={{ "display": "inline-block", "cursor": "pointer" }}
                            onClick={() => evtCopyToClipboardButtonAction.post("trigger click")}
                        >
                            fr.colors.decisions.<strong>{themePath.join(".")}</strong>
                        </span>
                    </Tooltip>
                </code>
                <CopyToClipboardButton
                    textToCopy={["fr", "colors", "decisions", ...themePath].join(".")}
                    evtAction={evtCopyToClipboardButtonAction}
                />
            </div>
            <div
                style={{
                    "marginTop": fr.spacing("3v")
                }}
            >
                <span
                    style={{
                        "color": fr.colors.decisions.text.mention.grey.default
                    }}
                >
                    CSS variable name:
                </span>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <code>{colorDecisionName}</code>
            </div>

            <div style={{ "marginTop": fr.spacing("2v") }}>
                {typeof colorOption.color === "string" ? (
                    <>
                        <span
                            style={{
                                "color": fr.colors.decisions.text.mention.grey.default
                            }}
                        >
                            Hex color code: &nbsp;
                            <Tooltip
                                title={
                                    "This decision resolve the the same hex color code in both dark and light mode"
                                }
                                placement="top"
                                arrow
                            >
                                <i className={fr.cx("ri-information-line")} />
                            </Tooltip>
                        </span>
                        &nbsp; &nbsp; &nbsp;
                        <ColoredSquare
                            hexColorCode={colorOption.color}
                            isDark={false}
                            themePath={themePath}
                        />
                    </>
                ) : (
                    <>
                        <span
                            style={{
                                "color": fr.colors.decisions.text.mention.grey.default,
                                "marginRight": 2
                            }}
                        >
                            Dark mode:
                        </span>
                        &nbsp; &nbsp;
                        <ColoredSquare
                            hexColorCode={colorOption.color.dark}
                            themePath={themePath}
                            isDark={true}
                        />
                        <br />
                        <span
                            style={{
                                "display": "inline-block",
                                "color": fr.colors.decisions.text.mention.grey.default,
                                "marginTop": fr.spacing("5v")
                            }}
                        >
                            Light mode:
                        </span>
                        &nbsp; &nbsp;
                        <ColoredSquare
                            hexColorCode={colorOption.color.light}
                            themePath={themePath}
                            isDark={false}
                        />
                    </>
                )}
            </div>
            <Accordion
                className={css({ "marginTop": fr.spacing("5v") })}
                label="Corresponding color option"
            >
                <p>
                    <span
                        style={{
                            "color": fr.colors.decisions.text.mention.grey.default
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
                            "color": fr.colors.decisions.text.mention.grey.default
                        }}
                    >
                        Option path:{" "}
                    </span>{" "}
                    <code>
                        fr.colors.options.<strong>{colorOption.themePath.join(".")}</strong>
                    </code>
                </p>
            </Accordion>
        </div>
    );
}

function ColoredSquare(props: {
    hexColorCode: string;
    themePath: readonly string[];
    isDark: boolean;
}) {
    const { hexColorCode, themePath, isDark } = props;

    const { css } = useStyles();

    const evtCopyToClipboardButtonAction = useConst(() => Evt.create<"trigger click">());

    const codeToGetHex = `fr.colors.getHex({ isDark: ${
        isDark ? "true" : "false"
    } }).decisions${themePath.join(".")}`;

    return (
        <Tooltip
            classes={{
                tooltip: css({
                    "maxWidth": "none"
                })
            }}
            title={
                <code
                    style={{
                        "fontSize": "1.5em"
                    }}
                >
                    {codeToGetHex}
                </code>
            }
            placement="top"
            arrow
        >
            <div style={{ "display": "inline-block" }}>
                <div
                    style={{
                        display: "inline-block"
                    }}
                    onClick={() => evtCopyToClipboardButtonAction.post("trigger click")}
                >
                    <div
                        style={{
                            "display": "inline-block",
                            "borderWidth": 2,
                            "borderStyle": "solid",
                            "borderColor": fr.colors.decisions.border.default.grey.default,
                            "width": 30,
                            "height": 30,
                            "backgroundColor": hexColorCode,
                            "position": "relative",
                            "top": 8
                        }}
                    />
                    &nbsp; &nbsp;
                    <code>{hexColorCode}</code>
                </div>

                <CopyToClipboardButton
                    textToCopy={codeToGetHex}
                    evtAction={evtCopyToClipboardButtonAction}
                />
            </div>
        </Tooltip>
    );
}
