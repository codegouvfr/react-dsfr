import { type GdprStore } from "./gdpr/GdprStore";
/**
 * Zustand like store based on ReactContext. See {@link GdprStore} for store content.
 */
export declare function useGdprStore(): GdprStore;
export declare function useGdprStore<T extends GdprStore[keyof GdprStore]>(slice: (state: GdprStore) => T): T;
