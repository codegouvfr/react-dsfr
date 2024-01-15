import React, {
    memo,
    forwardRef,
    ReactNode,
    useId,
    type InputHTMLAttributes,
    type TextareaHTMLAttributes,
    type DetailedHTMLProps,
    type CSSProperties
} from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";

export type InputProps = InputProps.RegularInput | InputProps.TextArea;

export namespace InputProps {
    export type Common = {
        className?: string;
        id?: string;
        label: ReactNode;
        hintText?: ReactNode;
        hideLabel?: boolean;
        /** default: false */
        disabled?: boolean;
        iconId?: FrIconClassName | RiIconClassName;
        classes?: Partial<
            Record<"root" | "label" | "description" | "nativeInputOrTextArea" | "message", string>
        >;
        style?: CSSProperties;
        /** Default: "default" */
        state?: "success" | "error" | "default";
        /** The message won't be displayed if state is "default" */
        stateRelatedMessage?: ReactNode;
        addon?: ReactNode;
    };

    export type RegularInput = Common & {
        /** Default: false */
        textArea?: false;
        /** Props forwarded to the underlying <input /> element */
        nativeInputProps?: DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >;

        nativeTextAreaProps?: never;
    };

    export type TextArea = Common & {
        /** Default: false */
        textArea: true;
        /** Props forwarded to the underlying <textarea /> element */
        nativeTextAreaProps?: DetailedHTMLProps<
            TextareaHTMLAttributes<HTMLTextAreaElement>,
            HTMLTextAreaElement
        >;

        nativeInputProps?: never;
    };
}

/**
 * @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-input>
 * */
export const Input = memo(
    forwardRef<HTMLDivElement, InputProps>((props, ref) => {
        const {
            className,
            id,
            label,
            hintText,
            hideLabel,
            disabled = false,
            iconId,
            classes = {},
            style,
            state = "default",
            stateRelatedMessage,
            textArea = false,
            nativeTextAreaProps,
            nativeInputProps,
            addon,
            ...rest
        } = props;

        const nativeInputOrTextAreaProps =
            (textArea ? nativeTextAreaProps : nativeInputProps) ?? {};

        const NativeInputOrTextArea = textArea ? "textarea" : "input";

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
                        nativeInputProps?.type === "file" ? "fr-upload-group" : "fr-input-group",
                        disabled && "fr-input-group--disabled",
                        (() => {
                            switch (state) {
                                case "error":
                                    return "fr-input-group--error";
                                case "success":
                                    return "fr-input-group--valid";
                                case "default":
                                    return undefined;
                            }
                        })()
                    ),
                    classes.root,
                    className
                )}
                style={style}
                ref={ref}
                id={id}
                {...rest}
            >
                <label
                    className={cx(fr.cx("fr-label", hideLabel && "fr-sr-only"), classes.label)}
                    htmlFor={inputId}
                >
                    {label}
                    {hintText !== undefined && <span className="fr-hint-text">{hintText}</span>}
                </label>
                {(() => {
                    const nativeInputOrTextArea = (
                        <NativeInputOrTextArea
                            {...(nativeInputOrTextAreaProps as {})}
                            className={cx(
                                fr.cx(
                                    "fr-input",
                                    (() => {
                                        switch (state) {
                                            case "error":
                                                return "fr-input--error";
                                            case "success":
                                                return "fr-input--valid";
                                            case "default":
                                                return undefined;
                                        }
                                    })()
                                ),
                                classes.nativeInputOrTextArea
                            )}
                            disabled={disabled || undefined}
                            aria-describedby={messageId}
                            type={textArea ? undefined : nativeInputProps?.type ?? "text"}
                            id={inputId}
                        />
                    );

                    const hasIcon = iconId !== undefined;
                    const hasAddon = addon !== undefined;
                    return hasIcon || hasAddon ? (
                        <div
                            className={fr.cx(
                                "fr-input-wrap",
                                hasIcon && iconId,
                                hasAddon && "fr-input-wrap--addon"
                            )}
                        >
                            {nativeInputOrTextArea}
                            {hasAddon && addon}
                        </div>
                    ) : (
                        nativeInputOrTextArea
                    );
                })()}
                {state !== "default" && (
                    <p
                        id={messageId}
                        className={cx(
                            fr.cx(
                                (() => {
                                    switch (state) {
                                        case "error":
                                            return "fr-error-text";
                                        case "success":
                                            return "fr-valid-text";
                                    }
                                })()
                            ),
                            classes.message
                        )}
                    >
                        {stateRelatedMessage}
                    </p>
                )}
            </div>
        );
    })
);

Input.displayName = symToStr({ Input });

export default Input;
