export type SearchButtonProps = {
    id: string;
    searchInputId: string;
    clearInputOnSearch: boolean;
    allowEmptySearch: boolean;
    onClick: ((text: string) => void) | undefined;
};
export declare function SearchButton(props: SearchButtonProps): JSX.Element | null;
