import React, { forwardRef, memo, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { assert, type Equals } from "tsafe/assert";
import { cx } from "./tools/cx";
import "./assets/moncomptepro.css";

export type FranceConnectButtonProps = {
    className?: string;
    url: string;
    classes?: Partial<Record<"root" | "login" | "brand", string>>;
    style?: CSSProperties;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export const MonCompteProButton = memo(
    forwardRef<HTMLDivElement, FranceConnectButtonProps>((props, ref) => {
        const { classes = {}, className, url, style, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        return (
            <div
                className={cx(fr.cx("fr-connect-group"), classes.root, className)}
                style={style}
                ref={ref}
            >
                <a className={cx(fr.cx("fr-btn", "fr-connect"), "moncomptepro-button")} href={url}>
                    <span className={cx(fr.cx("fr-connect__login"), classes.login)}>
                        S’identifier avec
                    </span>
                    <span className={cx(fr.cx("fr-connect__brand"), classes.brand)}>
                        MonComptePro
                    </span>
                </a>
                <p>
                    <a
                        href="https://moncomptepro.beta.gouv.fr/"
                        target="_blank"
                        rel="noopener"
                        title={`${t("what is service")} - ${t("new window")}`}
                    >
                        {t("what is service")}
                    </a>
                </p>
            </div>
        );
    })
);

MonCompteProButton.displayName = symToStr({ MonCompteProButton });

export default MonCompteProButton;

const { useTranslation, addMonCompteProButtonTranslations } = createComponentI18nApi({
    "componentName": symToStr({ MonCompteProButton }),
    "frMessages": {
        /* spell-checker: disable */
        "what is service": "Qu’est-ce que MonComptePro ?",
        "new window": "nouvelle fenêtre"
        /* spell-checker: enable */
    }
});

addMonCompteProButtonTranslations({
    "lang": "en",
    "messages": {
        "what is service": "What's MonComptePro",
        "new window": "new window"
    }
});

export { addMonCompteProButtonTranslations };
