import type { ReactElement } from "react";

export namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Element extends ReactElement<any, any> {}
}
