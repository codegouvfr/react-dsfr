import { type RegisteredLinkProps } from "../link";
import { type ConsentBannerActionsProps } from "./ConsentBannerActions";
export interface ConsentBannerContentProps extends ConsentBannerActionsProps {
    /** Usually the same as {@link FooterProps.personalDataLinkProps} */
    gdprLinkProps: RegisteredLinkProps;
    /** Current website name */
    siteName: string;
}
export declare function ConsentBannerContent({ gdprLinkProps, siteName, services, consentModalButtonProps }: ConsentBannerContentProps): JSX.Element;
