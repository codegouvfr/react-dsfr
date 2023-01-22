import React, { memo } from "react";
import type { ReactNode, ForwardedRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import type { AlertProps } from "./Alert";

export type BadgeProps = {
    className?: string;
    severity?: AlertProps.Severity | "new";
    small?: boolean;
    noIcon?: boolean;
    ref?: ForwardedRef<HTMLParagraphElement>;
    children: NonNullable<ReactNode>;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-badge> */
export const Badge = memo((props: BadgeProps) => {
    const {
        className,
        severity,
        small: isSmall = false,
        noIcon = false,
        ref,
        children,
        ...rest
    } = props;

    assert<Equals<keyof typeof rest, never>>();

    return (
        <p
            className={cx(
                fr.cx(
                    "fr-badge",
                    severity !== undefined && `fr-badge--${severity}`,
                    { "fr-badge--sm": isSmall },
                    { "fr-badge--no-icon": noIcon || severity === undefined }
                ),
                className
            )}
            ref={ref}
        >
            {children}
        </p>
    );
});

Badge.displayName = symToStr({ Badge });

export default Badge;
