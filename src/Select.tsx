"use client";

import React, { memo, forwardRef, ReactNode, useId, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type SelectProps = {
    id?: string;
    className?: string;
    label: ReactNode;
    hint?: ReactNode;
    nativeSelectProps: React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    >;
    children: ReactNode;
    /** Default: false */
    disabled?: boolean;
    /** Default: "default" */
    state?: "success" | "error" | "info" | "default";
    /** The message won't be displayed if state is "default" */
    stateRelatedMessage?: ReactNode;
    style?: CSSProperties;
};

/**
 * @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-select>
 * */
export const Select = memo(
    forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
        const {
            id: id_props,
            className,
            label,
            hint,
            nativeSelectProps,
            disabled = false,
            children,
            state = "default",
            stateRelatedMessage,
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-select-group",
            "explicitlyProvidedId": id_props
        });

        const selectId = (function useClosure() {
            const id = useId();

            if (nativeSelectProps.id !== undefined) {
                return nativeSelectProps.id;
            }

            return `select-${id}`;
        })();

        const stateDescriptionId = `select-${useId()}-desc`;
        const messagesGroupId = `${selectId}-messages-group`;

        return (
            <div
                id={id}
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
                {Boolean(label || hint) && (
                    <label className={fr.cx("fr-label")} htmlFor={selectId}>
                        {label}
                        {hint !== undefined && (
                            <span className={fr.cx("fr-hint-text")}>{hint}</span>
                        )}
                    </label>
                )}
                <select
                    {...nativeSelectProps}
                    className={cx(fr.cx("fr-select"), nativeSelectProps.className)}
                    id={selectId}
                    aria-describedby={stateDescriptionId}
                    disabled={disabled}
                >
                    {children}
                </select>
                <div id={messagesGroupId} className={fr.cx("fr-messages-group")} aria-live="polite">
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
                                        case "info":
                                            return "fr-info-text";
                                    }
                                    assert<Equals<typeof state, never>>(false);
                                })()
                            )}
                        >
                            {stateRelatedMessage}
                        </p>
                    )}
                </div>
            </div>
        );
    })
);

Select.displayName = symToStr({ Select });

export default Select;
