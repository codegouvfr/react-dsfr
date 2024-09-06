import React, { type CSSProperties } from "react";
import "./assets/proconnect-btn.css";
export type ProConnectButtonProps = ProConnectButtonProps.WithUrl | ProConnectButtonProps.WithOnClick;
export declare namespace ProConnectButtonProps {
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
    export {};
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-proconnectbutton> */
export declare const ProConnectButton: React.MemoExoticComponent<React.ForwardRefExoticComponent<ProConnectButtonProps & React.RefAttributes<HTMLDivElement>>>;
export default ProConnectButton;
declare const addProConnectButtonTranslations: (params: {
    lang: string;
    messages: Partial<{
        "what is service": string;
        "new window": string;
    }>;
}) => void;
export { addProConnectButtonTranslations };
