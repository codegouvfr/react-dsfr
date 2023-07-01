import React, { type CSSProperties } from "react";
export type SearchBarProps = {
    className?: string;
    /** Default: "Rechercher" (or translation) */
    label?: string;
    /** Default: false */
    big?: boolean;
    classes?: Partial<Record<"root" | "label", string>>;
    style?: CSSProperties;
    renderInput?: (
    /**
     * id and name must be forwarded to the <input /> component
     * the others params can, but it's not mandatory.
     **/
    params: {
        id: string;
        type: "search";
        className: string;
        placeholder: string;
    }) => JSX.Element;
    onButtonClick?: (text: string) => void;
};
/**
 * @see <https://components.react-dsfr.fr/?path=/docs/components-input>
 * */
export declare const SearchBar: React.MemoExoticComponent<React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLDivElement>>>;
export default SearchBar;
export declare const useTranslation: () => {
    t: (<K extends "label">(messageKey: K) => {
        label: string;
    }[K] extends (params: any) => infer R ? R : {
        label: string;
    }[K]) & (<K_1 extends never>(messageKey: K_1, params: {
        label: string;
    }[K_1] extends infer T ? T extends {
        label: string;
    }[K_1] ? T extends (params: any) => any ? Parameters<T>[0] : never : never : never) => {
        label: string;
    }[K_1] extends (params: any) => infer R_1 ? R_1 : {
        label: string;
    }[K_1]);
}, addSearchBarTranslations: (params: {
    lang: string;
    messages: Partial<{
        label: string;
    }>;
}) => void;
