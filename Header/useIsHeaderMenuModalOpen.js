import { useEffect, useState } from "react";
import { headerMenuModalIdPrefix } from "./Header";
import { useIsModalOpen } from "../Modal/useIsModalOpen";
import { symToStr } from "tsafe/symToStr";
export function useIsHeaderMenuModalOpen() {
    const [headerMenuModalId, setHeaderMenuModalId] = useState("");
    useEffect(() => {
        const matchingElements = document.querySelectorAll(`[id^='${headerMenuModalIdPrefix}']`);
        if (matchingElements.length > 1) {
            throw new Error(`There is more than one Header mounted on the page, you can't use ${symToStr({
                useIsHeaderMenuModalOpen
            })}`);
        }
        if (matchingElements.length === 0) {
            throw new Error(`The header is not mounted on the page, you can't use ${symToStr({
                useIsHeaderMenuModalOpen
            })}`);
        }
        setHeaderMenuModalId(matchingElements[0].id);
    }, []);
    return useIsModalOpen({
        "id": headerMenuModalId,
        "isOpenedByDefault": false
    });
}
//# sourceMappingURL=useIsHeaderMenuModalOpen.js.map