import { isBrowser } from "../tools/isBrowser";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
export function createUseGdpr(params) {
    const { useFinalityConsent, processConsentChanges, useConsentCallback } = params;
    const useGdprClientSide = params => {
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
    const useGdprServerSide = () => {
        return {
            "finalityConsent": undefined,
            "assumeConsent": () => {
                throw new Error("Cannot assume consent on the server side");
            }
        };
    };
    const useGdpr = isBrowser ? useGdprClientSide : useGdprServerSide;
    return { useGdpr };
}
//# sourceMappingURL=useGdpr.js.map