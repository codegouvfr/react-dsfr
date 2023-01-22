"use client";

import React, { memo, useState, useEffect, useRef, ReactNode } from "react";
import type { ForwardedRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { createComponentI18nApi } from "./i18n";

export type NoticeProps = {
    className?: string;
    ref?: ForwardedRef<HTMLDivElement>;
    classes?: Partial<Record<"root" | "title" | "close", string>>;
    title: NonNullable<ReactNode>;
} & (NoticeProps.NonClosable | NoticeProps.Closable);

export namespace NoticeProps {
    export type NonClosable = {
        isClosable?: false;
        isClosed?: undefined;
        onClose?: undefined;
    };

    export type Closable = {
        isClosable: true;
    } & (Closable.Controlled | Closable.Uncontrolled);

    export namespace Closable {
        export type Controlled = {
            isClosed: boolean;
            onClose: () => void;
        };

        export type Uncontrolled = {
            isClosed?: undefined;
            onClose?: () => void;
        };
    }
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-notice> */
export const Notice = memo((props: NoticeProps) => {
    const {
        className,
        classes = {},
        title,
        isClosable = false,
        isClosed: props_isClosed,
        onClose,
        ref,
        ...rest
    } = props;

    assert<Equals<keyof typeof rest, never>>();

    const [isClosed, setIsClosed] = useState(props_isClosed ?? false);

    const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null);

    const refShouldButtonGetFocus = useRef(false);
    const refShouldSetRole = useRef(false);

    useEffect(() => {
        if (props_isClosed === undefined) {
            return;
        }
        setIsClosed((isClosed: boolean) => {
            if (isClosed && !props_isClosed) {
                refShouldButtonGetFocus.current = true;
                refShouldSetRole.current = true;
            }

            return props_isClosed;
        });
    }, [props_isClosed]);

    useEffect(() => {
        if (!refShouldButtonGetFocus.current) {
            return;
        }

        if (buttonElement === null) {
            //NOTE: This should not be reachable
            return;
        }

        refShouldButtonGetFocus.current = false;
        buttonElement.focus();
    }, [buttonElement]);

    const onCloseButtonClick = useConstCallback(() => {
        if (props_isClosed === undefined) {
            //Uncontrolled
            setIsClosed(true);
            onClose?.();
        } else {
            //Controlled
            onClose();
        }
    });

    const { t } = useTranslation();

    if (isClosed) {
        return null;
    }

    return (
        <div
            className={cx(fr.cx("fr-notice", `fr-notice--info`), classes.root, className)}
            {...(refShouldSetRole.current && { "role": "notice" })}
            ref={ref}
        >
            <div className="fr-container">
                <div className="fr-notice__body">
                    <p className={classes.title}>{title}</p>
                    {/* TODO: Use our button once we have one */}
                    {isClosable && (
                        <button
                            ref={setButtonElement}
                            className={cx(fr.cx("fr-btn--close", "fr-btn"), classes.close)}
                            onClick={onCloseButtonClick}
                        >
                            {t("hide message")}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
});

Notice.displayName = symToStr({ Notice });

export default Notice;

const { useTranslation, addNoticeTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Notice }),
    "frMessages": {
        /* spell-checker: disable */
        "hide message": "Masquer le message"
        /* spell-checker: enable */
    }
});

addNoticeTranslations({
    "lang": "en",
    "messages": {
        "hide message": "Hide the message"
    }
});

addNoticeTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "hide message": "Occultar el mesage"
        /* spell-checker: enable */
    }
});

export { addNoticeTranslations };
