import React from "react";
import type { ReactNode, CSSProperties } from "react";
export type TooltipProps = TooltipProps.WithClickAction | TooltipProps.WithHoverAction;
export declare namespace TooltipProps {
    type Common = {
        title: ReactNode;
        id?: string;
        className?: string;
        style?: CSSProperties;
    };
    type WithClickAction = Common & {
        kind: "click";
        children?: undefined;
    };
    type WithHoverAction = Common & {
        kind?: "hover";
        children?: ReactNode;
    };
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tooltip> */
export declare const Tooltip: React.MemoExoticComponent<React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<HTMLSpanElement>>>;
declare const addTooltipTranslations: (params: {
    lang: string;
    messages: Partial<{
        "tooltip-button-text": string;
    }>;
}) => void;
export { addTooltipTranslations };
export default Tooltip;
