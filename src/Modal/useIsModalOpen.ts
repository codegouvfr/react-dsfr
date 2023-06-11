"use client";

import { useEffect, useState } from "react";
import { assert } from "tsafe/assert";

export function useIsModalOpen(modal: { isOpenedByDefault: boolean; id: string }): boolean {
    const { id, isOpenedByDefault } = modal;

    const [isModalOpen, setIsModalOpen] = useState(isOpenedByDefault);

    useEffect(() => {
        const element = document.getElementById(id);

        assert(element !== null, `The ${id} modal isn't mounted`);

        const onConceal = () => setIsModalOpen(false);

        element.addEventListener("dsfr.conceal", onConceal);

        const onDisclose = () => setIsModalOpen(true);

        element.addEventListener("dsfr.disclose", onDisclose);

        return () => {
            element.removeEventListener("dsfr.conceal", onConceal);
            element.removeEventListener("dsfr.disclose", onDisclose);
        };
    }, [id]);

    return isModalOpen;
}
