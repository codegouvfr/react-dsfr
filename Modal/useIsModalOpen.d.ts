export declare function useIsModalOpen(modal: {
    isOpenedByDefault: boolean;
    id: string;
}, callbacks?: {
    onConceal?: () => void;
    onDisclose?: () => void;
}): boolean;
