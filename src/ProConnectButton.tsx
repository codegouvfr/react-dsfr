import React, { forwardRef, memo, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { assert, type Equals } from "tsafe/assert";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import "./assets/proconnect-btn.css";

export type ProConnectButtonProps =
    | ProConnectButtonProps.WithUrl
    | ProConnectButtonProps.WithOnClick;

export namespace ProConnectButtonProps {
    type Common = {
        id?: string;
        className?: string;
        /** Default: false */
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

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-proconnectbutton> */
export const ProConnectButton = memo(
    forwardRef<HTMLDivElement, ProConnectButtonProps>((props, ref) => {
        const { classes = {}, className, url: href, style, onClick, id: id_props, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-proconnect-button",
            "explicitlyProvidedId": id_props
        });

        const { t } = useTranslation();

        const Inner = onClick !== undefined ? "button" : "a";
        const innerProps = (onClick !== undefined ? { onClick } : { href }) as any;

        return (
            <div
                id={id}
                className={cx(fr.cx("fr-connect-group"), classes.root, className)}
                style={style}
                ref={ref}
            >
                <Inner className={fr.cx("fr-btn", "fr-connect")} {...innerProps}>
                    <span className={cx(fr.cx("fr-connect__login"), classes.login)}>
                        S’identifier avec
                    </span>
                    <span className={cx(fr.cx("fr-connect__brand"), classes.brand)}>
                        ProConnect
                    </span>
                </Inner>
                <p>
                    <a
                        href={"https://proconnect.gouv.fr/"}
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

ProConnectButton.displayName = symToStr({ ProConnectButton });

export default ProConnectButton;

const { useTranslation, addProConnectButtonTranslations } = createComponentI18nApi({
    "componentName": symToStr({ ProConnectButton }),
    "frMessages": {
        /* spell-checker: disable */
        "what is service": "Qu’est-ce que ProConnect ?",
        "new window": "nouvelle fenêtre"
        /* spell-checker: enable */
    }
});

addProConnectButtonTranslations({
    "lang": "en",
    "messages": {
        "what is service": "What's ProConnect?",
        "new window": "new window"
    }
});

export { addProConnectButtonTranslations };
