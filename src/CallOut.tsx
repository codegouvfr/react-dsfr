import React, { memo, forwardRef, ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type {
    FrClassName,
    FrIconClassName,
    RiIconClassName
} from "./fr/generatedFromCss/classNames";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type CallOutProps = {
    className?: string;
    id?: string;
    iconId?: FrIconClassName | RiIconClassName;
    title?: ReactNode;
    buttonProps?: ButtonProps;
    colorVariant?: CallOutProps.ColorVariant;
    classes?: Partial<Record<"root" | "title" | "text" | "button", string>>;
    style?: CSSProperties;
    children: ReactNode;
};

export namespace CallOutProps {
    type ExtractColorVariant<FrClassName> = FrClassName extends `fr-callout--${infer AccentColor}`
        ? AccentColor
        : never;

    export type ColorVariant = ExtractColorVariant<FrClassName>;
}

/** @see <https://components.react-dsfr.fr/?path=/docs/components-callout> */
export const CallOut = memo(
    forwardRef<HTMLDivElement, CallOutProps>((props, ref) => {
        const {
            id: props_id,
            className,
            iconId,
            title,
            buttonProps,
            colorVariant,
            classes = {},
            children,
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-callout",
            "explicitlyProvidedId": props_id
        });

        return (
            <div
                id={id}
                className={cx(
                    fr.cx(
                        "fr-callout",
                        iconId,
                        colorVariant !== undefined && `fr-callout--${colorVariant}`
                    ),
                    classes.root,
                    className
                )}
                ref={ref}
                style={style}
                {...rest}
            >
                {title !== undefined && (
                    <h3 className={cx(fr.cx("fr-callout__title"), classes.title)}>{title}</h3>
                )}
                <p className={cx(fr.cx("fr-callout__text"), classes.text)}> {children} </p>
                {buttonProps !== undefined && (
                    <Button
                        {...buttonProps}
                        className={cx(classes.button, buttonProps.className)}
                    />
                )}
            </div>
        );
    })
);

CallOut.displayName = symToStr({ CallOut });

export default CallOut;
