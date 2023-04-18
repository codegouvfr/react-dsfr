export type StatefulObservable<T> = {
    current: T;
    subscribe: (next: (data: T) => void) => Subscription;
};
export type Subscription = {
    unsubscribe(): void;
};
export declare function createStatefulObservable<T>(getInitialValue: () => T): StatefulObservable<T>;
