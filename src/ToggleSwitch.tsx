import React, {
    memo,
    forwardRef,
    ReactNode,
    useId,
    useState,
    useEffect,
    type CSSProperties
} from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";

export type ToggleSwitchProps = ToggleSwitchProps.Controlled | ToggleSwitchProps.Uncontrolled;

export namespace ToggleSwitchProps {
    export type Common = {
        className?: string;
        label: ReactNode;
        helperText?: ReactNode;
        /** Default: true */
        showCheckedHint?: boolean;
        /** Default: false */
        disabled?: boolean;
        /** Default: "left" */
        labelPosition?: "left" | "right";
        classes?: Partial<Record<"root" | "label" | "input" | "hint", string>>;
        style?: CSSProperties;
        name?: string;
    };

    export type Uncontrolled = Common & {
        /** Default: "false" */
        defaultChecked?: boolean;
        checked?: never;
        onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
        inputTitle: string;
    };

    export type Controlled = Common & {
        defaultChecked?: never;
        checked: boolean;
        onChange: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
        inputTitle?: string;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-toggleswitch> */
export const ToggleSwitch = memo(
    forwardRef<HTMLDivElement, ToggleSwitchProps>((props, ref) => {
        const {
            className,
            label,
            helperText,
            defaultChecked = false,
            checked: props_checked,
            showCheckedHint = true,
            disabled = false,
            labelPosition = "right",
            classes = {},
            onChange,
            inputTitle,
            style,
            name,
            ...rest
        } = props;

        const [checked, setChecked] = useState(defaultChecked);

        useEffect(() => {
            if (defaultChecked === undefined) {
                return;
            }

            setChecked(defaultChecked);
        }, [defaultChecked]);

        assert<Equals<keyof typeof rest, never>>();

        const { inputId, hintId } = (function useClosure() {
            const id = useId();

            const inputId = `toggle-${id}`;

            const hintId = `toggle-${id}-hint-text`;

            return { inputId, hintId };
        })();

        const { t } = useTranslation();

        const onInputChange = useConstCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const checked = e.currentTarget.checked;

            if (props_checked === undefined) {
                setChecked(checked);
                onChange?.(checked, e);
            } else {
                onChange(checked, e);
            }
        });

        return (
            <div
                className={cx(
                    fr.cx("fr-toggle", labelPosition === "left" && "fr-toggle--label-left"),
                    classes.root,
                    className
                )}
                ref={ref}
                style={style}
            >
                <input
                    onChange={onInputChange}
                    type="checkbox"
                    disabled={disabled || undefined}
                    className={cx(fr.cx("fr-toggle__input"), classes.input)}
                    aria-describedby={hintId}
                    id={inputId}
                    title={inputTitle}
                    checked={props_checked ?? checked}
                    {...(name !== undefined && { name: name })}
                />
                <label
                    className={cx(fr.cx("fr-toggle__label"), classes.label)}
                    htmlFor={inputId}
                    {...(showCheckedHint && {
                        "data-fr-checked-label": t("checked"),
                        "data-fr-unchecked-label": t("unchecked")
                    })}
                >
                    {label}
                </label>
                {helperText && (
                    <p className={cx(fr.cx("fr-hint-text"), classes.hint)} id={hintId}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    })
);

ToggleSwitch.displayName = symToStr({ ToggleSwitch });

const { useTranslation, addToggleSwitchTranslations } = createComponentI18nApi({
    "componentName": symToStr({ ToggleSwitch }),
    "frMessages": {
        /* spell-checker: disable */
        "checked": "Activé",
        "unchecked": "Désactivé"
        /* spell-checker: enable */
    }
});

addToggleSwitchTranslations({
    "lang": "en",
    "messages": {
        "checked": "Active",
        "unchecked": "Inactive"
    }
});

export { addToggleSwitchTranslations };

export default ToggleSwitch;
