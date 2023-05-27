import React, { type CSSProperties } from "react";
export type AgentConnectButtonProps = {
    className?: string;
    redirectUrl: string;
    style?: CSSProperties;
};
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export declare const AgentConnectButton: React.MemoExoticComponent<React.ForwardRefExoticComponent<AgentConnectButtonProps & React.RefAttributes<HTMLDivElement>>>;
export default AgentConnectButton;
declare const addAgentConnectButtonTranslations: (params: {
    lang: string;
    messages: Partial<{
        "what is AgentConnect ?": string;
    }>;
}) => void;
export { addAgentConnectButtonTranslations };
