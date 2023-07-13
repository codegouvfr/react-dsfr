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
/** @see <https://components.react-dsfr.fr/?path=/docs/components-notice> */
export const Notice = memo(forwardRef((props, ref) => {
    const { id: id_props, className, classes = {}, title, isClosable = false, isClosed: props_isClosed, onClose, style } = props, rest = __rest(props, ["id", "className", "classes", "title", "isClosable", "isClosed", "onClose", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-notice",
        "explicitlyProvidedId": id_props
    });
    const [isClosed, setIsClosed] = useState(props_isClosed !== null && props_isClosed !== void 0 ? props_isClosed : false);
    const [buttonElement, setButtonElement] = useState(null);
    const refShouldButtonGetFocus = useRef(false);
    const refShouldSetRole = useRef(false);
    useEffect(() => {
        if (props_isClosed === undefined) {
            return;
        }
        setIsClosed((isClosed) => {
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
            onClose();
        }
    });
    const { t } = useTranslation();
    if (isClosed) {
        return null;
    }
    return (React.createElement("div", Object.assign({ id: id, className: cx(fr.cx("fr-notice", `fr-notice--info`), classes.root, className) }, (refShouldSetRole.current && { "role": "notice" }), { ref: ref, style: style }, rest),
        React.createElement("div", { className: "fr-container" },
            React.createElement("div", { className: "fr-notice__body" },
                React.createElement("p", { className: cx(fr.cx(`fr-notice__title`), classes.title) }, title),
                isClosable && (React.createElement("button", { ref: setButtonElement, className: cx(fr.cx("fr-btn--close", "fr-btn"), classes.close), onClick: onCloseButtonClick }, t("hide message")))))));
}));
Notice.displayName = symToStr({ Notice });
export default Notice;
const { useTranslation, addNoticeTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Notice }),
    "frMessages": {
        /* spell-checker: disable */
        "hide message": "Masquer le message"
        /* spell-checker: enable */
    }
});
addNoticeTranslations({
    "lang": "en",
    "messages": {
        "hide message": "Hide the message"
    }
});
addNoticeTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "hide message": "Occultar el mesage"
        /* spell-checker: enable */
    }
});
export { addNoticeTranslations };
//# sourceMappingURL=Notice.js.map