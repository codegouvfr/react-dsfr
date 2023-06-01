import React, { forwardRef, memo, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { assert, type Equals } from "tsafe/assert";
import "./assets/agentconnect.css";
import { cx } from "./tools/cx";

export type AgentConnectButtonProps = AgentConnectButtonProps.Common &
    (AgentConnectButtonProps.WithUrl | AgentConnectButtonProps.WithOnClick);

export namespace AgentConnectButtonProps {
    export type Common = {
        className?: string;
        style?: CSSProperties;
    };
    export type WithUrl = {
        url: string;
        onClick?: never;
    };
    export type WithOnClick = {
        url?: never;
        onClick: React.MouseEventHandler<HTMLButtonElement>;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export const AgentConnectButton = memo(
    forwardRef<HTMLDivElement, AgentConnectButtonProps>((props, ref) => {
        const { className, url: href, style, onClick, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const Inner = onClick !== undefined ? "button" : "a";
        const innerProps = (onClick !== undefined ? { onClick } : { href }) as any;

        return (
            <div className={className} style={style} ref={ref}>
                <span className="agentconnect-button__preload-hover" />
                <Inner className="agentconnect-button__link" {...innerProps} />
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
