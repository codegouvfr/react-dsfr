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
import { fr } from "./fr";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import ArtworkLightSvg from "./dsfr/artwork/light.svg";
import ArtworkDarkSvg from "./dsfr/artwork/dark.svg";
import ArtworkSystemSvg from "./dsfr/artwork/system.svg";
import { getAssetUrl } from "./tools/getAssetUrl";
const dialogId = "fr-theme-modal";
const dialogTitleId = "fr-theme-modal-title";
export const headerFooterDisplayItem = {
    "buttonProps": Object.assign({ "aria-controls": dialogId }, { "data-fr-opened": false }),
    "iconId": "fr-icon-theme-fill",
    "text": (() => {
        function Text() {
            const { t } = useTranslation();
            return React.createElement(React.Fragment, null, t("display settings"));
        }
        return React.createElement(Text, null);
    })()
};
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-display> */
export const Display = memo(forwardRef((props, ref) => {
    const { className, style } = props, rest = __rest(props, ["className", "style"]);
    assert();
    const { t } = useTranslation();
    return (React.createElement("dialog", Object.assign({ id: dialogId, className: cx(fr.cx("fr-modal"), className), role: "dialog", "aria-labelledby": dialogTitleId, ref: ref, style: style }, rest),
        React.createElement("div", { className: fr.cx("fr-container", "fr-container--fluid", "fr-container-md") },
            React.createElement("div", { className: fr.cx("fr-grid-row", "fr-grid-row--center") },
                React.createElement("div", { className: fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-4") },
                    React.createElement("div", { className: fr.cx("fr-modal__body") },
                        React.createElement("div", { className: fr.cx("fr-modal__header") },
                            React.createElement("button", { className: fr.cx("fr-btn--close", "fr-btn"), "aria-controls": dialogId, title: t("close") }, t("close"))),
                        React.createElement("div", { className: "fr-modal__content" },
                            React.createElement("h1", { id: dialogTitleId, className: fr.cx("fr-modal__title") }, t("display settings")),
                            React.createElement("div", { className: "fr-display" },
                                React.createElement("div", { className: fr.cx("fr-form-group") },
                                    React.createElement("fieldset", { className: fr.cx("fr-fieldset") },
                                        React.createElement("legend", { className: fr.cx("fr-fieldset__legend", "fr-text--regular") }, t("pick a theme")),
                                        React.createElement("div", { className: fr.cx("fr-fieldset__content") }, ["light", "dark", "system"].map(theme => (React.createElement(RadioGroup, { key: theme, theme: theme }))))))))))))));
}));
Display.displayName = symToStr({ Display });
export default Display;
const RadioGroup = memo((props) => {
    const { theme } = props;
    const inputId = useId();
    const { t } = useTranslation();
    const pictogramUrl = getAssetUrl((() => {
        switch (theme) {
            case "dark":
                return ArtworkDarkSvg;
            case "light":
                return ArtworkLightSvg;
            case "system":
                return ArtworkSystemSvg;
        }
    })());
    return (React.createElement("div", { key: theme, className: fr.cx("fr-radio-group", "fr-radio-rich") },
        React.createElement("input", { value: theme, type: "radio", id: inputId, name: "fr-radios-theme" }),
        React.createElement("label", { className: "fr-label", htmlFor: inputId },
            t(`${theme} theme`),
            theme === "system" && (React.createElement("span", { className: fr.cx("fr-hint-text") }, t("system theme hint")))),
        React.createElement("div", { className: fr.cx("fr-radio-rich__img") },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", 
                //className={fr.cx("fr-artwork")}
                width: "80px", height: "80px", viewBox: "0 0 80 80" }, ["artwork-decorative", "artwork-minor", "artwork-major"].map(label => (React.createElement("use", { key: label, className: fr.cx(`fr-${label}`), xlinkHref: `${pictogramUrl}#${label}` })))))));
});
RadioGroup.displayName = symToStr({ RadioGroup });
const { useTranslation, addDisplayTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Display }),
    "frMessages": {
        /* spell-checker: disable */
        "display settings": "Paramètres d'affichage",
        "close": "Fermer",
        "pick a theme": `Choisissez un thème pour personnaliser l'apparence du site.`,
        "light theme": `Thème clair`,
        "dark theme": `Thème sombre`,
        "system theme": `Système.`,
        "system theme hint": `Utilise les paramètres système.`
        /* spell-checker: enable */
    }
});
addDisplayTranslations({
    "lang": "en",
    "messages": {
        "display settings": "Display settings",
        "close": "Close",
        "pick a theme": `Pick a theme to customize the website's look.`,
        "light theme": `Light theme`,
        "dark theme": "Dark theme",
        "system theme": `System.`,
        "system theme hint": "Use system preference"
    }
});
addDisplayTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "display settings": "Parámetro de visualización",
        "close": "Cerrar",
        "pick a theme": `Elija un tema para personalizar el aspecto del sitio.`
        /* spell-checker: enable */
    }
});
export { addDisplayTranslations };
//# sourceMappingURL=Display.js.map