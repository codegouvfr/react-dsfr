
import type { ReactNode } from "react";
import type { RegisteredLinkProps } from "../link";


let wrap: {
    brandTop: ReactNode;
    homeLinkProps: RegisteredLinkProps & { title: string };
} | undefined = undefined;

export function setBrandTopAndHomeLinkProps(params: {
    brandTop: ReactNode;
    homeLinkProps: RegisteredLinkProps & { title: string }
}) {
    wrap = params;
}

export function getBrandTopAndHomeLinkProps() {

    if (wrap === undefined) {
        throw new Error("The footer should be used in conjunction with the header.");
    }

    return wrap;
}
