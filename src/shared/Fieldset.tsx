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
import { useAnalyticsId } from "../tools/useAnalyticsId";

export type FieldsetProps = FieldsetProps.Radio | FieldsetProps.Checkbox | FieldsetProps.RadioRich;

export namespace FieldsetProps {
    export type RegularOption = {
        label: ReactNode;
        hintText?: ReactNode;
        nativeInputProps: DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >;
    };
    export type RadioRichOption = RegularOption & {
        illustration: ReactNode;
    };
    export type Common = {
        className?: string;
        id?: string;
        classes?: Partial<Record<"root" | "legend" | "content", string>>;
        style?: CSSProperties;
        legend?: ReactNode;
        hintText?: ReactNode;

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
        rich?: false;
        options: RegularOption[];
    };

    export type Checkbox = Common & {
        type: "checkbox";
        name?: never;
        rich?: false;
        options: RegularOption[];
    };

    export type RadioRich = Common & {
        type: "radio";
        name?: string;
        rich: true;
        options: RadioRichOption[];
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-radiobutton> */
export const Fieldset = memo(
    forwardRef<HTMLFieldSetElement, FieldsetProps>((props, ref) => {
        const {
            className,
            id: id_props,
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
            rich,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": `fr-fieldset-${type}${
                name_props === undefined ? "" : `-${name_props}`
            }`,
            "explicitlyProvidedId": id_props
        });

        const getInputId = (i: number) => `${id}-${i}`;

        const legendId = `${id}-legend`;

        const errorDescId = `${id}-desc-error`;
        const successDescId = `${id}-desc-valid`;
        const messagesWrapperId = `${id}-messages`;

        const radioName = (function useClosure() {
            const id = useId();

            return name_props ?? `radio-name-${id}`;
        })();

        return (
            <fieldset
                id={id}
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
                aria-labelledby={cx(legend !== undefined && legendId, messagesWrapperId)}
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
                            className={fr.cx(
                                `fr-${type}-group`,
                                rich && "fr-radio-rich",
                                small && `fr-${type}-group--sm`
                            )}
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
                            {rich && (
                                <div className={fr.cx("fr-radio-rich__img")}>
                                    {options[i].illustration}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div
                    className={fr.cx("fr-messages-group")}
                    id={messagesWrapperId}
                    aria-live="assertive"
                >
                    {stateRelatedMessage !== undefined && (
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
                                "fr-message",
                                (() => {
                                    switch (state) {
                                        case "error":
                                            return "fr-message--error";
                                        case "success":
                                            return "fr-message--valid";
                                    }
                                })()
                            )}
                        >
                            {stateRelatedMessage}
                        </p>
                    )}
                </div>
            </fieldset>
        );
    })
);

Fieldset.displayName = symToStr({ Fieldset });

export default Fieldset;
