/**
 * Eulerian analytics requires every element to have a unique ID.
 * This hook help generate such an ID in the case they are not explicitly provided.
 */
export declare function useAnalyticsId(params: {
    explicitlyProvidedId?: string;
    defaultIdPrefix: string;
}): string;
