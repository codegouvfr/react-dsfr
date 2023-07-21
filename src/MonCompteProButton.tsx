import React, { forwardRef, memo, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { assert, type Equals } from "tsafe/assert";
import { cx } from "./tools/cx";
import "./assets/moncomptepro.css";

export type FranceConnectButtonProps =
    | FranceConnectButtonProps.WithUrl
    | FranceConnectButtonProps.WithOnClick;

export namespace FranceConnectButtonProps {
    type Common = {
        id?: string;
        className?: string;
        classes?: Partial<Record<"root" | "login" | "brand", string>>;
        style?: CSSProperties;
    };
    export type WithUrl = Common & {
        url: string;
        onClick?: never;
    };
    export type WithOnClick = Common & {
        url?: never;
        onClick: React.MouseEventHandler<HTMLButtonElement>;
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-franceconnectbutton> */
export const MonCompteProButton = memo(
    forwardRef<HTMLDivElement, FranceConnectButtonProps>((props, ref) => {
        const { classes = {}, className, url: href, style, onClick, id: id_props, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const Inner = onClick !== undefined ? "button" : "a";
        const innerProps = (onClick !== undefined ? { onClick } : { href }) as any;

        return (
            <div
                id={id_props ?? "fr-moncomptepro"}
                className={cx(fr.cx("fr-connect-group"), classes.root, className)}
                style={style}
                ref={ref}
            >
                <Inner
                    className={cx(fr.cx("fr-btn", "fr-connect"), "moncomptepro-button")}
                    {...innerProps}
                >
                    <span className={cx(fr.cx("fr-connect__login"), classes.login)}>
                        S’identifier avec
                    </span>
                    <span className={cx(fr.cx("fr-connect__brand"), classes.brand)}>
                        MonComptePro
                    </span>
                </Inner>
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
