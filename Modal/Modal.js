var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { memo, forwardRef } from "react";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "../i18n";
import Button from "../Button";
import { typeGuard } from "tsafe/typeGuard";
import { overwriteReadonlyProp } from "tsafe/lab/overwriteReadonlyProp";
const Modal = memo(forwardRef((props, ref) => {
    const { className, id, title, children, concealingBackdrop = true, topAnchor = false, iconId, buttons: buttons_props, size = "medium", style, onClose } = props, rest = __rest(props, ["className", "id", "title", "children", "concealingBackdrop", "topAnchor", "iconId", "buttons", "size", "style", "onClose"]);
    assert();
    const buttons = buttons_props === undefined
        ? undefined
        : buttons_props instanceof Array
            ? buttons_props
            : [buttons_props];
    const { t } = useTranslation();
    const titleId = `fr-modal-title-${id}`;
    return (React.createElement("dialog", { "aria-labelledby": titleId, role: "dialog", id: id, className: cx(fr.cx("fr-modal", topAnchor && "fr-modal--top"), className), style: style, ref: ref, "data-fr-concealing-backdrop": concealingBackdrop, onClose: onClose },
        React.createElement("div", { className: fr.cx("fr-container", "fr-container--fluid", "fr-container-md") },
            React.createElement("div", { className: fr.cx("fr-grid-row", "fr-grid-row--center") },
                React.createElement("div", { className: (() => {
                        switch (size) {
                            case "large":
                                return fr.cx("fr-col-12", "fr-col-md-10", "fr-col-lg-8");
                            case "small":
                                return fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4");
                            case "medium":
                                return fr.cx("fr-col-12", "fr-col-md-8", "fr-col-lg-6");
                        }
                    })() },
                    React.createElement("div", { className: fr.cx("fr-modal__body") },
                        React.createElement("div", { className: fr.cx("fr-modal__header") },
                            React.createElement("button", { className: fr.cx("fr-btn--close", "fr-btn"), title: t("close"), "aria-controls": id, type: "button" }, t("close"))),
                        React.createElement("div", { className: fr.cx("fr-modal__content") },
                            React.createElement("h1", { id: titleId, className: fr.cx("fr-modal__title") },
                                iconId !== undefined && (React.createElement("span", { className: fr.cx(iconId, "fr-fi--lg") })),
                                title),
                            children),
                        buttons !== undefined && (React.createElement("div", { className: "fr-modal__footer" },
                            React.createElement("ul", { className: fr.cx("fr-btns-group", "fr-btns-group--right", "fr-btns-group--inline-reverse", "fr-btns-group--inline-lg", "fr-btns-group--icon-left") }, [...buttons]
                                .reverse()
                                .map((_a, i) => {
                                var _b;
                                var { doClosesModal = true } = _a, buttonProps = __rest(_a, ["doClosesModal"]);
                                return (React.createElement("li", { key: i },
                                    React.createElement(Button, Object.assign({}, buttonProps, { priority: (_b = buttonProps.priority) !== null && _b !== void 0 ? _b : (i === 0
                                            ? "primary"
                                            : "secondary") }, (!doClosesModal
                                        ? {}
                                        : "linkProps" in buttonProps
                                            ? {
                                                "linkProps": Object.assign(Object.assign({}, buttonProps.linkProps), { "aria-controls": id })
                                            }
                                            : {
                                                "nativeButtonProps": Object.assign(Object.assign({}, buttonProps.nativeButtonProps), { "aria-controls": id })
                                            })))));
                            }))))))))));
}));
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
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-modal> */
export function createModal(params) {
    const { isOpenedByDefault, id } = params;
    const buttonProps = {
        "aria-controls": id,
        "data-fr-opened": isOpenedByDefault
    };
    const hiddenControlButtonId = `${id}-hidden-control-button`;
    function Component(props) {
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { nativeButtonProps: Object.assign(Object.assign({}, buttonProps), { "id": hiddenControlButtonId, "type": "button" }), className: fr.cx("fr-hidden") }, " "),
            React.createElement(Modal, Object.assign({}, props, { id: id }))));
    }
    Component.displayName = `${id}-modal`;
    overwriteReadonlyProp(Component, "name", Component.displayName);
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
        assert(typeGuard(closeButtonElement, "click" in closeButtonElement), "Close button isn't a button");
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
//# sourceMappingURL=Modal.js.map