import React, {
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    memo,
    ReactNode,
    useId
} from "react";
import { assert, Equals } from "tsafe";
import { symToStr } from "tsafe/symToStr";
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import type { InputProps } from "../Input";
import { cx } from "../tools/cx";

export type MessageGroup = {
    state?: "success" | "error" | "default";
    message: ReactNode;
};

export type PasswordInputProps = Omit<
    InputProps.Common,
    "state" | "stateRelatedMessage" | "iconId"
> & {
    classes?: Partial<
        Record<"root" | "label" | "description" | "input" | "message" | "messageGroup", string>
    >;
    messagesGroup?: MessageGroup[];
    nativeInputProps?: Omit<
        DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        "type"
    >;
};

/**
 * @see <https://react-dsfr-components.etalab.studio/?path=/docs/blocks-passwordinput
 * */
export const PasswordInput = memo(
    forwardRef<HTMLDivElement, PasswordInputProps>((props, ref) => {
        const {
            className,
            label,
            hintText,
            hideLabel,
            disabled = false,
            classes = {},
            style,
            messagesGroup,
            nativeInputProps,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const inputId = (function useClosure() {
            const id = useId();

            return nativeInputProps?.id ?? `password-${id}`;
        })();
        const containerId = `${inputId}-container`;
        const togglePasswordShowId = `${inputId}-toggle-show`;
        const messagesGroupId = `${inputId}-messages-group`;
        const messageGroupId = `${inputId}-message-group`;

        const hasError = messagesGroup?.find(({ state: messageState }) => messageState === "error");
        const isSuccess = messagesGroup?.every(
            ({ state: messageState }) => messageState === "success"
        );

        return (
            <div
                className={cx(
                    fr.cx(
                        "fr-password",
                        disabled && "fr-input-group--disabled",
                        hasError && "fr-input-group--error",
                        isSuccess && "fr-input-group--valid"
                    ),
                    classes.root,
                    className
                )}
                id={containerId}
                style={style}
                ref={ref}
                {...rest}
            >
                <label
                    className={cx(fr.cx("fr-label", hideLabel && "fr-sr-only"), classes.label)}
                    htmlFor={inputId}
                >
                    {label}
                    {hintText !== undefined && <span className="fr-hint-text">{hintText}</span>}
                </label>
                <div className={fr.cx("fr-input-wrap")}>
                    <input
                        {...nativeInputProps}
                        className={cx(fr.cx("fr-password__input", "fr-input"), classes.input)}
                        id={inputId}
                        type="password"
                        disabled={disabled || undefined}
                        aria-describedby={messagesGroup && messagesGroupId}
                    />
                </div>
                {messagesGroup && (
                    <div
                        className={cx(fr.cx("fr-messages-group"), classes.messageGroup)}
                        id={messagesGroupId}
                        aria-live="assertive"
                    >
                        <p className={(fr.cx("fr-message"), classes.message)} id={messageGroupId}>
                            {t("your password must contain")}
                        </p>
                        {messagesGroup.map(({ state, message }, index) => (
                            <p
                                className={cx(
                                    fr.cx(
                                        "fr-message",
                                        (() => {
                                            switch (state) {
                                                case "error":
                                                    return "fr-message--error";
                                                case "success":
                                                    return "fr-message--valid";
                                                default:
                                                    return "fr-message--info";
                                            }
                                        })()
                                    ),
                                    classes.message
                                )}
                                id={`${messageGroupId}-${index}`}
                            >
                                {message}
                            </p>
                        ))}
                    </div>
                )}
                <div
                    className={fr.cx(
                        "fr-password__checkbox",
                        "fr-checkbox-group",
                        "fr-checkbox-group--sm"
                    )}
                >
                    <input
                        aria-label={t("show password")}
                        id={togglePasswordShowId}
                        type="checkbox"
                        disabled={disabled || undefined}
                    />
                    <label
                        className={fr.cx("fr-password__checkbox", "fr-label")}
                        htmlFor={togglePasswordShowId}
                    >
                        {t("show")}
                    </label>
                </div>
            </div>
        );
    })
);

const { useTranslation, addPasswordInputTranslations } = createComponentI18nApi({
    "componentName": symToStr({ PasswordInput }),
    "frMessages": {
        /* spell-checker: disable */
        "show": "Afficher",
        "show password": "Afficher le mot de passe",
        "your password must contain": "Votre mot de passe doit contenir :"
        /* spell-checker: enable */
    }
});

addPasswordInputTranslations({
    "lang": "en",
    "messages": {
        "show": "Show",
        "show password": "Show password",
        "your password must contain": "Your password must contain:"
    }
});

addPasswordInputTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "show": "Mostrar",
        "show password": "Mostrar contraseña",
        "your password must contain": "Su contraseña debe contener:"
        /* spell-checker: enable */
    }
});

PasswordInput.displayName = symToStr({ PasswordInput });

export default PasswordInput;
