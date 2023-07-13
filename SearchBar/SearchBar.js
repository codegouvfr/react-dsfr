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
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { createComponentI18nApi } from "../i18n";
import { cx } from "../tools/cx";
import { fr } from "../fr";
import { SearchButton } from "./SearchButton";
import { useAnalyticsId } from "../tools/useAnalyticsId";
import "../assets/search-bar.css";
/**
 * @see <https://components.react-dsfr.fr/?path=/docs/components-input>
 * */
export const SearchBar = memo(forwardRef((props, ref) => {
    const { className, id: id_props, label: label_props, big = false, classes = {}, style, renderInput = ({ className, id, placeholder, type }) => (React.createElement("input", { className: className, id: id, placeholder: placeholder, type: type })), onButtonClick } = props, rest = __rest(props, ["className", "id", "label", "big", "classes", "style", "renderInput", "onButtonClick"]);
    assert();
    const { t } = useTranslation();
    const label = label_props !== null && label_props !== void 0 ? label_props : t("label");
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-search-bar",
        "explicitlyProvidedId": id_props
    });
    const inputId = `search-${id}-input`;
    return (React.createElement("div", Object.assign({ id: id, className: cx(fr.cx("fr-search-bar", big && "fr-search-bar--lg"), classes.root, className), role: "search", ref: ref, style: style }, rest),
        React.createElement("label", { className: cx(fr.cx("fr-label"), classes.label), htmlFor: inputId }, label),
        renderInput({
            "className": fr.cx("fr-input"),
            "placeholder": label,
            "type": "search",
            "id": inputId
        }),
        React.createElement(SearchButton, { searchInputId: inputId, onClick: onButtonClick })));
}));
SearchBar.displayName = symToStr({ SearchBar });
export default SearchBar;
export const { useTranslation, addSearchBarTranslations } = createComponentI18nApi({
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
//# sourceMappingURL=SearchBar.js.map