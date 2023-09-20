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
import { createComponentI18nApi } from "./i18n";
import { symToStr } from "tsafe/symToStr";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { assert } from "tsafe";
import { useAnalyticsId } from "./tools/useAnalyticsId";
export const Upload = memo(forwardRef((props, ref) => {
    var _a;
    const { t } = useTranslation();
    const { id: id_props, className, disabled = false, hint = t("hint"), multiple = false, label = multiple ? t("add files") : t("add file"), state = "default", stateRelatedMessage, nativeInputProps = {} } = props, rest = __rest(props, ["id", "className", "disabled", "hint", "multiple", "label", "state", "stateRelatedMessage", "nativeInputProps"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-upload",
        "explicitlyProvidedId": id_props
    });
    const inputId = (_a = nativeInputProps.id) !== null && _a !== void 0 ? _a : `${id}-input`;
    const messageId = `${inputId}-desc-error`;
    return (React.createElement("div", { id: id, className: cx(fr.cx("fr-upload-group", disabled && "fr-input-group--disabled", (() => {
            switch (state) {
                case "error":
                    return "fr-input-group--error";
                case "success":
                    return "fr-input-group--valid";
                case "default":
                    return undefined;
            }
            assert(false);
        })()), className), ref: ref },
        React.createElement("label", { className: fr.cx("fr-label"), "aria-disabled": disabled, htmlFor: inputId },
            label,
            React.createElement("span", { className: fr.cx("fr-hint-text") }, hint)),
        React.createElement("input", Object.assign({ "aria-describedby": messageId, "aria-disabled": disabled, className: cx(fr.cx("fr-upload")), disabled: disabled, id: inputId, multiple: multiple, name: inputId, type: "file" }, nativeInputProps)),
        state !== "default" && (React.createElement("p", { id: messageId, className: cx(fr.cx((() => {
                switch (state) {
                    case "error":
                        return "fr-error-text";
                    case "success":
                        return "fr-valid-text";
                }
                assert(false);
            })())) }, stateRelatedMessage))));
}));
Upload.displayName = symToStr({ Upload });
const { useTranslation, addUploadTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Upload }),
    "frMessages": {
        /* spell-checker: disable */
        "add file": "Ajouter un fichier",
        "add files": "Ajouter des fichiers",
        "hint": "Taille maximale : 500 Mo. Formats supportés : jpg, png, pdf. Plusieurs fichiers possibles."
        /* spell-checker: enable */
    }
});
addUploadTranslations({
    lang: "en",
    messages: {
        "add file": "Add file",
        "add files": "Add files",
        "hint": "Maximum size : 500 Mo. Supported formats : jpg, png, pdf. Many files possible."
    }
});
export { addUploadTranslations };
//# sourceMappingURL=Upload.js.map