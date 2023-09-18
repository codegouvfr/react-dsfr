"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir";
import { defaultColorScheme } from "./defaultColorScheme";
import { addAlertTranslations } from "@codegouvfr/react-dsfr/Alert";
import Link from "next/link";

declare module "@codegouvfr/react-dsfr/next-appdir" {
    interface RegisterLink { 
        Link: typeof Link;
    }
}

startReactDsfr({ 
	defaultColorScheme, 
	Link,
    checkNonce: true
});

export function StartDsfr(){
	return null;
}

addAlertTranslations({
    "lang": "fr",
    "messages": {
        "hide message": "Masquer le message (modifié)",
    }
});
