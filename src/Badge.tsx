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
    /** Default: "p" */
    as?: "p" | "span";
    children: NonNullable<ReactNode>;
};

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-badge> */
export const Badge = memo(
    forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
        const {
            id: props_id,
            className,
            as = "p",
            style,
            severity,
            small: isSmall = false,
            noIcon = false,
            children,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-badge",
            "explicitlyProvidedId": props_id
        });

        return React.createElement(
            as,
            {
                className: cx(
                    fr.cx(
                        "fr-badge",
                        severity !== undefined && `fr-badge--${severity}`,
                        { "fr-badge--sm": isSmall },
                        { "fr-badge--no-icon": noIcon || severity === undefined }
                    ),
                    className
                ),
                id,
                style,
                ref,
                ...rest
            },
            <>{children}</>
        );
    })
);

Badge.displayName = symToStr({ Badge });

export default Badge;
