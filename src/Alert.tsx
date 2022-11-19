import React, { memo, forwardRef, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { FrClassName } from "./lib/generatedFromCss/classNames";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { useConstCallback } from "./lib/tools/powerhooks/useConstCallback";
import { createComponentI18nApi } from "./lib/i18n";
// We make users import dsfr.css so we don't need to import the scoped CSS
// but in the future if we have a complete component coverage it
// we could stop requiring users to import the hole CSS and only import on a
// per component basis.
import "./dsfr/component/alert/alert.css";

export type AlertProps = {
    className?: string;
    severity: AlertProps.Severity;
    /** Default h3 */
    as?: `h${2 | 3 | 4 | 5 | 6}`;
    classes?: Partial<Record<"root" | "title" | "description" | "close", string>>;
} & (AlertProps.Md | AlertProps.Sm) &
    (AlertProps.NonClosable | AlertProps.Closable);

export namespace AlertProps {
    export type Md = {
        isSmall?: false;
        title: NonNullable<ReactNode>;
        description?: NonNullable<ReactNode>;
    };

    export type Sm = {
        isSmall: true;
        title?: NonNullable<ReactNode>;
        description: NonNullable<ReactNode>;
    };

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

    type ExtractSeverity<FrClassName> = FrClassName extends `fr-alert--${infer Severity}`
        ? Exclude<Severity, "sm">
        : never;

    export type Severity = ExtractSeverity<FrClassName>;
}

/** @see <https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/alerte> */
export const Alert = memo(
    forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
        const {
            className,
            severity,
            as: HtmlTitleTag = "h3",
            classes = {},
            isSmall,
            title,
            description,
            isClosable = false,
            isClosed: props_isClosed,
            onClose,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const [isClosed, setIsClosed] = useState(props_isClosed ?? false);

        const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null);

        const refShouldButtonGetFocus = useRef<boolean>(false);

        useEffect(() => {
            if (props_isClosed === undefined) {
                return;
            }
            setIsClosed(isClosed => {
                if (isClosed && !props_isClosed) {
                    refShouldButtonGetFocus.current = true;
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
                className={cx(
                    fr.cx("fr-alert", `fr-alert--${severity}`, { "fr-alert--sm": isSmall }),
                    classes.root,
                    className
                )}
                ref={ref}
                {...rest}
            >
                <HtmlTitleTag className={cx(fr.cx("fr-alert__title"), classes.title)}>
                    {title}
                </HtmlTitleTag>
                <p className={classes.description}>{description}</p>
                {/* TODO: Use our button once we have one */}
                {isClosable && (
                    <button
                        ref={setButtonElement}
                        className={cx(fr.cx("fr-link--close", "fr-link"), classes.close)}
                        onClick={onCloseButtonClick}
                    >
                        {t("hide message")}
                    </button>
                )}
            </div>
        );
    })
);

Alert.displayName = symToStr({ Alert });

export default Alert;

const { useTranslation, addAlertTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Alert }),
    "frMessages": {
        /* spell-checker: disable */
        "hide message": "Masquer le message"
        /* spell-checker: enable */
    }
});

addAlertTranslations({
    "lang": "en",
    "messages": {
        "hide message": "Hide the message"
    }
});

addAlertTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "hide message": "Occultar el mesage"
        /* spell-checker: enable */
    }
});

export { addAlertTranslations };
