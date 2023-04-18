import { useEffect } from "react";
/**
 * Equivalent of https://docs.evt.land/api/react-hooks
 */
export function useObservable(effect, deps) {
    useEffect(() => {
        const subscriptions = [];
        effect({
            "registerSubscription": subscription => subscriptions.push(subscription)
        });
        return () => {
            subscriptions.forEach(subscription => subscription.unsubscribe());
            subscriptions.length = 0;
        };
    }, deps);
}
//# sourceMappingURL=useObservable.js.map