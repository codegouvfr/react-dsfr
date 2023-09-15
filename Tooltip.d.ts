import React, { ReactElement } from "react";
export type TooltipProps = TooltipProps.WithClickAction | TooltipProps.WithHoverAction;
export declare namespace TooltipProps {
    type Common = {
        description: string;
        id?: string;
        className?: string;
    };
    type WithClickAction = Common & {
        kind: "click";
        children?: ReactElement | string;
    };
    type WithHoverAction = Common & {
        kind?: "hover";
        children: ReactElement | string;
    };
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tooltip> */
export declare const Tooltip: React.MemoExoticComponent<React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<HTMLSpanElement>>>;
export default Tooltip;
