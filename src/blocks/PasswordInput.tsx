import React, {
    type DetailedHTMLProps,
    forwardRef,
    type InputHTMLAttributes,
    memo,
    type ReactNode,
    useId
} from "react";
import { assert, type Equals } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { fr } from "../fr";
import { createComponentI18nApi } from "../i18n";
import type { InputProps } from "../Input";
import { cx } from "../tools/cx";
import type { FrClassName } from "../fr/generatedFromCss/classNames";
import { useAnalyticsId } from "../tools/useAnalyticsId";

export type PasswordInputProps = Omit<
    InputProps.Common,
    "state" | "stateRelatedMessage" | "iconId" | "classes"
> & {
    classes?: Partial<Record<"root" | "input" | "label" | "checkbox", string>>;
    /** Default "Your password must contain:", if empty string the hint wont be displayed */
    messagesHint?: ReactNode;
    messages?: {
        severity: PasswordInputProps.Severity;
        message: ReactNode;
    }[];
    nativeInputProps?: Omit<
        DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        "type"
    >;
};

export namespace PasswordInputProps {
    type ExtractSeverity<ClassName extends string> =
        ClassName extends `fr-message--${infer Severity}` ? Severity : never;

    export type Severity = ExtractSeverity<FrClassName>;
}

/**
 * @see <https://components.react-dsfr.fr/?path=/docs/blocks-passwordinput
 * */
export const PasswordInput = memo(
    forwardRef<HTMLDivElement, PasswordInputProps>((props, ref) => {
        const { t } = useTranslation();

        const {
            className,
            id: id_props,
            label,
            hintText,
            hideLabel,
            disabled = false,
            classes = {},
            style,
            messages = [],
            nativeInputProps,
            messagesHint = t("your password must contain"),
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "explicitlyProvidedId": id_props,
            "defaultIdPrefix": "password-input"
        });

        const inputId = (function useClosure() {
            const id = useId();

            return nativeInputProps?.id ?? `password-${id}`;
        })();
        const togglePasswordShowId = `${inputId}-toggle-show`;
        const messagesGroupId = `${inputId}-messages-group`;
        const messageGroupId = `${inputId}-message-group`;

        const hasError = messages.find(({ severity }) => severity === "error") !== undefined;
        const isSuccess =
            messages.length !== 0 &&
            messages.find(({ severity }) => severity !== "valid") === undefined;

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
                id={id}
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
                        disabled={disabled}
                        {...(messages.length !== 0 && { "aria-describedby": messagesGroupId })}
                    />
                </div>
                {messages.length !== 0 && (
                    <div
                        className={fr.cx("fr-messages-group")}
                        id={messagesGroupId}
                        aria-live="assertive"
                    >
                        {messagesHint !== "" && (
                            <p className={fr.cx("fr-message")} id={messageGroupId}>
                                {messagesHint}
                            </p>
                        )}
                        {messages.map(({ severity, message }, index) => (
                            <p
                                key={index}
                                className={fr.cx("fr-message", `fr-message--${severity}`)}
                                id={`${messageGroupId}-${index}`}
                            >
                                {message}
                            </p>
                        ))}
                    </div>
                )}
                <div
                    className={cx(
                        fr.cx(
                            "fr-password__checkbox",
                            "fr-checkbox-group",
                            "fr-checkbox-group--sm"
                        ),
                        classes.checkbox
                    )}
                >
                    <input
                        aria-label={t("show password")}
                        id={togglePasswordShowId}
                        type="checkbox"
                        disabled={disabled || undefined}
                    />
                    <label
                        className={cx(fr.cx("fr-password__checkbox", "fr-label"), classes.checkbox)}
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
