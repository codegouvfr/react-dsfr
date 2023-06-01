import React, { type CSSProperties } from "react";
import "./assets/agentconnect.css";
export type AgentConnectButtonProps = AgentConnectButtonProps.WithUrl | AgentConnectButtonProps.WithOnClick;
export declare namespace AgentConnectButtonProps {
    type Common = {
        className?: string;
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
    export {};
}
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
