export type SearchButtonProps = {
    id: string;
    searchInputId: string;
    onClick: ((text: string) => void) | undefined;
};
export declare function SearchButton(props: SearchButtonProps): JSX.Element | null;
