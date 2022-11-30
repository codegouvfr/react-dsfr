import React, { useId } from "react";
import type { ReactNode } from "react";
import { fr } from "./lib";
import { createComponentI18nApi } from "./lib/i18n";
import { symToStr } from "tsafe/symToStr";
import { cx } from "./lib/tools/cx";
import { FrIconClassName, RiIconClassName } from "./lib/generatedFromCss/classNames";
import type { LinkProps } from "./lib/routing";
import { useLink } from "./lib/routing";

//NOTE: This is a work in progress, this component is not yet usable.

export type HeaderProps = {
    className?: string;
    intituléOfficiel: ReactNode;
    nomDuSiteSlashService: ReactNode;
    baselinePrécisionsSurLorganisation: ReactNode;
    links: {
        text: ReactNode;
        linkProps: LinkProps;
        iconId: FrIconClassName | RiIconClassName;
    }[];
};

/** @see <https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/en-tete> */
export function Header(props: HeaderProps) {
    const {
        className,
        intituléOfficiel,
        nomDuSiteSlashService,
        baselinePrécisionsSurLorganisation,
        links
    } = props;

    const menuButtonId = useId();
    const modalId = useId();

    const { t } = useTranslation();

    const { Link } = useLink();

    return (
        <header role="banner" className={cx(fr.cx("fr-header"), className)}>
            <div /*className={fr.cx("fr-header__body" as any)}*/>
                <div className={fr.cx("fr-container")}>
                    <div className={fr.cx("fr-header__body-row")}>
                        <div className={fr.cx("fr-header__brand", "fr-enlarge-link")}>
                            <div className={fr.cx("fr-header__brand-top")}>
                                <div className={fr.cx("fr-header__logo")}>
                                    <p className={fr.cx("fr-logo")}>{intituléOfficiel}</p>
                                </div>
                                <div className={fr.cx("fr-header__navbar")}>
                                    <button
                                        className={fr.cx("fr-btn--menu", "fr-btn")}
                                        data-fr-opened={false}
                                        aria-controls={modalId}
                                        aria-haspopup="menu"
                                        id={menuButtonId}
                                        title={t("menu")}
                                    >
                                        {t("menu")}
                                    </button>
                                </div>
                            </div>
                            <div className={fr.cx("fr-header__service")}>
                                <a
                                    href="/"
                                    title="Accueil - [À MODIFIER - Nom du site / service] - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
                                >
                                    <p className={fr.cx("fr-header__service-title")}>
                                        {nomDuSiteSlashService}
                                    </p>
                                </a>
                                <p /*className={fr.cx("fr-header__service-tagline" as any)}*/>
                                    {baselinePrécisionsSurLorganisation}
                                </p>
                            </div>
                        </div>
                        <div className={fr.cx("fr-header__tools")}>
                            <div className={fr.cx("fr-header__tools-links")}>
                                <ul className={fr.cx("fr-btns-group")}>
                                    {links.map(({ linkProps, iconId, text }, i) => (
                                        <li key={i}>
                                            <Link
                                                {...linkProps}
                                                className={fr.cx("fr-btn", iconId)}
                                            >
                                                {text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={fr.cx("fr-header__menu", "fr-modal")}
                id={modalId}
                aria-labelledby={menuButtonId}
            >
                <div className={fr.cx("fr-container")}>
                    <button
                        className={fr.cx("fr-btn--close", "fr-btn")}
                        aria-controls={modalId}
                        title={t("close")}
                    >
                        {t("close")}
                    </button>
                    <div className={fr.cx("fr-header__menu-links")}></div>
                </div>
            </div>
        </header>
    );
}

const { useTranslation, addHeaderTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Header }),
    "frMessages": {
        /* spell-checker: disable */
        "menu": "Menu",
        "close": "Fermer"
        /* spell-checker: enable */
    }
});

addHeaderTranslations({
    "lang": "en",
    "messages": {
        "close": "Close"
    }
});

export { addHeaderTranslations };
