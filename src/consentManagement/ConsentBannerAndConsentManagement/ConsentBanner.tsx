import React, { useEffect, useState } from "react";
import { fr } from "../../fr";
import type { RegisteredLinkProps } from "../../link";
import type { ProcessConsentChanges } from "../processConsentChanges";
import { isBrowser } from "../../tools/isBrowser";
import { useTranslation } from "./translation";

export function createConsentBanner<Finality extends string>(params: {
    personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
    processConsentChanges: ProcessConsentChanges<Finality>;
    consentModalButtonProps: {
        "aria-controls": string;
        "data-fr-opened": boolean;
    };
}) {
    const { personalDataPolicyLinkProps, processConsentChanges, consentModalButtonProps } = params;

    function ConsentBanner() {
        const { t } = useTranslation();

        const [hostname, setHostname] = useState("");

        const [isProcessingChanges, setIsProcessingChanges] = useState(false);

        useEffect(() => {
            if (!isBrowser) {
                return;
            }

            setHostname(location.host);
        }, []);

        return (
            <>
                <div className={fr.cx("fr-consent-banner")}>
                    <h2 className={fr.cx("fr-h6")}>{t("about cookies", { hostname })}</h2>
                    <div /*className={fr.cx("fr-consent-banner__content")}*/>
                        <p className={fr.cx("fr-text--sm")}>
                            {t("welcome message", { personalDataPolicyLinkProps })}
                        </p>
                    </div>
                    <ul
                        className={fr.cx(
                            "fr-consent-banner__buttons",
                            "fr-btns-group",
                            "fr-btns-group--right",
                            "fr-btns-group--inline-reverse",
                            "fr-btns-group--inline-sm"
                        )}
                    >
                        <li>
                            <button
                                className={fr.cx("fr-btn")}
                                title={t("accept all - title")}
                                onClick={async () => {
                                    setIsProcessingChanges(true);
                                    await processConsentChanges({ "type": "grantAll" });
                                    setIsProcessingChanges(false);
                                }}
                                disabled={isProcessingChanges}
                            >
                                {t("accept all")}
                            </button>
                        </li>
                        <li>
                            <button
                                className={fr.cx("fr-btn")}
                                title={t("refuse all - title")}
                                onClick={() => {
                                    setIsProcessingChanges(true);
                                    processConsentChanges({ "type": "denyAll" });
                                    setIsProcessingChanges(false);
                                }}
                                disabled={isProcessingChanges}
                            >
                                {t("refuse all")}
                            </button>
                        </li>
                        <li>
                            <button
                                className={fr.cx("fr-btn", "fr-btn--secondary")}
                                title={t("customize cookies - title")}
                                disabled={isProcessingChanges}
                                {...consentModalButtonProps}
                            >
                                {t("customize")}
                            </button>
                        </li>
                    </ul>
                </div>
            </>
        );
    }

    return { ConsentBanner };
}
