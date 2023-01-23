import React, { memo, ForwardedRef } from "react";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import type { ReactNode } from "react";
import { Equals, assert } from "tsafe";
import { createComponentI18nApi } from "./i18n";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import { symToStr } from "tsafe/symToStr";
import Button, { ButtonProps } from "./Button";

export function createOpenModalButtonProps(id: string): ButtonProps {
    return {
        "onClick": () => {
            /* nothing */
        },
        "nativeButtonProps": {
            "aria-controls": id,
            "data-fr-opened": "false"
        }
    };
}

export type ModalProps = ModalProps.Common &
    (ModalProps.WithTitleIcon | ModalProps.WithoutTitleIcon) &
    (ModalProps.WithAction | ModalProps.WithoutAction);
export namespace ModalProps {
    export type Common = {
        className?: string;
        size?: "small" | "medium" | "large";
        id: string;
        title: ReactNode;
        children: ReactNode;
        concealingBackdrop?: boolean;
        topAnchor?: boolean;
        ref?: ForwardedRef<HTMLDialogElement>;
    };

    export type WithTitleIcon = {
        iconId: FrIconClassName | RiIconClassName;
    };

    export type WithoutTitleIcon = {
        iconId?: never;
    };

    export type WithAction = {
        actionArea: [ButtonProps, ...ButtonProps[]];
    };

    export type WithoutAction = {
        actionArea?: never;
    };
}

/** @see <> add doc url */
export const Modal = memo((props: ModalProps) => {
    const {
        className,
        id,
        title,
        children,
        concealingBackdrop = true,
        topAnchor = false,
        ref,
        iconId,
        actionArea,
        size = "medium",
        ...rest
    } = props;

    assert<Equals<keyof typeof rest, never>>();

    const { t } = useTranslation();

    return (
        <dialog
            aria-labelledby="fr-modal-title-modal-1"
            role="dialog"
            id={id}
            className={cx(fr.cx("fr-modal", topAnchor && "fr-modal--top"), className)}
            ref={ref}
            data-fr-concealing-backdrop={concealingBackdrop}
        >
            <div className={fr.cx("fr-container", "fr-container--fluid", "fr-container-md")}>
                <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
                    <div
                        className={(() => {
                            switch (size) {
                                case "large":
                                    return fr.cx("fr-col-12", "fr-col-md-10", "fr-col-lg-8");
                                case "small":
                                    return fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4");
                                case "medium":
                                    return fr.cx("fr-col-12", "fr-col-md-8", "fr-col-lg-6");
                            }
                        })()}
                    >
                        <div className={fr.cx("fr-modal__body")}>
                            <div className={fr.cx("fr-modal__header")}>
                                <button
                                    className={fr.cx("fr-link--close", "fr-link")}
                                    title={t("close")}
                                    aria-controls={id}
                                >
                                    {t("close")}
                                </button>
                            </div>
                            <div className={fr.cx("fr-modal__content")}>
                                <h1
                                    id="fr-modal-title-modal-1"
                                    className={fr.cx("fr-modal__title")}
                                >
                                    {iconId !== undefined && (
                                        <span className={fr.cx(iconId, "fr-fi--lg")} />
                                    )}
                                    {title}
                                </h1>
                                {children}
                            </div>
                            {actionArea !== undefined && (
                                <div className="fr-modal__footer">
                                    <ul
                                        className={fr.cx(
                                            "fr-btns-group",
                                            "fr-btns-group--right",
                                            "fr-btns-group--inline-reverse",
                                            "fr-btns-group--inline-lg",
                                            "fr-btns-group--icon-left"
                                        )}
                                    >
                                        {actionArea.map((buttonProps, i) => {
                                            const { priority: priorityProps, ...rest } =
                                                buttonProps;
                                            const priority = i === 0 ? "primary" : priorityProps;
                                            return (
                                                <li key={i}>
                                                    <Button priority={priority} {...rest} />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
});

Modal.displayName = symToStr({ Modal });

const { useTranslation, addModalTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Modal }),
    "frMessages": {
        "close": "Fermer"
    }
});

addModalTranslations({
    "lang": "en",
    "messages": {
        "close": "Close"
    }
});

addModalTranslations({
    "lang": "es",
    "messages": {
        "close": "Cerrar"
    }
});

export { addModalTranslations };
