"use client";

import React, { CSSProperties, ReactNode, forwardRef, memo } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { symToStr } from "tsafe/symToStr";
import { CxArg } from "tss-react";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";
import { getLink, RegisteredLinkProps } from "./link";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type ShareProps = {
    id?: string;
    className?: string;
    classes?: Partial<
        Record<"root" | "title" | "text" | "buttons-group" | "buttons-group-item" | "button", CxArg>
    >;
    style?: CSSProperties;
    title?: ReactNode;
    text?: ReactNode;
    buttons: [ShareProps.Button, ...ShareProps.Button[]];
};

export namespace ShareProps {
    export type Type = "facebook" | "twitter-x" | "linkedin" | "mail" | "copy";

    export type CommonButton = {
        type: Type;
        children?: ReactNode;
    };

    export type LinkButton = CommonButton & {
        linkProps: RegisteredLinkProps;
        disabled?: boolean;
        buttonProps?: never;
    };

    export type NativeButton = CommonButton & {
        buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
        linkProps?: never;
        disabled?: never;
    };

    export type Button = LinkButton | NativeButton;
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-share> */
export const Share = memo(
    forwardRef<HTMLDivElement, ShareProps>((props, ref) => {
        const { t } = useTranslation();

        const {
            id: id_props,
            className,
            classes = {},
            style,
            title = t("share this page"),
            text,
            buttons,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = getLink();

        const id = useAnalyticsId({
            defaultIdPrefix: "fr-share",
            explicitlyProvidedId: id_props
        });

        return (
            <div
                id={id}
                ref={ref}
                className={cx(fr.cx("fr-share"), classes.root, className)}
                style={style}
            >
                <p className={cx(fr.cx("fr-share__title"), classes.title)}>{title}</p>

                {text !== undefined && (
                    <p className={cx(fr.cx("fr-share__text"), classes.text)}>{text}</p>
                )}

                <ul className={cx(fr.cx("fr-btns-group"), classes["buttons-group"])}>
                    {buttons.map((button, i) => {
                        const buttonLabel = button.children ?? t(button.type);

                        return (
                            <li key={i} className={cx(classes["buttons-group-item"])}>
                                {button.buttonProps !== undefined
                                    ? (() => {
                                          const { buttonProps } = button;

                                          return (
                                              <button
                                                  {...buttonProps}
                                                  className={cx(
                                                      fr.cx("fr-btn", `fr-btn--${button.type}`),
                                                      classes.button,
                                                      buttonProps.className
                                                  )}
                                              >
                                                  {buttonLabel}
                                              </button>
                                          );
                                      })()
                                    : (() => {
                                          const {
                                              target = button.type === "mail"
                                                  ? undefined
                                                  : "_blank",
                                              rel = target === "_blank"
                                                  ? "noopener external"
                                                  : undefined,
                                              title = target === "_blank"
                                                  ? `${buttonLabelToString(buttonLabel)} - ${t(
                                                        "new window"
                                                    )}`
                                                  : undefined,
                                              ...restLinkProps
                                          } = button.linkProps;

                                          return (
                                              <Link
                                                  {...restLinkProps}
                                                  target={target}
                                                  rel={rel}
                                                  title={title}
                                                  role={button.disabled ? "link" : undefined}
                                                  aria-disabled={button.disabled || undefined}
                                                  onClick={
                                                      button.disabled
                                                          ? event => {
                                                                event.preventDefault();
                                                                (
                                                                    button.linkProps as RegisteredLinkProps & {
                                                                        onClick?: (
                                                                            event: React.MouseEvent
                                                                        ) => void;
                                                                    }
                                                                ).onClick?.(event);
                                                            }
                                                          : (
                                                                button.linkProps as RegisteredLinkProps & {
                                                                    onClick?: (
                                                                        event: React.MouseEvent
                                                                    ) => void;
                                                                }
                                                            ).onClick
                                                  }
                                                  className={cx(
                                                      fr.cx("fr-btn", `fr-btn--${button.type}`),
                                                      classes.button,
                                                      button.linkProps.className
                                                  )}
                                              >
                                                  {buttonLabel}
                                              </Link>
                                          );
                                      })()}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    })
);

Share.displayName = symToStr({ Share });

export default Share;

function buttonLabelToString(label: ReactNode): string {
    if (typeof label === "string") {
        return label;
    }

    if (typeof label === "number") {
        return `${label}`;
    }

    return "";
}

const { useTranslation, addShareTranslations } = createComponentI18nApi({
    componentName: symToStr({ Share }),
    frMessages: {
        "share this page": "Partager la page",
        "new window": "nouvelle fenetre",
        "facebook": "Partager sur Facebook",
        "twitter-x": "Partager sur X (anciennement Twitter)",
        "linkedin": "Partager sur LinkedIn",
        "mail": "Partager par email",
        "copy": "Copier dans le presse-papier"
    }
});

addShareTranslations({
    lang: "en",
    messages: {
        "share this page": "Share this page",
        "new window": "new window",
        "facebook": "Share on Facebook",
        "twitter-x": "Share on X (formerly Twitter)",
        "linkedin": "Share on LinkedIn",
        "mail": "Share by email",
        "copy": "Copy to clipboard"
    }
});

export { addShareTranslations };
