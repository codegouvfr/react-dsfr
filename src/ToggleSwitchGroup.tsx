import React, { memo } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { ToggleSwitch } from "./ToggleSwitch";
import type { ToggleSwitchProps } from "./ToggleSwitch";

export type ToggleSwitchGroupProps = {
    className?: string;
    /** Default: true */
    showCheckedHint?: ToggleSwitchProps["showCheckedHint"];
    /** Default: right */
    labelPosition?: ToggleSwitchProps["labelPosition"];
    classes?: Partial<Record<"root" | "li", string>>;
    /** Needs at least one ToggleSwitch */
    toggles: [ToggleSwitchPropsWithoutSharedProps, ...ToggleSwitchPropsWithoutSharedProps[]];
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-toggleswitchgroup> */
export const ToggleSwitchGroup = memo<ToggleSwitchGroupProps>(props => {
    const {
        className,
        toggles,
        showCheckedHint = true,
        labelPosition = "right",
        classes = {},
        ...rest
    } = props;

    assert<Equals<keyof typeof rest, never>>();

    return (
        <ul className={cx(fr.cx("fr-toggle__list"), classes.root, className)} {...rest}>
            {toggles.map((toggleSwitchProps, i) => (
                <li key={i} className={classes.li}>
                    <ToggleSwitch
                        {...toggleSwitchProps}
                        showCheckedHint={showCheckedHint}
                        labelPosition={labelPosition}
                    />
                </li>
            ))}
        </ul>
    );
});

export default ToggleSwitchGroup;

type ToggleSwitchPropsWithoutSharedProps =
    | ToggleSwitchPropsWithoutSharedProps.Controlled
    | ToggleSwitchPropsWithoutSharedProps.Uncontrolled;

namespace ToggleSwitchPropsWithoutSharedProps {
    export type Common = Omit<ToggleSwitchProps, "showCheckedHint" | "labelPosition">;

    export type Uncontrolled = Common &
        Omit<ToggleSwitchProps.Uncontrolled, keyof ToggleSwitchProps.Common>;
    export type Controlled = Common &
        Omit<ToggleSwitchProps.Controlled, keyof ToggleSwitchProps.Common>;
}
