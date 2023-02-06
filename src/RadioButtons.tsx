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
import { cx } from "./tools/cx";
import { fr } from "./fr";

export type RadioButtonsProps = {
    className?: string;
    classes?: Partial<Record<"root" | "legend" | "content", string>>;
    style?: CSSProperties;
    legend: ReactNode;
    hintText?: ReactNode;
    name?: string;
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
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-radiobutton> */
export const RadioButtons = memo(
    forwardRef<HTMLFieldSetElement, RadioButtonsProps>((props, ref) => {
        const {
            className,
            classes = {},
            style,
            name: name_props,
            legend,
            hintText,
            options,
            orientation = "vertical",
            state = "default",
            stateRelatedMessage,
            disabled = false,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { getRadioId, legendId, errorDescId, successDescId } = (function useClosure() {
            const id = `radio${name_props === undefined ? "" : `-${name_props}`}-${useId()}`;

            const getRadioId = (i: number) => `${id}-${i}`;

            const legendId = `${id}-legend`;

            const errorDescId = `${id}-desc-error`;
            const successDescId = `${id}-desc-valid`;

            return { getRadioId, legendId, errorDescId, successDescId };
        })();

        const name = (function useClosure() {
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
                <legend
                    id={legendId}
                    className={cx(fr.cx("fr-fieldset__legend", "fr-text--regular"), classes.legend)}
                >
                    {legend}
                    {hintText !== undefined && (
                        <span className={fr.cx("fr-hint-text")}>{hintText}</span>
                    )}
                </legend>
                <div className={cx(fr.cx("fr-fieldset__content"), classes.content)}>
                    {options.map(({ label, hintText, nativeInputProps }, i) => (
                        <div className={fr.cx("fr-radio-group")} key={i}>
                            <input
                                type="radio"
                                id={getRadioId(i)}
                                name={name}
                                {...nativeInputProps}
                            />
                            <label className={fr.cx("fr-label")} htmlFor={getRadioId(i)}>
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

RadioButtons.displayName = symToStr({ RadioButtons });

export default RadioButtons;
