import {
    type ComponentProps,
    type CSSProperties,
    forwardRef,
    memo,
    type ReactNode,
    useId
} from "react";
import { assert, type Equals } from "tsafe";
import { fr, type FrIconClassName, type RiIconClassName } from "./fr";
import React from "react";
import { type CxArg } from "tss-react";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type SegmentedControlProps = {
    id?: string;
    className?: string;
    name?: string;
    classes?: Partial<
        Record<
            "root" | "legend" | "hintText" | "elements" | "element-each" | "element-each__label",
            CxArg
        >
    >;
    style?: CSSProperties;
    /** default: false */
    small?: boolean;
    /**
     * Minimum 1, Maximum 5.
     *
     * All with icon or all without icon.
     */
    segments: SegmentedControlProps.Segments;
} & (
    | SegmentedControlProps.WithLegend
    | SegmentedControlProps.WithInlineLegend
    | SegmentedControlProps.WithHiddenLegend
);

//https://main--ds-gouv.netlify.app/example/component/segmented/
export namespace SegmentedControlProps {
    export type WithLegend = {
        inlineLegend?: boolean;
        legend: ReactNode;
        hintText?: ReactNode;
        hideLegend?: boolean;
    };

    export type WithInlineLegend = {
        inlineLegend: true;
        legend: ReactNode;
        hintText?: ReactNode;
        hideLegend?: never;
    };

    export type WithHiddenLegend = {
        inlineLegend?: never;
        legend?: ReactNode;
        hintText?: never;
        hideLegend: true;
    };

    export type Segment = {
        label: ReactNode;
        nativeInputProps?: ComponentProps<"input">;
        iconId?: FrIconClassName | RiIconClassName;
    };

    export type SegmentWithIcon = Segment & {
        iconId: FrIconClassName | RiIconClassName;
    };

    export type SegmentWithoutIcon = Segment & {
        iconId?: never;
    };

    export type Segments =
        | [SegmentWithIcon, SegmentWithIcon?, SegmentWithIcon?, SegmentWithIcon?, SegmentWithIcon?]
        | [
              SegmentWithoutIcon,
              SegmentWithoutIcon?,
              SegmentWithoutIcon?,
              SegmentWithoutIcon?,
              SegmentWithoutIcon?
          ];
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-segmented-control> */
export const SegmentedControl = memo(
    forwardRef<HTMLFieldSetElement, SegmentedControlProps>((props, ref) => {
        const {
            id: props_id,
            name: props_name,
            className,
            classes = {},
            style,
            small = false,
            segments,
            hideLegend,
            inlineLegend,
            legend,
            hintText,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": `fr-segmented${props_name === undefined ? "" : `-${props_name}`}`,
            "explicitlyProvidedId": props_id
        });

        const getInputId = (i: number) => `${id}-${i}`;

        const segmentedName = (function useClosure() {
            const id = useId();

            return props_name ?? `segmented-name-${id}`;
        })();

        return (
            <fieldset
                id={id}
                className={cx(
                    fr.cx(
                        "fr-segmented",
                        small && "fr-segmented--sm",
                        hideLegend && "fr-segmented--no-legend"
                    ),
                    classes.root,
                    className
                )}
                ref={ref}
                style={style}
                {...rest}
            >
                {legend !== undefined && (
                    <legend
                        className={cx(
                            fr.cx(
                                "fr-segmented__legend",
                                inlineLegend && "fr-segmented__legend--inline"
                            ),
                            classes.legend
                        )}
                    >
                        {legend}
                        {hintText !== undefined && (
                            <span className={cx(fr.cx("fr-hint-text"), classes.hintText)}>
                                {hintText}
                            </span>
                        )}
                    </legend>
                )}
                <div className={cx(fr.cx("fr-segmented__elements"), classes.elements)}>
                    {segments.map((segment, index) => {
                        if (!segment) return null;

                        const segmentId = getInputId(index);
                        return (
                            <div
                                className={cx(
                                    fr.cx("fr-segmented__element"),
                                    classes["element-each"]
                                )}
                                key={index}
                            >
                                <input
                                    {...segment.nativeInputProps}
                                    id={segmentId}
                                    name={segmentedName}
                                    type="radio"
                                />
                                {segment.label && (
                                    <label
                                        className={cx(
                                            fr.cx(
                                                segment.iconId !== undefined && segment.iconId,
                                                "fr-label"
                                            ),
                                            classes["element-each__label"]
                                        )}
                                        htmlFor={segmentId}
                                    >
                                        {segment.label}
                                    </label>
                                )}
                            </div>
                        );
                    })}
                </div>
            </fieldset>
        );
    })
);
