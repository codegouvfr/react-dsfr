export declare function observeInputValue(params: {
    inputElement: HTMLInputElement;
    callback: () => void;
}): {
    cleanup: () => void;
};
