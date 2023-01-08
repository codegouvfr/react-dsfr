import React, { memo, forwardRef, ReactNode, useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";

export type InputProps = InputProps.Input | InputProps.TextArea;

export namespace InputProps {
    export type Common = {
        className?: string;
        label: ReactNode;
        hintText?: ReactNode;
        /** default: false */
        disabled?: boolean;
        message?: {
            type: "success" | "error";
            text: ReactNode;
        };
        iconId?: FrIconClassName | RiIconClassName;
        classes?: Partial<
            Record<"root" | "label" | "description" | "nativeInputOrTextArea" | "message", string>
        >;
    };

    export type Input = Common & {
        /** Default: false */
        isTextArea?: false;
        /** Props forwarded to the underlying <input /> element */
        nativeInputProps?: InputHTMLAttributes<HTMLInputElement>;
        nativeTextAreaProps?: never;
    };

    export type TextArea = Common & {
        /** Default: false */
        isTextArea: true;
        nativeInputProps?: never;
        /** Props forwarded to the underlying <textarea /> element */
        nativeTextAreaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
    };
}

/**
 * @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-highlight>
 * */
export const Input = memo(
    forwardRef<HTMLDivElement, InputProps>((props, ref) => {
        const {
            className,
            label,
            hintText,
            disabled = false,
            message,
            iconId: iconId_props,
            isTextArea = false,
            nativeInputProps = {},
            nativeTextAreaProps = {},
            classes = {},
            ...rest
        } = props;

        const nativeInputOrTextAreaProps = isTextArea ? nativeTextAreaProps : nativeInputProps;

        const NativeInputOrTexArea = isTextArea ? "textarea" : "input";

        assert<Equals<keyof typeof rest, never>>();

        const inputId = (function useClosure() {
            const id = useId();

            return nativeInputOrTextAreaProps.id ?? `input-${id}`;
        })();

        const messageId = `${inputId}-desc-error`;

        return (
            <div
                className={cx(
                    fr.cx(
                        "fr-input-group",
                        disabled && "fr-input-group--disabled",
                        message !== undefined &&
                            (() => {
                                switch (message.type) {
                                    case "error":
                                        return "fr-input-group--error";
                                    case "success":
                                        return "fr-input-group--valid";
                                }
                                assert<Equals<typeof message.type, never>>(false);
                            })()
                    ),
                    classes.root,
                    className
                )}
                ref={ref}
                {...rest}
            >
                <label className={cx(fr.cx("fr-label"), classes.label)} htmlFor={inputId}>
                    {label}
                    {hintText !== undefined && <span className="fr-hint-text">{hintText}</span>}
                </label>
                {(() => {
                    const nativeInputOrTextArea = (
                        <NativeInputOrTexArea
                            {...(nativeInputOrTextAreaProps as {})}
                            className={cx(
                                fr.cx(
                                    "fr-input",
                                    message !== undefined &&
                                        (() => {
                                            switch (message.type) {
                                                case "error":
                                                    return "fr-input--error";
                                                case "success":
                                                    return "fr-input--valid";
                                            }
                                            assert<Equals<typeof message.type, never>>(false);
                                        })()
                                ),
                                classes.nativeInputOrTextArea
                            )}
                            disabled={disabled || undefined}
                            aria-describedby={messageId}
                            type={isTextArea ? undefined : nativeInputProps.type ?? "text"}
                            id={inputId}
                        />
                    );

                    const iconId =
                        iconId_props ??
                        (!isTextArea && nativeInputProps.type === "date"
                            ? "ri-calendar-line"
                            : undefined);

                    return iconId === undefined ? (
                        nativeInputOrTextArea
                    ) : (
                        <div className={fr.cx("fr-input-wrap", iconId)}>
                            {nativeInputOrTextArea}
                        </div>
                    );
                })()}
                {message !== undefined && (
                    <p id={messageId} className={cx(fr.cx("fr-error-text"), classes.message)}>
                        {message.text}
                    </p>
                )}
            </div>
        );
    })
);

Input.displayName = symToStr({ Input });

export default Input;
