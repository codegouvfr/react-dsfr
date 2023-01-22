import React, { memo } from "react";
import type { ReactNode, ForwardedRef } from "react";
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

export type CallOutProps = {
    className?: string;
    iconId?: FrIconClassName | RiIconClassName;
    title?: ReactNode;
    buttonProps?: ButtonProps;
    colorVariant?: CallOutProps.ColorVariant;
    classes?: Partial<Record<"root" | "title" | "text" | "button", string>>;
    ref?: ForwardedRef<HTMLDivElement>;
    children: ReactNode;
};

export namespace CallOutProps {
    type ExtractColorVariant<FrClassName> = FrClassName extends `fr-callout--${infer AccentColor}`
        ? AccentColor
        : never;

    export type ColorVariant = ExtractColorVariant<FrClassName>;
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-callout> */
export const CallOut = memo((props: CallOutProps) => {
    const {
        className,
        iconId,
        title,
        buttonProps,
        colorVariant,
        classes = {},
        ref,
        children,
        ...rest
    } = props;

    assert<Equals<keyof typeof rest, never>>();

    return (
        <div
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
        >
            {title !== undefined && (
                <h3 className={cx(fr.cx("fr-callout__title"), classes.title)}>{title}</h3>
            )}
            <p className={cx(fr.cx("fr-callout__text"), classes.text)}> {children} </p>
            {buttonProps !== undefined && (
                <Button {...buttonProps} className={cx(classes.button, buttonProps.className)} />
            )}
        </div>
    );
});

CallOut.displayName = symToStr({ CallOut });

export default CallOut;
