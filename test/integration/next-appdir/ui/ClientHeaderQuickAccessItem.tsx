"use client";

import { HeaderQuickAccessItem } from "@codegouvfr/react-dsfr/Header";

export function ClientHeaderQuickAccessItem() {

    //NOTE: You can use hooks here

    return (
        <HeaderQuickAccessItem
            quickAccessItem={{
                iconId: "ri-layout-4-line",
                buttonProps: {
                    onClick: ()=> {

                        alert("Click on client item");

                    }
                },
                text: "A client side item",

            }}
        />
    );
}