"use client";

import React, {
    memo,
    forwardRef,
    useState,
    useEffect,
    useRef,
    type ReactNode,
    type CSSProperties
} from "react";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { createComponentI18nApi } from "./i18n";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type AlertProps = {
    className?: string;
    id?: string;
    severity: AlertProps.Severity;
    /** Default h3 */
    as?: `h${2 | 3 | 4 | 5 | 6}`;
    classes?: Partial<Record<"root" | "title" | "description" | "close", string>>;
    style?: CSSProperties;

    /** Display the cross icon (understand isClosableByUser) */
    closable?: boolean;
    /** To provide if you want the Alert to be controlled */
    isClosed?: boolean;
    role?: "alert" | "status";
    onClose?: () => void;
} & (AlertProps.DefaultSize | AlertProps.Small);

export namespace AlertProps {
    export type DefaultSize = {
        /** Default false */
        small?: false;
        title: NonNullable<ReactNode>;
        description?: NonNullable<ReactNode>;
    };

    export type Small = {
        /** Default false */
        small: true;
        title?: NonNullable<ReactNode>;
        description: NonNullable<ReactNode>;
    };

    type ExtractSeverity<FrClassName> = FrClassName extends `fr-alert--${infer Severity}`
        ? Exclude<Severity, "sm">
        : never;

    export type Severity = ExtractSeverity<FrClassName>;
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-alert> */
export const Alert = memo(
    forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
        const {
            className,
            id: id_props,
            severity,
            as: HtmlTitleTag = "h3",
            classes = {},
            style,
            small: isSmall,
            title,
            description,
            closable: isClosableByUser = false,
            isClosed: props_isClosed,
            onClose,
            role = "alert",
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "explicitlyProvidedId": id_props,
            "defaultIdPrefix": "fr-alert"
        });

        const [isClosed, setIsClosed] = useState(props_isClosed ?? false);

        const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null);

        const refShouldButtonGetFocus = useRef(false);
        const refShouldSetRole = useRef(false);
        const DescriptionTag = typeof description === "string" ? "p" : "div";

        useEffect(() => {
            if (props_isClosed === undefined) {
                return;
            }
            setIsClosed(isClosed => {
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
                onClose?.();
            }
        });

        const { t } = useTranslation();

        if (isClosed) {
            return null;
        }

        return (
            <div
                id={id}
                className={cx(
                    fr.cx("fr-alert", `fr-alert--${severity}`, { "fr-alert--sm": isSmall }),
                    classes.root,
                    className
                )}
                style={style}
                {...(refShouldSetRole.current && { "role": role })}
                ref={ref}
                {...rest}
            >
                {title !== undefined && (
                    <HtmlTitleTag className={cx(fr.cx("fr-alert__title"), classes.title)}>
                        {title}
                    </HtmlTitleTag>
                )}
                <DescriptionTag className={classes.description}>{description}</DescriptionTag>
                {isClosableByUser && (
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
