import type { ReactNode } from "react";
import type { RegisteredLinkProps } from "../link";

let wrap:
    | {
          brandTop: ReactNode;
          homeLinkProps: RegisteredLinkProps & { title: string };
      }
    | undefined = undefined;

export function setBrandTopAndHomeLinkProps(params: {
    brandTop: ReactNode;
    homeLinkProps: RegisteredLinkProps & { title: string };
}) {
    wrap = params;
}

export function getBrandTopAndHomeLinkProps() {
    return wrap;
}
