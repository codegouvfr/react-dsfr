import type { JSX } from "../tools/JSX";
import React, { memo, forwardRef, type CSSProperties, type ReactNode } from "react";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import type { Equals } from "tsafe";
import { createComponentI18nApi } from "../i18n";
import type { FrIconClassName, RiIconClassName } from "../fr/generatedFromCss/classNames";
import Button, { ButtonProps } from "../Button";
import { overwriteReadonlyProp } from "tsafe/lab/overwriteReadonlyProp";

export type ModalProps = {
    className?: string;
    /** Default: "medium" */
    size?: "small" | "medium" | "large";
    title: ReactNode;
    titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
    titleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
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
}

const Modal = memo(
    forwardRef<HTMLDialogElement, ModalProps & { id: string }>((props, ref) => {
        const {
            className,
            id,
            title,
            titleAs: TitleTag = "h1",
            titleProps,
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
                                    <TitleTag
                                        id={titleId}
                                        id={titleId}
                                        {...titleProps]
                                        className={cx(titleProps.className,fr.cx("fr-modal__title"))}
                                        
                                        {...titleProps}
                                    >
                                        {iconId !== undefined && (
                                            <span
                                                className={fr.cx(iconId, "fr-fi--lg")}
                                                aria-hidden={true}
                                            />
                                        )}
                                        {title}
                                    </TitleTag>
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

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-modal> */
export function createModal(params: { isOpenedByDefault: boolean; id: string }): {
    buttonProps: {
        /** Only for analytics, feel free to overwrite */
        id: string;
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
        "id": `${id}-control-button`,
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
                        "type": "button",
                        "tabIndex": -1,
                        "aria-hidden": true
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
        const modalElement = document.getElementById(id);

        // @ts-expect-error: Property 'dsfr' does not exist on type 'Window & typeof globalThis'.ts(2339)
        window.dsfr(modalElement).modal.disclose();
    }

    function close() {
        const modalElement = document.getElementById(id);

        // @ts-expect-error: Property 'dsfr' does not exist on type 'Window & typeof globalThis'.ts(2339)
        window.dsfr(modalElement).modal.conceal();
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
