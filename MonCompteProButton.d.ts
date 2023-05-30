import React, { type CSSProperties } from "react";
import "./assets/moncomptepro.css";
export type FranceConnectButtonProps = {
    className?: string;
    url: string;
    classes?: Partial<Record<"root" | "login" | "brand", string>>;
    style?: CSSProperties;
};
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
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
