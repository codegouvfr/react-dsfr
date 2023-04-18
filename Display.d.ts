import React, { type CSSProperties } from "react";
import type { HeaderProps } from "./Header";
import type { FooterProps } from "./Footer";
export type DisplayProps = {
    className?: string;
    style?: CSSProperties;
};
export declare const headerFooterDisplayItem: HeaderProps.QuickAccessItem.Button & FooterProps.BottomItem.Button;
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-display> */
export declare const Display: React.MemoExoticComponent<React.ForwardRefExoticComponent<DisplayProps & React.RefAttributes<HTMLDialogElement>>>;
export default Display;
declare const addDisplayTranslations: (params: {
    lang: string;
    messages: Partial<{
        "display settings": string;
        close: string;
        "pick a theme": string;
        "light theme": string;
        "dark theme": string;
        "system theme": string;
        "system theme hint": string;
    }>;
}) => void;
export { addDisplayTranslations };
