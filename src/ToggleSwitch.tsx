import React, { memo, forwardRef, ReactNode, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

import { cx } from "./tools/cx";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";

export type ToggleSwitchProps = {
    className?: string;
    label: ReactNode;
    text?: ReactNode;
    checked?: boolean;
    /** Default: "true" */
    showCheckedHint?: boolean;
    /** Default: "false" */
    disabled?: boolean;
    /** Default: "left" */
    labelPosition?: "left" | "right";
    classes?: Partial<Record<"root" | "label" | "input" | "hint", string>>;
};

export type ToggleSwitchGroupProps = {
    className?: string;
    /** Needs at least one ToggleSwitch */
    togglesProps: [ToggleSwitchProps, ...ToggleSwitchProps[]];
    /** Default: "true" */
    showCheckedHint?: boolean;
    /** Default: "left" */
    labelPosition?: "left" | "right";
    classes?: Partial<Record<"root" | "li", string>>;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-toggleswitch> */
export const ToggleSwitchGroup = memo<ToggleSwitchGroupProps>(props => {
    const {
        className,
        togglesProps,
        showCheckedHint = true,
        labelPosition = "right",
        classes = {},
        ...rest
    } = props;

    assert<Equals<keyof typeof rest, never>>();

    return (
        <ul className={cx(fr.cx("fr-toggle__list"), classes.root, className)} {...rest}>
            {togglesProps &&
                togglesProps.map((toggleProps, i) => (
                    <li key={i} className={classes.li}>
                        <ToggleSwitch
                            {...{
                                ...toggleProps,
                                showCheckedHint,
                                labelPosition
                            }}
                        />
                    </li>
                ))}
        </ul>
    );
});

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-toggleswitch> */
export const ToggleSwitch = memo(
    forwardRef<HTMLDivElement, ToggleSwitchProps>((props, ref) => {
        const {
            className,
            label,
            text,
            checked = false,
            showCheckedHint = true,
            disabled = false,
            labelPosition = "right",
            classes = {},
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const inputId = useId();

        const { t } = useTranslation();

        return (
            <div
                className={cx(
                    fr.cx("fr-toggle", labelPosition === "left" && "fr-toggle--label-left"),
                    classes.root,
                    className
                )}
                ref={ref}
            >
                <input
                    type="checkbox"
                    disabled={disabled || undefined}
                    className={cx(fr.cx("fr-toggle__input"), classes.input)}
                    aria-describedby={`${inputId}-hint-text`}
                    id={inputId}
                    checked={checked}
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
                {text && (
                    <p
                        className={cx(fr.cx("fr-hint-text"), classes.hint)}
                        id={`${inputId}-hint-text`}
                    >
                        {text}
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
