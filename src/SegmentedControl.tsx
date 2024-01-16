import {
    CSSProperties,
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    memo,
    ReactNode,
    useId
} from "react";
import { assert, Equals } from "tsafe";
import { fr, FrIconClassName, RiIconClassName } from "./fr";
import React from "react";
import { CxArg } from "tss-react";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type SegmentedControlProps = {
    id?: string;
    className?: string;
    name?: string;
    classes?: Partial<
        Record<"root" | "legend" | "elements" | "element-each" | "element-each__label", CxArg>
    >;
    style?: CSSProperties;
    small?: boolean;
    legend?: ReactNode;
    /**
     * Minimum 1, Maximum 5.
     *
     * All with icon or all without icon.
     */
    segments: SegmentedControlProps.Segments;
} & (SegmentedControlProps.WithInlineLegend | SegmentedControlProps.WithHiddenLegend);

//https://main--ds-gouv.netlify.app/example/component/segmented/
export namespace SegmentedControlProps {
    export type WithInlineLegend = {
        inlineLegend: true;
        legend: ReactNode;
        hideLegend?: never;
    };

    export type WithHiddenLegend = {
        inlineLegend?: never;
        legend?: ReactNode;
        hideLegend: true;
    };

    export type Segment = {
        label: ReactNode;
        nativeInputProps?: DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >;
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
            small,
            segments,
            hideLegend,
            inlineLegend,
            legend,
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
                            </div>
                        );
                    })}
                </div>
            </fieldset>
        );
    })
);
