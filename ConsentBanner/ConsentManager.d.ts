import { type ConsentBannerContentProps } from "./ConsentBannerContent";
export type ConsentManagerProps = Required<Omit<ConsentBannerContentProps, "siteName">>;
export declare function ConsentManager({ gdprLinkProps, services, consentModalButtonProps }: ConsentManagerProps): JSX.Element;
