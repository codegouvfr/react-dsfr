"use client";
import { FooterBottomItem } from "@codegouvfr/react-dsfr/Footer";

export function ClientFooterItem() {
    return (
        <FooterBottomItem
            bottomItem={{
                iconId: "fr-icon-arrow-down-line",
                linkProps: {
                    href: `https://example.com`,
                },
                text: "A client side bottom item",

            }}
        />
    );
}