import React, { memo, forwardRef, type CSSProperties, type ReactNode } from "react";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import type { Equals } from "tsafe";
import { createComponentI18nApi } from "../i18n";
import type { FrIconClassName, RiIconClassName } from "../fr/generatedFromCss/classNames";
import Button, { ButtonProps } from "../Button";
import { typeGuard } from "tsafe/typeGuard";
import { overwriteReadonlyProp } from "tsafe/lab/overwriteReadonlyProp";

export type ModalProps = {
    className?: string;
    /** Default: "medium" */
    size?: "small" | "medium" | "large";
    title: ReactNode;
    children: ReactNode;
    /** Default: true */
    concealingBackdrop?: boolean;
    topAnchor?: boolean;
    iconId?: FrIconClassName | RiIconClassName;
    buttons?:
        | [ModalProps.ActionAreaButtonProps, ...ModalProps.ActionAreaButtonProps[]]
        | ModalProps.ActionAreaButtonProps;
    style?: CSSProperties;
};

export namespace ModalProps {
    export type ActionAreaButtonProps = ButtonProps & {
        /** Default: true */
        doClosesModal?: boolean;
    };

    export type ModalButtonProps = {
        "nativeButtonProps": {
            "aria-controls": string;
            "data-fr-opened": boolean;
        };
    };
}

const Modal = memo(
    forwardRef<HTMLDialogElement, ModalProps & { id: string }>((props, ref) => {
        const {
            className,
            id,
            title,
            children,
            concealingBackdrop = true,
            topAnchor = false,
            iconId,
            buttons: buttons_props,
            size = "medium",
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const buttons =
            buttons_props === undefined
                ? undefined
                : buttons_props instanceof Array
                ? buttons_props
                : [buttons_props];

        const { t } = useTranslation();
        const titleId = `fr-modal-title-${id}`;
        return (
            <dialog
                aria-labelledby={titleId}
                role="dialog"
                id={id}
                className={cx(fr.cx("fr-modal", topAnchor && "fr-modal--top"), className)}
                style={style}
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
                                        className={fr.cx("fr-btn--close", "fr-btn")}
                                        title={t("close")}
                                        aria-controls={id}
                                        type="button"
                                    >
                                        {t("close")}
                                    </button>
                                </div>
                                <div className={fr.cx("fr-modal__content")}>
                                    <h1 id={titleId} className={fr.cx("fr-modal__title")}>
                                        {iconId !== undefined && (
                                            <span className={fr.cx(iconId, "fr-fi--lg")} />
                                        )}
                                        {title}
                                    </h1>
                                    {children}
                                </div>
                                {buttons !== undefined && (
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
                                            {[...buttons]
                                                .reverse()
                                                .map(
                                                    (
                                                        { doClosesModal = true, ...buttonProps },
                                                        i
                                                    ) => (
                                                        <li key={i}>
                                                            <Button
                                                                {...buttonProps}
                                                                priority={
                                                                    buttonProps.priority ??
                                                                    (i === 0
                                                                        ? "primary"
                                                                        : "secondary")
                                                                }
                                                                {...(!doClosesModal
                                                                    ? {}
                                                                    : "linkProps" in buttonProps
                                                                    ? {
                                                                          "linkProps": {
                                                                              ...buttonProps.linkProps,
                                                                              "aria-controls": id
                                                                          } as any
                                                                      }
                                                                    : {
                                                                          "nativeButtonProps": {
                                                                              ...buttonProps.nativeButtonProps,
                                                                              "aria-controls": id
                                                                          } as any
                                                                      })}
                                                            />
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        );
    })
);

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
        /* spell-checker: disable */
        "close": "Cerrar"
        /* spell-checker: enable */
    }
});

export { addModalTranslations };

/** @see <https://components.react-dsfr.fr/?path=/docs/components-modal> */
export function createModal(params: { isOpenedByDefault: boolean; id: string }): {
    buttonProps: {
        "aria-controls": string;
        "data-fr-opened": boolean;
    };
    Component: (props: ModalProps) => JSX.Element;
    close: () => void;
    open: () => void;
    isOpenedByDefault: boolean;
    id: string;
} {
    const { isOpenedByDefault, id } = params;

    const buttonProps = {
        "aria-controls": id,
        "data-fr-opened": isOpenedByDefault
    };

    const hiddenControlButtonId = `${id}-hidden-control-button`;

    function Component(props: ModalProps) {
        return (
            <>
                <Button
                    nativeButtonProps={{
                        ...buttonProps,
                        "id": hiddenControlButtonId,
                        "type": "button"
                    }}
                    className={fr.cx("fr-hidden")}
                >
                    {" "}
                </Button>
                <Modal {...props} id={id} />
            </>
        );
    }

    Component.displayName = `${id}-modal`;

    overwriteReadonlyProp(Component as any, "name", Component.displayName);

    function open() {
        const hiddenControlButton = document.getElementById(hiddenControlButtonId);

        assert(hiddenControlButton !== null, "Modal isn't mounted");

        hiddenControlButton.click();
    }

    function close() {
        const modalElement = document.getElementById(id);

        assert(modalElement !== null, "Modal isn't mounted");

        const closeButtonElement = modalElement.querySelector(`.${fr.cx("fr-btn--close")}`);

        assert(closeButtonElement !== null);

        assert(
            typeGuard<HTMLButtonElement>(closeButtonElement, "click" in closeButtonElement),
            "Close button isn't a button"
        );

        closeButtonElement.click();
    }

    return {
        Component,
        buttonProps,
        open,
        close,
        isOpenedByDefault,
        id
    };
}
