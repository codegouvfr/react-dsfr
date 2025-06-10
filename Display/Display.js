import React, { useId } from "react";
import { fr } from "../fr";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "../i18n";
import { createModal } from "../Modal";
import { Artwork } from "./Artwork";
const modal = createModal({
    "isOpenedByDefault": false,
    "id": "fr-theme-modal"
});
export const headerFooterDisplayItem = {
    "buttonProps": modal.buttonProps,
    "iconId": "fr-icon-theme-fill",
    "text": (() => {
        function Text() {
            const { t } = useTranslation();
            return React.createElement(React.Fragment, null, t("display settings"));
        }
        return React.createElement(Text, null);
    })()
};
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-display> */
export function Display() {
    const { t } = useTranslation();
    const { getInputId } = (function useClosure() {
        const id = useId();
        function getInputId(theme) {
            return `${id}-${theme}`;
        }
        return { getInputId };
    })();
    return (React.createElement(modal.Component, { title: t("display settings"), size: "small" },
        React.createElement("div", { className: "fr-display" },
            React.createElement("div", { className: fr.cx("fr-form-group") },
                React.createElement("fieldset", { className: fr.cx("fr-fieldset") },
                    React.createElement("legend", { className: fr.cx("fr-fieldset__legend", "fr-text--regular") }, t("pick a theme")),
                    React.createElement("div", { className: fr.cx("fr-fieldset__content") }, ["light", "dark", "system"].map(theme => (React.createElement("div", { key: theme, className: fr.cx("fr-radio-group", "fr-radio-rich") },
                        React.createElement("input", { value: theme, type: "radio", id: getInputId(theme), name: "fr-radios-theme" }),
                        React.createElement("label", { className: "fr-label", htmlFor: getInputId(theme) },
                            t(`${theme} theme`),
                            theme === "system" && (React.createElement("span", { className: fr.cx("fr-hint-text") }, t("system theme hint")))),
                        React.createElement("div", { className: fr.cx("fr-radio-rich__img") },
                            React.createElement(Artwork, { theme: theme })))))))))));
}
Display.displayName = symToStr({ Display });
export default Display;
const { useTranslation, addDisplayTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Display }),
    "frMessages": {
        /* spell-checker: disable */
        "display settings": "Paramètres d'affichage",
        "close": "Fermer",
        "pick a theme": `Choisissez un thème pour personnaliser l'apparence du site.`,
        "light theme": `Thème clair`,
        "dark theme": `Thème sombre`,
        "system theme": `Système`,
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
        "system theme": `System`,
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