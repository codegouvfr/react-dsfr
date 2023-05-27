import React, { type CSSProperties } from "react";
export type FranceConnectButtonProps = {
    className?: string;
    redirectUrl: string;
    /** Default: false */
    plus?: boolean;
    classes?: Partial<Record<"root" | "login" | "brand", string>>;
    style?: CSSProperties;
};
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-franceconnectbutton> */
export declare const FranceConnectButton: React.MemoExoticComponent<React.ForwardRefExoticComponent<FranceConnectButtonProps & React.RefAttributes<HTMLDivElement>>>;
export default FranceConnectButton;
declare const addFranceConnectButtonTranslations: (params: {
    lang: string;
    messages: Partial<{
        "what is service": (params: {
            plus: boolean;
        }) => string;
        "new window": string;
    }>;
}) => void;
export { addFranceConnectButtonTranslations };
