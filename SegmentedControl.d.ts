import { type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { type FrIconClassName, type RiIconClassName } from "./fr";
import React from "react";
import { type CxArg } from "tss-react";
export type SegmentedControlProps = {
    id?: string;
    className?: string;
    name?: string;
    classes?: Partial<Record<"root" | "legend" | "hintText" | "elements" | "element-each" | "element-each__label", CxArg>>;
    style?: CSSProperties;
    /** default: false */
    small?: boolean;
    /**
     * Minimum 1, Maximum 5.
     *
     * All with icon or all without icon.
     */
    segments: SegmentedControlProps.Segments;
} & (SegmentedControlProps.WithLegend | SegmentedControlProps.WithInlineLegend | SegmentedControlProps.WithHiddenLegend);
export declare namespace SegmentedControlProps {
    type WithLegend = {
        inlineLegend?: boolean;
        legend: ReactNode;
        hintText?: ReactNode;
        hideLegend?: boolean;
    };
    type WithInlineLegend = {
        inlineLegend: true;
        legend: ReactNode;
        hintText?: ReactNode;
        hideLegend?: never;
    };
    type WithHiddenLegend = {
        inlineLegend?: never;
        legend?: ReactNode;
        hintText?: never;
        hideLegend: true;
    };
    type Segment = {
        label: ReactNode;
        nativeInputProps?: ComponentProps<"input">;
        iconId?: FrIconClassName | RiIconClassName;
    };
    type SegmentWithIcon = Segment & {
        iconId: FrIconClassName | RiIconClassName;
    };
    type SegmentWithoutIcon = Segment & {
        iconId?: never;
    };
    type Segments = [SegmentWithIcon, SegmentWithIcon?, SegmentWithIcon?, SegmentWithIcon?, SegmentWithIcon?] | [
        SegmentWithoutIcon,
        SegmentWithoutIcon?,
        SegmentWithoutIcon?,
        SegmentWithoutIcon?,
        SegmentWithoutIcon?
    ];
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-segmented-control> */
export declare const SegmentedControl: React.MemoExoticComponent<React.ForwardRefExoticComponent<SegmentedControlProps & React.RefAttributes<HTMLFieldSetElement>>>;
