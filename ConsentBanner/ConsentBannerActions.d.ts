import { type GdprService } from "../gdpr";
import { type ModalProps } from "../Modal";
export interface ConsentBannerActionsProps {
    services: GdprService[];
    consentModalButtonProps: ModalProps.ModalButtonProps;
}
export declare function ConsentBannerActions({ services, consentModalButtonProps }: ConsentBannerActionsProps): JSX.Element;
