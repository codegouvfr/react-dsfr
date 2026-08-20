import React, {
    useId,
    memo,
    forwardRef,
    type ReactNode,
    type CSSProperties,
    type ComponentProps
} from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { cx } from "../tools/cx";
import { fr } from "../fr";
import { useAnalyticsId } from "../tools/useAnalyticsId";

export type FieldsetProps = FieldsetProps.Radio | FieldsetProps.Checkbox;

export namespace FieldsetProps {
    export type Common = {
        className?: string;
        id?: string;
        classes?: Partial<Record<"root" | "legend" | "content" | "inputGroup", string>>;
        style?: CSSProperties;
        legend?: ReactNode;
        hintText?: ReactNode;
        options: {
            label: ReactNode;
            hintText?: ReactNode;
            nativeInputProps: ComponentProps<"input">;
        }[];

        /** Default: "vertical" */
        orientation?: "vertical" | "horizontal";
        /** Default: "default" */
        state?: "success" | "error" | "info" | "default";
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

    export type Radio = Omit<Common, "options"> & {
        type: "radio";
        name?: string;
        options: (Common["options"][number] & {
            illustration?: ReactNode;
        })[];
    };

    export type Checkbox = Common & {
        type: "checkbox";
        name?: never;
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
            ...rest
        } = props;

        const isRichRadio =
            type === "radio" &&
            options.find(options => options.illustration !== undefined) !== undefined;

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
        const infoDescId = `${id}-desc-info`;
        const messagesWrapperId = `${id}-messages`;

        const radioName = (function useClosure() {
            const id = useId();

            return name_props ?? `radio-name-${id}`;
        })();

        const renderOption = (params: {
            option: FieldsetProps.Radio["options"][number];
            i: number | undefined;
        }) => {
            const { option, i } = params;
            const { label, hintText, nativeInputProps, ...rest } = option;

            const isRoot = i === undefined;

            const inputId = getInputId(i ?? 0);

            return (
                <div
                    className={cx(
                        fr.cx(
                            `fr-${type}-group`,
                            isRichRadio && "fr-radio-rich",
                            small && `fr-${type}-group--sm`
                        ),
                        isRoot ? className : undefined,
                        classes.inputGroup
                    )}
                    key={i}
                >
                    <input type={type} id={inputId} name={radioName} {...nativeInputProps} />
                    <label className={fr.cx("fr-label")} htmlFor={inputId}>
                        {label}
                        {hintText !== undefined && (
                            <span className={fr.cx("fr-hint-text")}>{hintText}</span>
                        )}
                    </label>
                    {"illustration" in rest && (
                        <div className={fr.cx("fr-radio-rich__img")}>{rest.illustration}</div>
                    )}
                </div>
            );
        };

        if (legend === undefined && stateRelatedMessage === undefined && options.length === 1) {
            return renderOption({ option: options[0], i: undefined });
        }

        const messageId = (() => {
            switch (state) {
                case "error":
                    return errorDescId;
                case "success":
                    return successDescId;
                case "info":
                    return infoDescId;
            }
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
                                case "info":
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
                        aria-describedby={messageId}
                    >
                        {legend}
                        {hintText !== undefined && (
                            <span className={fr.cx("fr-hint-text")}>{hintText}</span>
                        )}
                    </legend>
                )}
                <div className={cx(fr.cx("fr-fieldset__content"), classes.content)}>
                    {options.map((option, i) => renderOption({ option, i }))}
                </div>
                <div
                    className={fr.cx("fr-messages-group")}
                    id={messagesWrapperId}
                    aria-live={state === "error" ? "assertive" : undefined}
                >
                    {stateRelatedMessage !== undefined && (
                        <p
                            id={messageId}
                            className={fr.cx(
                                "fr-message",
                                (() => {
                                    switch (state) {
                                        case "error":
                                            return "fr-message--error";
                                        case "success":
                                            return "fr-message--valid";
                                        case "info":
                                            return "fr-message--info";
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
