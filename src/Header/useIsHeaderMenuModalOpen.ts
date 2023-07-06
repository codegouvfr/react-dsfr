import { headerMenuModalId } from "./Header";
import { useIsModalOpen } from "../Modal/useIsModalOpen";

export function useIsHeaderMenuModalOpen() {
    return useIsModalOpen({
        "id": headerMenuModalId,
        "isOpenedByDefault": false
    });
}
