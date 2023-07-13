import { useId } from "react";

/**
 * Eulerian analytics requires every element to have a unique ID.
 * This hook help generate such an ID in the case they are not explicitly provided.
 */
export function useAnalyticsId(params: { explicitlyProvidedId?: string; defaultIdPrefix: string }) {
    const { explicitlyProvidedId, defaultIdPrefix } = params;

    const id = useId();

    return explicitlyProvidedId ?? `${defaultIdPrefix}-${id}`;
}
