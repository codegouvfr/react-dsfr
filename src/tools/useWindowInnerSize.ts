import { useEffect, useReducer } from "react";

export function useWindowInnerSize() {
    const [, triggerRerender] = useReducer(() => ({}), {});

    useEffect(() => {
        const handleResize = () => triggerRerender();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        "windowInnerWidth": window.innerWidth,
        "windowInnerHeight": window.innerHeight
    };
}
