import "../assets/search-bar-button.css";
export type SearchButtonProps = {
    searchInputId: string;
    onClick: ((text: string) => void) | undefined;
};
export declare function SearchButton(props: SearchButtonProps): JSX.Element | null;
