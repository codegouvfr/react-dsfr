import React from "react";
import { type ConsentBannerContentProps } from "./ConsentBannerContent";
declare const consentModalButtonProps: import("../Modal").ModalProps.ModalButtonProps;
export { consentModalButtonProps };
export type ConsentBannerProps = Omit<ConsentBannerContentProps, "consentModalButtonProps">;
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-consentbanner> */
export declare const ConsentBanner: React.MemoExoticComponent<(props: ConsentBannerProps) => JSX.Element>;
