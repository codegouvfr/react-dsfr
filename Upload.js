import React, { forwardRef, memo, useId } from "react";
import { createComponentI18nApi } from "./i18n";
import { symToStr } from "tsafe/symToStr";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { assert } from "tsafe";
export const Upload = memo(forwardRef((props, ref) => {
    const { t } = useTranslation();
    const { className, disabled = false, hint = t("hint"), multiple = false, state = "default", stateRelatedMessage, nativeInputProps = {} } = props;
    const inputId = (function useClosure() {
        var _a;
        const id = useId();
        return (_a = nativeInputProps.id) !== null && _a !== void 0 ? _a : `input-${id}`;
    })();
    const messageId = `${inputId}-desc-error`;
    return (React.createElement("div", { className: cx(fr.cx("fr-upload-group", disabled && "fr-input-group--disabled", (() => {
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
            t("add_files"),
            React.createElement("span", { className: fr.cx("fr-hint-text") }, hint)),
        React.createElement("input", { "aria-describedby": messageId, "aria-disabled": disabled, className: cx(fr.cx("fr-upload")), disabled: disabled, id: inputId, multiple: multiple, name: inputId, type: "file" }),
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
        "add_files": "Ajouter des fichiers",
        "hint": "Taille maximale : 500 Mo. Formats supportés : jpg, png, pdf. Plusieurs fichiers possibles."
        /* spell-checker: enable */
    }
});
addUploadTranslations({
    lang: "en",
    messages: {
        "add_files": "Add files",
        "hint": "Maximum size : 500 Mo. Supported formats : jpg, png, pdf. Many files possible."
    }
});
//# sourceMappingURL=Upload.js.map