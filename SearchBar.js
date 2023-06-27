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
import React, { memo, forwardRef, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { fr } from "./fr";
/**
 * @see <https://components.react-dsfr.fr/?path=/docs/components-input>
 * */
export const SearchBar = memo(forwardRef((props, ref) => {
    const { className, label: label_props, nativeInputProps = {}, big = false, classes = {}, style, onButtonClick } = props, rest = __rest(props, ["className", "label", "nativeInputProps", "big", "classes", "style", "onButtonClick"]);
    assert();
    const { t } = useTranslation();
    const label = label_props !== null && label_props !== void 0 ? label_props : t("label");
    const inputId = `search-${useId()}-input`;
    return (React.createElement("div", Object.assign({ className: cx(fr.cx("fr-search-bar", big && "fr-search-bar--lg"), classes.root, className), role: "search", ref: ref, style: style }, rest),
        React.createElement("label", { className: cx(fr.cx("fr-label"), classes.label), htmlFor: inputId }, label),
        React.createElement("input", Object.assign({}, nativeInputProps, { className: cx(fr.cx("fr-input"), classes.input, nativeInputProps.className), placeholder: label, type: "search", id: inputId })),
        React.createElement("button", { className: "fr-btn", title: label, onClick: onButtonClick }, label)));
}));
SearchBar.displayName = symToStr({ SearchBar });
export default SearchBar;
const { useTranslation, addSearchBarTranslations } = createComponentI18nApi({
    "componentName": symToStr({ SearchBar }),
    "frMessages": {
        /* spell-checker: disable */
        "label": "Rechercher"
        /* spell-checker: enable */
    }
});
addSearchBarTranslations({
    "lang": "en",
    "messages": {
        "label": "Search"
    }
});
export { addSearchBarTranslations };
//# sourceMappingURL=SearchBar.js.map