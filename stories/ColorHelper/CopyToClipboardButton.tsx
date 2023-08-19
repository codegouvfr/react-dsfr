import React, { useState, useEffect } from "react";
import { Button } from "../../dist/Button";
import { useStyles } from "tss-react";
import { fr } from "../../dist";
import { assert } from "tsafe/assert";
import { type NonPostableEvt } from "evt";
import { useEvt } from "evt/hooks";

type Props = {
    className?: string;
    textToCopy: string;
    evtAction: NonPostableEvt<"trigger click">;
};

export function CopyToClipboardButton(props: Props) {
    const { className, textToCopy, evtAction } = props;

    const { css, cx } = useStyles();

    const [isCopiedFeedbackShown, setIsCopiedFeedbackShown] = useState(false);

    const onButtonClick = () => {
        copyToClipboard(textToCopy);
        setIsCopiedFeedbackShown(true);
    };

    useEvt(
        ctx => {
            evtAction.attach(
                action => action === "trigger click",
                ctx,
                () => onButtonClick()
            );
        },
        [evtAction]
    );

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
                            css({ "color": fr.colors.decisions.text.default.success.default })
                        )}
                    />
                    <span
                        className={css({
                            [fr.breakpoints.down("lg")]: {
                                "display": "none"
                            }
                        })}
                    >
                        &nbsp; Path copied!
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
                    onClick={onButtonClick}
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
        document.body.prepend(textArea);
        //textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand("copy");
            assert(!!successful);
        } catch (err) {
            alert("Unable to copy value , error : " + (err as Error).message);
        }

        document.body.removeChild(textArea);
    });
};
