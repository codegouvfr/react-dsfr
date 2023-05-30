"use client";
import React, { forwardRef, memo, useState, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { assert, type Equals } from "tsafe/assert";
import agentconnectBtnPrincipalSvgUrl from "./assets/agentconnect-btn-principal.svg";
import agentconnectBtnPrincipalHoverSvgUrl from "./assets/agentconnect-btn-principal-hover.svg";
import agentconnectBtnAlternatifSvgUrl from "./assets/agentconnect-btn-alternatif.svg";
import agentconnectBtnAlternatifHoverSvgUrl from "./assets/agentconnect-btn-alternatif-hover.svg";
import "./assets/agentconnect.css";
import { useIsDark } from "./useIsDark";
import { getAssetUrl } from "./tools/getAssetUrl";
import { cx } from "./tools/cx";

export type AgentConnectButtonProps = {
    className?: string;
    url: string;
    style?: CSSProperties;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export const AgentConnectButton = memo(
    forwardRef<HTMLDivElement, AgentConnectButtonProps>((props, ref) => {
        const { className, url, style, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const [isMouseHover, setIsMouseHover] = useState(false);

        const { isDark } = useIsDark();

        return (
            <div className={className} style={style} ref={ref}>
                <a
                    className="agentconnect-button__link"
                    href={url}
                    onMouseEnter={() => setIsMouseHover(true)}
                    onMouseLeave={() => setIsMouseHover(false)}
                >
                    <img
                        src={getAssetUrl(
                            isDark
                                ? isMouseHover
                                    ? agentconnectBtnAlternatifHoverSvgUrl
                                    : agentconnectBtnAlternatifSvgUrl
                                : isMouseHover
                                ? agentconnectBtnPrincipalHoverSvgUrl
                                : agentconnectBtnPrincipalSvgUrl
                        )}
                    />
                </a>
                <p>
                    <a
                        className={cx(
                            "agentconnect-button__hint",
                            fr.cx("fr-text--sm", "fr-mt-1v")
                        )}
                        href="https://agentconnect.gouv.fr/"
                        target="_blank"
                    >
                        {t("what is AgentConnect ?")}
                    </a>
                </p>
            </div>
        );
    })
);

AgentConnectButton.displayName = symToStr({ AgentConnectButton });

export default AgentConnectButton;

const { useTranslation, addAgentConnectButtonTranslations } = createComponentI18nApi({
    "componentName": symToStr({ AgentConnectButton }),
    "frMessages": {
        /* spell-checker: disable */
        "what is AgentConnect ?": "Qu’est-ce que AgentConnect ?"
        /* spell-checker: enable */
    }
});

addAgentConnectButtonTranslations({
    "lang": "en",
    "messages": {
        "what is AgentConnect ?": "What's AgentConnect ?"
    }
});

export { addAgentConnectButtonTranslations };
