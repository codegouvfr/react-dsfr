"use client";
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
import React, { forwardRef, memo } from "react";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";
import { getLink } from "./link";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-share> */
export const Share = memo(forwardRef((props, ref) => {
    const { t } = useTranslation();
    const { id: id_props, className, classes = {}, style, title = t("share this page"), text, buttons } = props, rest = __rest(props, ["id", "className", "classes", "style", "title", "text", "buttons"]);
    assert();
    const { Link } = getLink();
    const id = useAnalyticsId({
        defaultIdPrefix: "fr-share",
        explicitlyProvidedId: id_props
    });
    return (React.createElement("div", { id: id, ref: ref, className: cx(fr.cx("fr-share"), classes.root, className), style: style },
        React.createElement("p", { className: cx(fr.cx("fr-share__title"), classes.title) }, title),
        text !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-share__text"), classes.text) }, text)),
        React.createElement("ul", { className: cx(fr.cx("fr-btns-group"), classes["buttons-group"]) }, buttons.map((button, i) => {
            var _a;
            const buttonLabel = (_a = button.children) !== null && _a !== void 0 ? _a : t(button.type);
            return (React.createElement("li", { key: i, className: cx(classes["buttons-group-item"]) }, button.buttonProps !== undefined
                ? (() => {
                    const { buttonProps } = button;
                    return (React.createElement("button", Object.assign({}, buttonProps, { className: cx(fr.cx("fr-btn", `fr-btn--${button.type}`), classes.button, buttonProps.className) }), buttonLabel));
                })()
                : (() => {
                    const _a = button.linkProps, { target = button.type === "mail"
                        ? undefined
                        : "_blank", rel = target === "_blank"
                        ? "noopener external"
                        : undefined, title = target === "_blank"
                        ? `${buttonLabelToString(buttonLabel)} - ${t("new window")}`
                        : undefined } = _a, restLinkProps = __rest(_a, ["target", "rel", "title"]);
                    return (React.createElement(Link, Object.assign({}, restLinkProps, { target: target, rel: rel, title: title, role: button.disabled ? "link" : undefined, "aria-disabled": button.disabled || undefined, onClick: button.disabled
                            ? event => {
                                var _a, _b;
                                event.preventDefault();
                                (_b = (_a = button.linkProps).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                            }
                            : button.linkProps.onClick, className: cx(fr.cx("fr-btn", `fr-btn--${button.type}`), classes.button, button.linkProps.className) }), buttonLabel));
                })()));
        }))));
}));
Share.displayName = symToStr({ Share });
export default Share;
function buttonLabelToString(label) {
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
//# sourceMappingURL=Share.js.map