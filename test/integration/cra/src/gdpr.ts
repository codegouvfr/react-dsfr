
import { createConsentBanner } from "@codegouvfr/react-dsfr/ConsentBannerNext";


export const { ConsentBanner, useFinalitiesConsent } = createConsentBanner<
    | "analytics" 
    | "statistics.traffic" 
    | "statistics.deviceInfo" 
    | "personalization" 
    | "advertising"
>();