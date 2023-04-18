/// <reference types="react" />
import type { Subscription } from "../StatefulObservable";
/**
 * Equivalent of https://docs.evt.land/api/react-hooks
 */
export declare function useObservable(effect: (params: {
    registerSubscription: (subscription: Subscription) => void;
}) => void, deps: React.DependencyList): void;
