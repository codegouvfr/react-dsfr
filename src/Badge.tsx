import React, { memo, forwardRef, ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";

// We make users import dsfr.css, so we don't need to import the scoped CSS
// but in the future if we have a complete component coverage it
// we could stop requiring users to import the hole CSS and only import on a
// per component basis.
import "./dsfr/component/badge/badge.css";

export type BadgeProps = {
    className?: string;
    severity?: BadgeProps.Severity;
    isSmall?: boolean;
    noIcon?: boolean;
    label: NonNullable<ReactNode>;
};

export namespace BadgeProps {
    export type Severity = "info" | "success" | "error" | "warning" | "new";
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-badge> */
export const Badge = memo(
    forwardRef<HTMLDivElement, BadgeProps>(props => {
        const { className, severity, label, isSmall, noIcon, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        return (
            <p
                className={cx(
                    fr.cx(
                        "fr-badge",
                        { [`fr-badge--${severity}`]: severity != null },
                        { "fr-badge--sm": isSmall },
                        { "fr-badge--no-icon": noIcon || severity == null }
                    ),
                    className
                )}
                {...rest}
            >
                {label}
            </p>
        );
    })
);

Badge.displayName = symToStr({ Badge });

export default Badge;
