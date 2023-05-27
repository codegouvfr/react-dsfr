import React, { forwardRef, memo, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { assert, type Equals } from "tsafe/assert";
import { cx } from "./tools/cx";

export type FranceConnectButtonProps = {
    className?: string;
    redirectUrl: string;
    /** Default: false */
    plus?: boolean;
    classes?: Partial<Record<"root" | "login" | "brand", string>>;
    style?: CSSProperties;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export const FranceConnectButton = memo(
    forwardRef<HTMLDivElement, FranceConnectButtonProps>((props, ref) => {
        const { classes = {}, className, redirectUrl, plus = false, style, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        return (
            <div
                className={cx(fr.cx("fr-connect-group"), classes.root, className)}
                style={style}
                ref={ref}
            >
                <a className={fr.cx("fr-btn", "fr-connect")} href={redirectUrl}>
                    <span className={cx(fr.cx("fr-connect__login"), classes.login)}>
                        S’identifier avec
                    </span>
                    <span className={cx(fr.cx("fr-connect__brand"), classes.brand)}>
                        FranceConnect{plus ? "+" : ""}
                    </span>
                </a>
                <p>
                    <a
                        href={
                            plus
                                ? "https://franceconnect.gouv.fr/france-connect-plus"
                                : "https://franceconnect.gouv.fr/"
                        }
                        target="_blank"
                        rel="noopener"
                        title={`${t("what is service", { plus })} - ${t("new window")}`}
                    >
                        {t("what is service", { plus })}
                    </a>
                </p>
            </div>
        );
    })
);

FranceConnectButton.displayName = symToStr({ FranceConnectButton });

export default FranceConnectButton;

const { useTranslation, addFranceConnectButtonTranslations } = createComponentI18nApi({
    "componentName": symToStr({ FranceConnectButton }),
    "frMessages": {
        /* spell-checker: disable */
        "what is service": (params: { plus: boolean }) =>
            `Qu’est-ce que FranceConnect${params.plus ? "+" : ""} ?`,
        "new window": "nouvelle fenêtre"
        /* spell-checker: enable */
    }
});

addFranceConnectButtonTranslations({
    "lang": "en",
    "messages": {
        "what is service": ({ plus }) => `What is FranceConnect${plus ? "+" : ""} ?`,
        "new window": "new window"
    }
});

export { addFranceConnectButtonTranslations };
