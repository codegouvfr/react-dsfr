import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type {
    FrClassName,
    FrIconClassName,
    RiIconClassName
} from "./fr/generatedFromCss/classNames";
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
    iconId?: FrIconClassName | RiIconClassName;
    accentColor?: BadgeProps.AccentColor;
    /** Default: "p" */
    as?: "p" | "span";
    children: NonNullable<ReactNode>;
};

export namespace BadgeProps {
    type ExtractAccentColor<FrClassName> = FrClassName extends `fr-badge--${infer AccentColor}`
        ? AccentColor
        : never;

    export type AccentColor = ExtractAccentColor<FrClassName>;
}

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
            iconId,
            accentColor,
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
                "className": cx(
                    fr.cx(
                        "fr-badge",
                        severity !== undefined && `fr-badge--${severity}`,
                        { "fr-badge--sm": isSmall },
                        {
                            "fr-badge--no-icon":
                                noIcon || (severity === undefined && iconId === undefined)
                        },
                        severity === undefined && iconId,
                        severity === undefined && iconId && "fr-badge--icon-left", // actually, it's always left but we need it in order to have the icon rendering
                        severity === undefined && accentColor && `fr-badge--${accentColor}`
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
