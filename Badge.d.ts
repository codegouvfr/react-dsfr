import React, { type ReactNode, type CSSProperties } from "react";
import type { AlertProps } from "./Alert";
export type BadgeProps = {
    id?: string;
    className?: string;
    style?: CSSProperties;
    severity?: AlertProps.Severity | "new";
    small?: boolean;
    noIcon?: boolean;
    /** Default: "p" */
    as?: "p" | "span";
    children: NonNullable<ReactNode>;
};
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-badge> */
export declare const Badge: React.MemoExoticComponent<React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>>>;
export default Badge;
