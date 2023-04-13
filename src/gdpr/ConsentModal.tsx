import { createModal } from "../Modal";

export const { ConsentModal, consentModalButtonProps } = createModal({
    name: "Consent",
    isOpenedByDefault: false
});
