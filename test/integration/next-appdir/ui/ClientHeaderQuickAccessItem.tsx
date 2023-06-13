"use client";

import { HeaderQuickAccessItem } from "@codegouvfr/react-dsfr/Header";

export function ClientHeaderQuickAccessItem() {
    return (
        <HeaderQuickAccessItem
            quickAccessItem={{
                iconId: "fr-icon-article-fill",
                linkProps: {
                    href: `/some-page`,
                },
                text: "A client side item",

            }}
        />
    );
}