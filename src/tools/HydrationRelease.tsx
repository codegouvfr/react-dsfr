"use client";

import { useEffect } from "react";
import { prDsfrLoaded } from "../start";

/**
 * Releases the subtree marked with `data-fr-hydrating={id}` once it is
 * hydrated, so that the DSFR engine instruments it.
 *
 * Render it inside that subtree. It renders nothing, so it can be used by
 * components rendered as Server Components: only it crosses the boundary,
 * with a serializable id (`useId` works in Server Components).
 */
export function HydrationRelease(props: { id: string }) {
    const { id } = props;

    useEffect(() => {
        // The engine module may not be loaded yet: the call would be lost.
        prDsfrLoaded.then(() => {
            // @ts-expect-error
            window.dsfr.hydrated(id);
        });
    }, [id]);

    return null;
}
