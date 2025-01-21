import React, {
    type CSSProperties,
    type DetailedHTMLProps,
    forwardRef,
    type InputHTMLAttributes,
    LabelHTMLAttributes,
    memo,
    ReactNode,
    type TextareaHTMLAttributes,
    useId
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
            Record<
                "root" | "label" | "description" | "nativeInputOrTextArea" | "message" | "wrap",
                string
            >
        >;
        style?: CSSProperties;
        /** Default: "default" */
        state?: "success" | "error" | "info" | "default";
        /** The message won't be displayed if state is "default" */
        stateRelatedMessage?: ReactNode;
        addon?: ReactNode;
        action?: ReactNode;
    };

    export type RegularInput = Common & {
        /** Default: false */
        textArea?: false;
        /** Props forwarded to the underlying <input /> element */
        nativeInputProps?: DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >;
        nativeLabelProps?: DetailedHTMLProps<
            LabelHTMLAttributes<HTMLInputElement>,
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
        nativeLabelProps?: DetailedHTMLProps<
            LabelHTMLAttributes<HTMLTextAreaElement>,
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
            action,
            nativeLabelProps,
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
        const messagesGroupId = `${inputId}-messages-group`;

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
                {Boolean(label || hintText) && (
                    <label
                        className={cx(fr.cx("fr-label", hideLabel && "fr-sr-only"), classes.label)}
                        htmlFor={inputId}
                        {...(nativeLabelProps as {})}
                    >
                        {label}
                        {hintText !== undefined && <span className="fr-hint-text">{hintText}</span>}
                    </label>
                )}
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
                                            case "info":
                                            case "default":
                                                return undefined;
                                        }
                                    })()
                                ),
                                classes.nativeInputOrTextArea
                            )}
                            disabled={disabled || undefined}
                            aria-describedby={state !== "default" ? messageId : undefined}
                            type={textArea ? undefined : nativeInputProps?.type ?? "text"}
                            id={inputId}
                        />
                    );

                    const hasIcon = iconId !== undefined;
                    const hasAddon = addon !== undefined;
                    const hasAction = action !== undefined;
                    return hasIcon || hasAddon || hasAction ? (
                        <div
                            className={cx(
                                fr.cx(
                                    "fr-input-wrap",
                                    hasIcon && iconId,
                                    hasAddon && "fr-input-wrap--addon",
                                    hasAction && "fr-input-wrap--action"
                                ),
                                classes.wrap
                            )}
                        >
                            {nativeInputOrTextArea}
                            {hasAddon && addon}
                            {hasAction && action}
                        </div>
                    ) : (
                        nativeInputOrTextArea
                    );
                })()}
                <div id={messagesGroupId} className={fr.cx("fr-messages-group")} aria-live="polite">
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
                                            case "info":
                                                return "fr-info-text";
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
            </div>
        );
    })
);

Input.displayName = symToStr({ Input });

export default Input;
