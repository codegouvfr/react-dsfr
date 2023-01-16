"use client";

import React, { memo, forwardRef, ReactNode, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";

export type SelectProps = {
    className?: string;
    label: ReactNode;
    nativeSelectProps: React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    >;
    children: ReactNode;
    /** Default: false */
    disabled?: boolean;
    /** Default: "default" */
    state?: "success" | "error" | "default";
    /** The message won't be displayed if state is "default" */
    stateRelatedMessage?: ReactNode;
};

/**
 * @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-select>
 * */
export const Select = memo(
    forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
        const {
            className,
            label,
            nativeSelectProps,
            disabled = false,
            children,
            state = "default",
            stateRelatedMessage,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const selectId = `select-${useId()}`;
        const stateDescriptionId = `select-${useId()}-desc`;

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
                {...rest}
            >
                <label className={fr.cx("fr-label")} htmlFor={selectId}>
                    {label}
                </label>
                <select
                    {...nativeSelectProps}
                    className={cx(fr.cx("fr-select"), nativeSelectProps.className)}
                    id={selectId}
                    aria-describedby={stateDescriptionId}
                >
                    {children}
                </select>
                {state !== "default" && (
                    <p
                        id={stateDescriptionId}
                        className={fr.cx(
                            "fr-valid-text",
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
    })
);

Select.displayName = symToStr({ Select });

export default Select;
