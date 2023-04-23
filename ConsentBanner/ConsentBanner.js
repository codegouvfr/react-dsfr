import React, { memo } from "react";
import { symToStr } from "tsafe/symToStr";
import { createModal } from "../Modal";
import { ConsentManager } from "./ConsentManager";
import { ConsentBannerContentDisplayer } from "./ConsentBannerContentDisplayer";
import { useTranslation } from "./i18n";
const { ConsentModal, consentModalNativeButtonProps } = createModal({
    name: "Consent",
    isOpenedByDefault: false
});
export { consentModalNativeButtonProps };
/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-consentbanner> */
// TODO handle sub finalities (https://www.systeme-de-design.gouv.fr/uploads/Capture_d_ecran_2021_03_24_a_17_45_33_8ba8e1fabb_1_1dd3309589.png)
export const ConsentBanner = memo((props) => {
    const { gdprLinkProps, services } = props;
    const { t } = useTranslation();
    return (React.createElement(React.Fragment, null,
        React.createElement(ConsentModal, { title: t("consent modal title"), size: "large" },
            React.createElement(ConsentManager, { gdprLinkProps: gdprLinkProps, services: services, consentModalButtonProps: {
                    "nativeButtonProps": consentModalNativeButtonProps
                } })),
        React.createElement(ConsentBannerContentDisplayer, Object.assign({}, props, { consentModalButtonProps: {
                "nativeButtonProps": consentModalNativeButtonProps
            } }))));
});
ConsentBanner.displayName = symToStr({ ConsentBanner });
//# sourceMappingURL=ConsentBanner.js.map