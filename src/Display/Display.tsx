import React, { useId } from "react";
import { fr } from "../fr";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "../i18n";
import type { HeaderProps } from "../Header";
import type { FooterProps } from "../Footer";
import { createModal } from "../Modal";
import { Artwork } from "./Artwork";

const modal = createModal({
    "isOpenedByDefault": false,
    "id": "fr-theme-modal"
});

export const headerFooterDisplayItem: HeaderProps.QuickAccessItem.Button &
    FooterProps.BottomItem.Button = {
    "buttonProps": modal.buttonProps,
    "iconId": "fr-icon-theme-fill",
    "text": (() => {
        function Text() {
            const { t } = useTranslation();
            return <>{t("display settings")}</>;
        }

        return <Text />;
    })()
};

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-display> */
export function Display() {
    const { t } = useTranslation();

    const { getInputId } = (function useClosure() {
        const id = useId();

        function getInputId(theme: "light" | "dark" | "system") {
            return `${id}-${theme}`;
        }

        return { getInputId };
    })();

    return (
        <modal.Component title={t("display settings")} size="small">
            <div /*id="fr-display"*/ className="fr-display">
                <div className={fr.cx("fr-form-group" as any)}>
                    <fieldset className={fr.cx("fr-fieldset")}>
                        <legend
                            className={fr.cx("fr-fieldset__legend", "fr-text--regular")}
                            //id="-legend"
                        >
                            {t("pick a theme")}
                        </legend>
                        <div className={fr.cx("fr-fieldset__content")}>
                            {(["light", "dark", "system"] as const).map(theme => (
                                <div
                                    key={theme}
                                    className={fr.cx("fr-radio-group", "fr-radio-rich")}
                                >
                                    <input
                                        value={theme}
                                        type="radio"
                                        id={getInputId(theme)}
                                        name="fr-radios-theme"
                                    />
                                    <label className="fr-label" htmlFor={getInputId(theme)}>
                                        {t(`${theme} theme`)}
                                        {theme === "system" && (
                                            <span className={fr.cx("fr-hint-text")}>
                                                {t("system theme hint")}
                                            </span>
                                        )}
                                    </label>
                                    <div className={fr.cx("fr-radio-rich__img")}>
                                        <Artwork theme={theme} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>
            </div>
        </modal.Component>
    );
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
