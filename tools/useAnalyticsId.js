import { useId } from "react";
/**
 * Eulerian analytics requires every element to have a unique ID.
 * This hook help generate such an ID in the case they are not explicitly provided.
 */
export function useAnalyticsId(params) {
    const { explicitlyProvidedId, defaultIdPrefix } = params;
    const id = useId();
    return explicitlyProvidedId !== null && explicitlyProvidedId !== void 0 ? explicitlyProvidedId : `${defaultIdPrefix}-${id}`;
}
//# sourceMappingURL=useAnalyticsId.js.map