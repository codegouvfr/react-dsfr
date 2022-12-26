"use client";

import { startReactDsfr } from "@codegouvfr/react-dsfr/next-appdir/start";
import { defaultColorScheme } from "./defaultColorScheme";
import "@codegouvfr/react-dsfr";
import Link from "next/link";

declare module "@codegouvfr/react-dsfr" {
    interface RegisterLink { 
        Link: typeof Link;
    }
}

startReactDsfr({ 
	defaultColorScheme, 
	Link ,
});

export default function StartDsfr(){
	return null;
}
