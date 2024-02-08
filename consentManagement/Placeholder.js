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
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { assert } from "tsafe";
import { createComponentI18nApi } from "../i18n";
import { symToStr } from "tsafe/symToStr";
export const Placeholder = memo(forwardRef((props, ref) => {
    const { t } = useTranslation();
    const { className, titleAs: HtmlTitleTag = "h4", classes = {}, style, title, description, onGranted } = props, rest = __rest(props, ["className", "titleAs", "classes", "style", "title", "description", "onGranted"]);
    assert();
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-consent-placeholder"), classes.root, className), ref: ref, style: style }, rest),
        React.createElement(HtmlTitleTag, { className: cx(fr.cx("fr-h6", "fr-mb-2v"), classes.title) }, title),
        React.createElement("p", { className: cx(fr.cx("fr-mb-6v"), classes.title) }, description),
        React.createElement("button", { className: cx(fr.cx("fr-btn"), classes.button), title: description, onClick: onGranted }, t("enable message"))));
}));
const { useTranslation, addPlaceholderTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Placeholder }),
    "frMessages": {
        /* spell-checker: disable */
        "enable message": "Autoriser"
        /* spell-checker: enable */
    }
});
addPlaceholderTranslations({
    "lang": "en",
    "messages": {
        "enable message": "Authorize"
    }
});
addPlaceholderTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "enable message": "Permitir"
        /* spell-checker: enable */
    }
});
export { addPlaceholderTranslations };
//# sourceMappingURL=Placeholder.js.map