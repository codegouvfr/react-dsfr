let openConsentModal_global: (() => void) | undefined = undefined;

export function getOpenConsentModal(): (() => void) | undefined {
    return openConsentModal_global;
}

export function setOpenConsentModal(openConsentModal: () => void): void {
    openConsentModal_global = openConsentModal;
}
