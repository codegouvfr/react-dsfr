import React, { type DetailedHTMLProps, type InputHTMLAttributes, type CSSProperties } from "react";
export type SearchBarProps = {
    className?: string;
    /** Default: "Rechercher" (or translation) */
    label?: string;
    /** Props forwarded to the underlying <input /> element */
    nativeInputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    /** Default: false */
    big?: boolean;
    classes?: Partial<Record<"root" | "label" | "input", string>>;
    style?: CSSProperties;
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
};
/**
 * @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-input>
 * */
export declare const SearchBar: React.MemoExoticComponent<React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLDivElement>>>;
export default SearchBar;
declare const addSearchBarTranslations: (params: {
    lang: string;
    messages: Partial<{
        label: string;
    }>;
}) => void;
export { addSearchBarTranslations };
