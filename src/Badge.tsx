import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import type { AlertProps } from "./Alert";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type BadgeProps = {
    id?: string;
    className?: string;
    style?: CSSProperties;
    severity?: AlertProps.Severity | "new";
    small?: boolean;
    noIcon?: boolean;
    children: NonNullable<ReactNode>;
};

/** @see <https://components.react-dsfr.fr/?path=/docs/components-badge> */
export const Badge = memo(
    forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
        const {
            id: props_id,
            className,
            style,
            severity,
            small: isSmall = false,
            noIcon = false,
            children,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id= useAnalyticsId({
            "defaultIdPrefix": "fr-badge",
            "explicitlyProvidedId": props_id
        });

        return (
            <p
                id={id}
                className={cx(
                    fr.cx(
                        "fr-badge",
                        severity !== undefined && `fr-badge--${severity}`,
                        { "fr-badge--sm": isSmall },
                        { "fr-badge--no-icon": noIcon || severity === undefined }
                    ),
                    className
                )}
                style={style}
                ref={ref}
                {...rest}
            >
                {children}
            </p>
        );
    })
);

Badge.displayName = symToStr({ Badge });

export default Badge;
