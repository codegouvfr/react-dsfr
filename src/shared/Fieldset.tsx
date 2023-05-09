import React, {
    useId,
    memo,
    forwardRef,
    type ReactNode,
    type CSSProperties,
    type InputHTMLAttributes,
    type DetailedHTMLProps
} from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { cx } from "../tools/cx";
import { fr } from "../fr";

export type FieldsetProps = FieldsetProps.Radio | FieldsetProps.Checkbox;

export namespace FieldsetProps {
    export type Common = {
        className?: string;
        classes?: Partial<Record<"root" | "legend" | "content", string>>;
        style?: CSSProperties;
        legend?: ReactNode;
        hintText?: ReactNode;
        options: {
            label: ReactNode;
            hintText?: ReactNode;
            nativeInputProps: DetailedHTMLProps<
                InputHTMLAttributes<HTMLInputElement>,
                HTMLInputElement
            >;
        }[];
        /** Default: "vertical" */
        orientation?: "vertical" | "horizontal";
        /** Default: "default" */
        state?: "success" | "error" | "default";
        /**
         * The message won't be displayed if state is "default".
         * If the state is "error" providing a message is mandatory
         **/
        stateRelatedMessage?: ReactNode;
        /** Default: false */
        disabled?: boolean;
        /** default: false */
        small?: boolean;
    };

    export type Radio = Common & {
        type: "radio";
        name?: string;
    };

    export type Checkbox = Common & {
        type: "checkbox";
        name?: never;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-radiobutton> */
export const Fieldset = memo(
    forwardRef<HTMLFieldSetElement, FieldsetProps>((props, ref) => {
        const {
            className,
            classes = {},
            style,
            legend,
            hintText,
            options,
            orientation = "vertical",
            state = "default",
            stateRelatedMessage,
            disabled = false,
            type,
            name: name_props,
            small = false,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { getInputId, legendId, errorDescId, successDescId } = (function useClosure() {
            const id = `${type}${name_props === undefined ? "" : `-${name_props}`}-${useId()}`;

            const getInputId = (i: number) => `${id}-${i}`;

            const legendId = `${id}-legend`;

            const errorDescId = `${id}-desc-error`;
            const successDescId = `${id}-desc-valid`;

            return { getInputId, legendId, errorDescId, successDescId };
        })();

        const radioName = (function useClosure() {
            const id = useId();

            return name_props ?? `radio-name-${id}`;
        })();

        return (
            <fieldset
                className={cx(
                    fr.cx(
                        "fr-fieldset",
                        orientation === "horizontal" && "fr-fieldset--inline",
                        (() => {
                            switch (state) {
                                case "default":
                                    return undefined;
                                case "error":
                                    return "fr-fieldset--error";
                                case "success":
                                    return "fr-fieldset--valid";
                            }
                        })()
                    ),
                    classes.root,
                    className
                )}
                disabled={disabled}
                style={style}
                aria-labelledby={cx(
                    legendId,
                    (() => {
                        switch (state) {
                            case "default":
                                return undefined;
                            case "error":
                                return errorDescId;
                            case "success":
                                return successDescId;
                        }
                    })()
                )}
                role={state === "default" ? undefined : "group"}
                {...rest}
                ref={ref}
            >
                {legend !== undefined && (
                    <legend
                        id={legendId}
                        className={cx(
                            fr.cx("fr-fieldset__legend", "fr-text--regular"),
                            classes.legend
                        )}
                    >
                        {legend}
                        {hintText !== undefined && (
                            <span className={fr.cx("fr-hint-text")}>{hintText}</span>
                        )}
                    </legend>
                )}
                <div className={cx(fr.cx("fr-fieldset__content"), classes.content)}>
                    {options.map(({ label, hintText, nativeInputProps }, i) => (
                        <div
                            className={fr.cx(`fr-${type}-group`, small && `fr-${type}-group--sm`)}
                            key={i}
                        >
                            <input
                                type={type}
                                id={getInputId(i)}
                                name={radioName}
                                {...nativeInputProps}
                            />
                            <label className={fr.cx("fr-label")} htmlFor={getInputId(i)}>
                                {label}
                                {hintText !== undefined && (
                                    <span className={fr.cx("fr-hint-text")}>{hintText}</span>
                                )}
                            </label>
                        </div>
                    ))}
                </div>
                {state !== "default" && (
                    <p
                        id={(() => {
                            switch (state) {
                                case "error":
                                    return errorDescId;
                                case "success":
                                    return successDescId;
                            }
                        })()}
                        className={fr.cx(
                            (() => {
                                switch (state) {
                                    case "error":
                                        return "fr-error-text";
                                    case "success":
                                        return "fr-valid-text";
                                }
                            })()
                        )}
                    >
                        {stateRelatedMessage ?? ""}
                    </p>
                )}
            </fieldset>
        );
    })
);

Fieldset.displayName = symToStr({ Fieldset });

export default Fieldset;
