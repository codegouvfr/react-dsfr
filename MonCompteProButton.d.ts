import React, { type CSSProperties } from "react";
import "./assets/moncomptepro.css";
export type FranceConnectButtonProps = FranceConnectButtonProps.WithUrl | FranceConnectButtonProps.WithOnClick;
export declare namespace FranceConnectButtonProps {
    type Common = {
        id?: string;
        className?: string;
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
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-franceconnectbutton> */
export declare const MonCompteProButton: React.MemoExoticComponent<React.ForwardRefExoticComponent<FranceConnectButtonProps & React.RefAttributes<HTMLDivElement>>>;
export default MonCompteProButton;
declare const addMonCompteProButtonTranslations: (params: {
    lang: string;
    messages: Partial<{
        "what is service": string;
        "new window": string;
    }>;
}) => void;
export { addMonCompteProButtonTranslations };
