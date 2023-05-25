import React from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "../i18n";
import { cx } from "../tools/cx";
import { fr } from "../fr";
import { getLink } from "../link";

export type ConnectButtonProps = {
    loginUrl: string;
    serviceName: string;
    serviceUrl: string;
};

const ConnectButton = ({ loginUrl, serviceName, serviceUrl }: ConnectButtonProps) => {
    const { t } = useTranslation();
    const { Link } = getLink();

    return (
        <div className={cx(fr.cx("fr-connect-group"))}>
            <form action={loginUrl} method="post" className="fr-m-0">
                <button
                    className={cx(
                        fr.cx("fr-connect"),
                        serviceName !== "FranceConnect" ? `fr-${serviceName.toLowerCase()}` : ""
                    )}
                >
                    <span className="fr-connect__login">{t("identify with")}</span>
                    <span className="fr-connect__brand">{serviceName}</span>
                </button>
            </form>
            <p>
                <Link
                    href={serviceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${t("what is", serviceName)} - nouvelle fenêtre`}
                >
                    {t("what is", serviceName)}
                </Link>
            </p>
        </div>
    );
};

ConnectButton.displayName = symToStr({ ConnectButton });

export default ConnectButton;

const { useTranslation } = createComponentI18nApi({
    "componentName": symToStr({ ConnectButton }),
    "frMessages": {
        /* spell-checker: disable */
        "identify with": "S’identifier avec",
        "what is": (service: string) => `Qu’est-ce que ${service} ?`
        /* spell-checker: enable */
    }
});
