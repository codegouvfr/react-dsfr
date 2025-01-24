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
import React, { memo, forwardRef, useState, useEffect, useRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";
import { createComponentI18nApi } from "./i18n";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-alert> */
export const Alert = memo(forwardRef((props, ref) => {
    const { className, id: id_props, severity, as: HtmlTitleTag = "h3", classes = {}, style, small: isSmall, title, description, closable: isClosableByUser = false, isClosed: props_isClosed, onClose } = props, rest = __rest(props, ["className", "id", "severity", "as", "classes", "style", "small", "title", "description", "closable", "isClosed", "onClose"]);
    assert();
    const id = useAnalyticsId({
        "explicitlyProvidedId": id_props,
        "defaultIdPrefix": "fr-alert"
    });
    const [isClosed, setIsClosed] = useState(props_isClosed !== null && props_isClosed !== void 0 ? props_isClosed : false);
    const [buttonElement, setButtonElement] = useState(null);
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
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
        else {
            //Controlled
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    });
    const { t } = useTranslation();
    if (isClosed) {
        return null;
    }
    return (React.createElement("div", Object.assign({ id: id, className: cx(fr.cx("fr-alert", `fr-alert--${severity}`, { "fr-alert--sm": isSmall }), classes.root, className), style: style }, (refShouldSetRole.current && { "role": "alert" }), { ref: ref }, rest),
        title !== undefined && (React.createElement(HtmlTitleTag, { className: cx(fr.cx("fr-alert__title"), classes.title) }, title)),
        React.createElement(DescriptionTag, { className: classes.description }, description),
        isClosableByUser && (React.createElement("button", { ref: setButtonElement, className: cx(fr.cx("fr-link--close", "fr-link"), classes.close), onClick: onCloseButtonClick }, t("hide message")))));
}));
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
//# sourceMappingURL=Alert.js.map