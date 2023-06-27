import { isBrowser } from "../tools/isBrowser";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
export function createUseConsent(params) {
    const { useFinalityConsent, processConsentChanges, useConsentCallback } = params;
    const useConsentManagementClientSide = params => {
        const { consentCallback } = params !== null && params !== void 0 ? params : {};
        useConsentCallback({ consentCallback });
        const finalityConsent = useFinalityConsent();
        const assumeConsent = useConstCallback((finality) => processConsentChanges({
            "type": "atomic change",
            finality,
            "isConsentGiven": true
        }));
        return {
            assumeConsent,
            finalityConsent
        };
    };
    const useConsentManagementServerSide = () => {
        return {
            "finalityConsent": undefined,
            "assumeConsent": () => {
                throw new Error("Cannot assume consent on the server side");
            }
        };
    };
    const useConsent = isBrowser ? useConsentManagementClientSide : useConsentManagementServerSide;
    return { useConsent };
}
//# sourceMappingURL=useConsent.js.map