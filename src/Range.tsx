"use client";

import React, {
    CSSProperties,
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    memo,
    ReactNode
} from "react";
import { assert, Equals } from "tsafe";
import { symToStr } from "tsafe/symToStr";
import { CxArg } from "tss-react";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type RangeProps = {
    id?: string;
    className?: string;
    classes?: Partial<
        Record<
            | "root"
            | "label"
            | "messagesGroup"
            | "message"
            | "hintText"
            | "rangeWrapper"
            | "output"
            | "input"
            | "input2"
            | "min"
            | "max",
            CxArg
        >
    >;
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

//https://main--ds-gouv.netlify.app/example/component/range/
export namespace RangeProps {
    type NativeInputProps = DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >;

    export type AsSingle = {
        double?: never;
        nativeInputProps?: NativeInputProps;
    };

    export type AsDouble = {
        double: true;
        nativeInputProps?: [NativeInputProps?, NativeInputProps?];
    };
}

// const DoubleRange = (props: Pick<RangeProps, "min" | "max" | "nativeInputProps" | "step">) => {};

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-segmented-control> */
export const Range = memo(
    forwardRef<HTMLDivElement, RangeProps>((props, ref) => {
        const {
            id: props_id,
            className,
            classes = {},
            disabled = false,
            double,
            hideMinMax = false,
            hintText,
            label,
            max,
            min,
            nativeInputProps,
            prefix,
            small = false,
            state = "default",
            stateRelatedMessage,
            step,
            style,
            suffix,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        if (min > max) {
            throw new Error(`min must be lower than max`);
        }

        const id = useAnalyticsId({
            "defaultIdPrefix": `fr-range`,
            "explicitlyProvidedId": props_id
        });

        const labelId = `${id}-label`;

        const errorMessageId = `${id}-message-error`;
        const successMessageId = `${id}-message-valid`;
        const messagesWrapperId = `${id}-messages`;

        return (
            <div
                className={cx(
                    fr.cx(
                        "fr-range-group",
                        disabled && "fr-range-group--disabled",
                        state === "error" && "fr-range-group--error",
                        state === "success" && "fr-range-group--valid"
                    ),
                    classes.root,
                    className
                )}
                style={style}
                ref={ref}
                id={`${id}-group`}
                {...rest}
            >
                <label className={cx(fr.cx("fr-label"), classes.label)} id={labelId}>
                    {label}
                    {hintText !== undefined && (
                        <span className={cx(fr.cx("fr-hint-text"), classes.hintText)}>
                            {hintText}
                        </span>
                    )}
                </label>
                <div
                    className={cx(
                        fr.cx(
                            "fr-range",
                            small && "fr-range--sm",
                            double && "fr-range--double",
                            step !== undefined && "fr-range--step"
                        ),
                        classes.rangeWrapper
                    )}
                    data-fr-prefix={prefix}
                    data-fr-suffix={suffix}
                >
                    <span className={cx(fr.cx("fr-range__output"), classes.output)}></span>
                    {(() => {
                        const partialInputProps = {
                            type: "range",
                            id,
                            name: id,
                            min,
                            max,
                            step,
                            disabled,
                            "aria-labelledby": labelId,
                            "aria-describedby": messagesWrapperId,
                            "aria-invalid": state === "error"
                        };

                        if (double) {
                            const inputProps1 = nativeInputProps?.[0] ?? {};
                            const inputProps2 = nativeInputProps?.[1] ?? {};

                            return (
                                <>
                                    <input {...inputProps1} {...partialInputProps} />
                                    <input
                                        {...inputProps2}
                                        {...partialInputProps}
                                        id={`${id}-2`}
                                        name={`${id}-2`}
                                    />
                                </>
                            );
                        }

                        const inputProps = nativeInputProps ?? {};
                        return <input {...inputProps} {...partialInputProps} />;
                    })()}
                    {!hideMinMax && (
                        <>
                            <span className={cx(fr.cx("fr-range__min"), classes.min)} aria-hidden>
                                {min}
                            </span>
                            <span className={cx(fr.cx("fr-range__max"), classes.max)} aria-hidden>
                                {max}
                            </span>
                        </>
                    )}
                </div>
                <div
                    className={cx(fr.cx("fr-messages-group"), classes.messagesGroup)}
                    id={messagesWrapperId}
                    aria-live="polite"
                >
                    <p
                        id={cx({
                            [errorMessageId]: state === "error",
                            [successMessageId]: state === "success"
                        })}
                        className={cx(
                            fr.cx("fr-message", {
                                "fr-message--error": state === "error",
                                "fr-message--valid": state === "success"
                            }),
                            classes.message
                        )}
                    >
                        {stateRelatedMessage}
                    </p>
                </div>
            </div>
        );
    })
);

Range.displayName = symToStr({ Range });

export default Range;
