import React, {
    memo,
    forwardRef,
    type ReactNode,
    type RefAttributes,
    type MemoExoticComponent,
    type ForwardRefExoticComponent,
    type CSSProperties
} from "react";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import { getLink } from "./link";
import type { RegisteredLinkProps } from "./link";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { symToStr } from "tsafe/symToStr";

export type TagProps = TagProps.Common &
    (TagProps.WithIcon | TagProps.WithoutIcon) &
    (TagProps.AsAnchor | TagProps.AsButton | TagProps.AsSpan);
export namespace TagProps {
    export type Common = {
        className?: string;
        isSmall?: boolean;
        style?: CSSProperties;
        title?: string;
        children: ReactNode;
    };

    export type WithIcon = {
        /** Function of the button, to provide if the label isn't explicit */
        iconId: FrIconClassName | RiIconClassName;
    };

    export type WithoutIcon = {
        iconId?: never;
    };

    export type AsAnchor = {
        linkProps: RegisteredLinkProps;
        onClick?: never;
        nativeButtonProps?: never;
        nativeSpanProps?: never;
        dismissible?: never;
        pressed?: never;
    };
    export type AsButton = {
        linkProps?: never;
        nativeSpanProps?: never;
        dismissible?: boolean;
        pressed?: boolean;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        nativeButtonProps?: React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        > &
            Record<`data-${string}`, string | boolean | null | undefined>;
    };
    export type AsSpan = {
        linkProps?: never;
        onClick?: never;
        dismissible?: never;
        pressed?: never;
        nativeButtonProps?: never;
        nativeSpanProps?: React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLSpanElement>,
            HTMLSpanElement
        > &
            Record<`data-${string}`, string | boolean | null | undefined>;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-tag> */
export const Tag = memo(
    forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement, TagProps>((props, ref) => {
        const {
            className: prop_className,
            children,
            title,
            iconId,
            isSmall,
            pressed,
            dismissible,
            linkProps,
            nativeButtonProps,
            nativeSpanProps,
            style,
            onClick,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = getLink();

        const className = cx(
            fr.cx(
                "fr-tag",
                isSmall && `fr-tag--sm`,
                iconId,
                iconId && "fr-tag--icon-left", // actually, it's always left but we need it in order to have the icon rendering
                dismissible && "fr-tag--dismiss"
            ),
            linkProps !== undefined && linkProps.className,
            prop_className
        );

        return (
            <>
                {linkProps && (
                    <Link
                        {...linkProps}
                        title={title ?? linkProps.title}
                        className={cx(linkProps?.className, className)}
                        style={{
                            ...linkProps?.style,
                            ...style
                        }}
                        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                        {...rest}
                    >
                        {children}
                    </Link>
                )}
                {nativeButtonProps && (
                    <button
                        {...nativeButtonProps}
                        className={cx(nativeButtonProps?.className, className)}
                        style={{
                            ...nativeButtonProps?.style,
                            ...style
                        }}
                        title={title ?? nativeButtonProps?.title}
                        onClick={onClick ?? nativeButtonProps?.onClick}
                        disabled={nativeButtonProps?.disabled}
                        ref={ref as React.ForwardedRef<HTMLButtonElement>}
                        aria-pressed={pressed}
                        {...rest}
                    >
                        {children}
                    </button>
                )}
                {!linkProps && !nativeButtonProps && (
                    <span
                        {...nativeSpanProps}
                        className={cx(nativeSpanProps?.className, className)}
                        style={{
                            ...nativeSpanProps?.style,
                            ...style
                        }}
                        title={title ?? nativeSpanProps?.title}
                        ref={ref as React.ForwardedRef<HTMLSpanElement>}
                        {...rest}
                    >
                        {children}
                    </span>
                )}
            </>
        );
    })
) as MemoExoticComponent<
    ForwardRefExoticComponent<
        TagProps.Common &
            (TagProps.WithIcon | TagProps.WithoutIcon) &
            (
                | (TagProps.AsAnchor & RefAttributes<HTMLAnchorElement>)
                | (TagProps.AsButton & RefAttributes<HTMLButtonElement>)
                | (TagProps.AsSpan & RefAttributes<HTMLSpanElement>)
            )
    >
>;

Tag.displayName = symToStr({ Tag });

export default Tag;
