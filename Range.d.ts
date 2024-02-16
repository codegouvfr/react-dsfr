import React, { type CSSProperties, type ReactNode, type ComponentProps } from "react";
import { type CxArg } from "tss-react";
export type RangeProps = {
    id?: string;
    className?: string;
    classes?: Partial<Record<"root" | "label" | "messagesGroup" | "message" | "hintText" | "rangeWrapper" | "output" | "input" | "input2" | "min" | "max", CxArg>>;
    style?: CSSProperties;
    small?: boolean;
    label: ReactNode;
    hintText?: ReactNode;
    /** default: false */
    min: number;
    max: number;
    /** default: false */
    hideMinMax?: boolean;
    step?: number;
    prefix?: string;
    suffix?: string;
    /** default: false */
    disabled?: boolean;
    /** Default: "default" */
    state?: "success" | "error" | "default";
    /** The message won't be displayed if state is "default" */
    stateRelatedMessage?: ReactNode;
} & (RangeProps.AsSingle | RangeProps.AsDouble);
export declare namespace RangeProps {
    type NativeInputProps = ComponentProps<"input">;
    export type AsSingle = {
        double?: never;
        nativeInputProps?: NativeInputProps;
    };
    export type AsDouble = {
        double: true;
        nativeInputProps?: [NativeInputProps?, NativeInputProps?];
    };
    export {};
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-segmented-control> */
export declare const Range: React.MemoExoticComponent<React.ForwardRefExoticComponent<RangeProps & React.RefAttributes<HTMLDivElement>>>;
export default Range;
