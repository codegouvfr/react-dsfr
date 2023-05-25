import React, { forwardRef, memo } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { getLink } from "./link";

export enum Service {
    AGENT_CONNECT,
    FRANCE_CONNECT,
    FRANCE_CONNECT_PLUS,
    MON_COMPTE_PRO
}

const services = {
    [Service.AGENT_CONNECT]: {
        name: "AgentConnect",
        url: "https://agentconnect.gouv.fr/",
        class: "fr-agentconnect"
    },
    [Service.FRANCE_CONNECT]: {
        name: "FranceConnect",
        url: "https://franceconnect.gouv.fr/",
        class: ""
    },
    [Service.FRANCE_CONNECT_PLUS]: {
        name: "FranceConnect+",
        url: "https://franceconnect.gouv.fr/france-connect-plus",
        class: "fr-connect--plus"
    },
    [Service.MON_COMPTE_PRO]: {
        name: "MonComptePro",
        url: "https://moncomptepro.beta.gouv.fr/",
        class: "fr-moncomptepro"
    }
};

export type ConnectButtonProps = {
    classes?: Partial<Record<"root", string>>;
    className?: string;
    loginUrl: string;
    service: Service;
};

const ConnectButton = memo(
    forwardRef<HTMLDivElement, ConnectButtonProps>((props, ref) => {
        const { classes = {}, className, loginUrl, service } = props;
        const { t } = useTranslation();
        const { Link } = getLink();

        const _service = services[service];

        return (
            <div className={cx(fr.cx("fr-connect-group"), className, classes?.root)} ref={ref}>
                <form action={loginUrl} method="post" className="fr-m-0">
                    <button className={cx(fr.cx("fr-connect"), _service.class)}>
                        <span className="fr-connect__login">{t("identify with")}</span>
                        <span className="fr-connect__brand">{_service.name}</span>
                    </button>
                </form>
                <p>
                    <Link
                        href={_service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${t("what is", _service.name)} - nouvelle fenêtre`}
                    >
                        {t("what is", _service.name)}
                    </Link>
                </p>
            </div>
        );
    })
);

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
