import React, { useState, useEffect } from "react";
import { Button } from "../../dist/Button";
import { useStyles } from "./makeStyles";
import { fr } from "../../dist";
import { assert } from "tsafe/assert";

type Props = {
    className?: string;
    textToCopy: string;
};

export function CopyToClipboardButton(props: Props) {
    const { className, textToCopy } = props;

    const { css, cx, theme } = useStyles();

    const [isCopiedFeedbackShown, setIsCopiedFeedbackShown] = useState(false);

    useEffect(() => {
        if (!isCopiedFeedbackShown) {
            return;
        }

        const timer = setTimeout(() => {
            setIsCopiedFeedbackShown(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [isCopiedFeedbackShown]);

    return (
        <div
            className={cx(
                css({
                    "position": "relative",
                    "display": "inline-block",
                    "marginLeft": fr.spacing("4v")
                }),
                className
            )}
        >
            {isCopiedFeedbackShown ? (
                <p className={css({ "margin": 0 })}>
                    <i
                        className={cx(
                            fr.cx("fr-icon-check-line"),
                            css({ "color": theme.decisions.text.default.success.default })
                        )}
                    />
                    <span
                        className={css({
                            [fr.breakpoints.down("lg")]: {
                                "display": "none"
                            }
                        })}
                    >
                        &nbsp; Copied to clipboard!
                    </span>
                </p>
            ) : (
                <Button
                    className={css({
                        "position": "absolute",
                        "top": -25
                    })}
                    iconId={"ri-clipboard-line"}
                    priority="tertiary no outline"
                    title="Copy to clipboard"
                    onClick={() => {
                        copyToClipboard(textToCopy);
                        setIsCopiedFeedbackShown(true);
                    }}
                />
            )}
        </div>
    );
}

const copyToClipboard = (str: string) => {
    Promise.resolve().then(() => {
        const textArea = document.createElement("textarea");
        textArea.value = str;
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        //textArea.focus();
        //textArea.select();
        try {
            const successful = document.execCommand("copy");
            assert(!!successful);
        } catch (err) {
            alert("Unable to copy value , error : " + (err as Error).message);
        }

        document.body.removeChild(textArea);
    });
};
