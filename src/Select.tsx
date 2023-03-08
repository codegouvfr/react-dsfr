"use client";

import React, { memo, forwardRef, ReactNode, useId, type CSSProperties, ForwardedRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";

export type SelectProps<Options extends GenericOption<DefaultOptionValue>[]> = {
    options: Options;
    className?: string;
    label: ReactNode;
    hint?: ReactNode;
    nativeSelectProps?: Omit<
        React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
        "value" | "defaultValue"
    > & {
        // Overriding the type of value and defaultValue to only accept the value type of the options
        value?: Options[number]["value"];
        defaultValue?: Options[number]["value"];
    };
    /** Default: false */
    disabled?: boolean;
    /** Default: "default" */
    state?: "success" | "error" | "default";
    /** The message won't be displayed if state is "default" */
    stateRelatedMessage?: ReactNode;
    style?: CSSProperties;
    placeholder?: string;
};
export type GenericOption<OptionValue> = {
    value: OptionValue;
    label: string;
    disabled?: boolean;
    hidden?: boolean;
    selected?: boolean;
};

type DefaultOptionValue = string | number | readonly string[] | undefined;

/**
 * @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-select>
 * */
const SelectComponent = <T extends GenericOption<DefaultOptionValue>[]>(
    props: SelectProps<T>,
    ref: React.LegacyRef<HTMLDivElement>
) => {
    const {
        className,
        label,
        hint,
        nativeSelectProps,
        disabled = false,
        options,
        state = "default",
        stateRelatedMessage,
        placeholder,
        style,
        ...rest
    } = props;

    assert<Equals<keyof typeof rest, never>>();
    const elementId = useId();
    const selectId = nativeSelectProps?.id || `select-${elementId}`;
    const stateDescriptionId = nativeSelectProps?.id
        ? `${nativeSelectProps?.id}-desc`
        : `select-${elementId}-desc`;
    const displayedOptions =
        placeholder !== undefined
            ? [
                  {
                      label: placeholder,
                      value: "",
                      disabled: true
                  },
                  ...options
              ]
            : options;
    return (
        <div
            className={cx(
                fr.cx(
                    "fr-select-group",
                    disabled && "fr-select-group--disabled",
                    (() => {
                        switch (state) {
                            case "error":
                                return "fr-select-group--error";
                            case "success":
                                return "fr-select-group--valid";
                            case "default":
                                return undefined;
                        }
                        assert<Equals<typeof state, never>>(false);
                    })()
                ),
                className
            )}
            ref={ref}
            style={style}
            {...rest}
        >
            <label className={fr.cx("fr-label")} htmlFor={selectId}>
                {label}
                {hint !== undefined && <span className={fr.cx("fr-hint-text")}>{hint}</span>}
            </label>
            <select
                {...nativeSelectProps}
                className={cx(fr.cx("fr-select"), nativeSelectProps?.className)}
                id={selectId}
                aria-describedby={stateDescriptionId}
                disabled={disabled}
            >
                {displayedOptions.map((option, index) => (
                    <option {...option} key={`${option.value}-${index}`}>
                        {option.label}
                    </option>
                ))}
            </select>
            {state !== "default" && (
                <p
                    id={stateDescriptionId}
                    className={fr.cx(
                        (() => {
                            switch (state) {
                                case "error":
                                    return "fr-error-text";
                                case "success":
                                    return "fr-valid-text";
                            }
                            assert<Equals<typeof state, never>>(false);
                        })()
                    )}
                >
                    {stateRelatedMessage}
                </p>
            )}
        </div>
    );
};

const ForwardedSelect = forwardRef(SelectComponent) as <
    T extends GenericOption<DefaultOptionValue>[]
>(
    props: SelectProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof SelectComponent>;

export const Select = memo(ForwardedSelect) as typeof ForwardedSelect & {
    displayName: string;
};

Select.displayName = symToStr({ Select });

export default Select;
