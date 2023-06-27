import type { HeaderProps } from "../Header";
import type { FooterProps } from "../Footer";
export declare const headerFooterDisplayItem: HeaderProps.QuickAccessItem.Button & FooterProps.BottomItem.Button;
/** @see <https://components.react-dsfr.fr/?path=/docs/components-display> */
export declare function Display(): JSX.Element;
export declare namespace Display {
    var displayName: "Display";
}
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
