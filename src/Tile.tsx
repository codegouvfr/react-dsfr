import type { ComponentProps, CSSProperties, ReactNode } from "react";
import React, { forwardRef, memo } from "react";
import type { Equals } from "tsafe";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";

import { fr } from "./fr";
import { getLink, type RegisteredLinkProps } from "./link";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

//https://main--ds-gouv.netlify.app/example/component/tile/
export type TileProps = {
    id?: string;
    className?: string;
    title: ReactNode;
    titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
    linkProps?: RegisteredLinkProps;
    buttonProps?: ComponentProps<"button">;
    downloadButton?: boolean;
    desc?: ReactNode;
    detail?: ReactNode;
    start?: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
    /**
     * @deprecated imageWidth has no effect
     */
    imageWidth?: string | number;
    /**
     * @deprecated imageHeight has no effect
     */
    imageHeight?: string | number;
    imageSvg?: boolean;
    grey?: boolean;
    /** make the whole tile clickable */
    enlargeLinkOrButton?: boolean;
    classes?: Partial<
        Record<
            | "root"
            | "content"
            | "title"
            | "header"
            | "link"
            | "button"
            | "body"
            | "desc"
            | "detail"
            | "start"
            | "img"
            | "imgTag"
            | "artwork",
            string
        >
    >;
    orientation?: "horizontal" | "vertical";
    small?: boolean;
    noIcon?: boolean;
    noBorder?: boolean;
    noBackground?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
} & (TileProps.WithLink | TileProps.WithButton | TileProps.Unclickable);

export namespace TileProps {
    export type Unclickable = {
        linkProps?: never;
        buttonProps?: never;
        enlargeLinkOrButton?: never;
    };

    export type WithLink = {
        linkProps: RegisteredLinkProps;
        buttonProps?: never;
    };

    export type WithButton = {
        linkProps?: never;
        buttonProps: ComponentProps<"button">;
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tile> */
export const Tile = memo(
    forwardRef<HTMLDivElement, TileProps>((props, ref) => {
        const {
            id: id_props,
            className,
            title,
            titleAs: HtmlTitleTag = "h3",
            linkProps,
            buttonProps,
            downloadButton,
            desc,
            detail,
            start,
            imageUrl,
            imageAlt,
            imageWidth,
            imageHeight,
            imageSvg = false,
            orientation = "vertical",
            small = false,
            noBorder = false,
            noIcon = false,
            noBackground = false,
            grey = false,
            classes = {},
            enlargeLinkOrButton = true,
            disabled = false,
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = getLink();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-tile",
            "explicitlyProvidedId": id_props
        });

        return (
            <div
                id={id}
                className={cx(
                    fr.cx(
                        "fr-tile",
                        enlargeLinkOrButton &&
                            (linkProps
                                ? "fr-enlarge-link"
                                : buttonProps
                                ? "fr-enlarge-button"
                                : null),
                        orientation && `fr-tile--${orientation}`,
                        noIcon && "fr-tile--no-icon",
                        noBorder && "fr-tile--no-border",
                        noBackground && "fr-tile--no-background",
                        grey && "fr-tile--grey",
                        small && "fr-tile--sm",
                        (buttonProps || linkProps) && downloadButton && "fr-tile--download"
                    ),
                    classes.root,
                    className
                )}
                ref={ref}
                style={style}
                {...rest}
            >
                <div className={cx(fr.cx("fr-tile__body"), classes.body)}>
                    <div className={cx(fr.cx("fr-tile__content"), classes.content)}>
                        <HtmlTitleTag className={cx(fr.cx("fr-tile__title"), classes.title)}>
                            {linkProps !== undefined ? (
                                <Link
                                    {...linkProps}
                                    href={disabled ? undefined : linkProps.href}
                                    className={cx(classes.link, linkProps.className)}
                                    aria-disabled={disabled}
                                >
                                    {title}
                                </Link>
                            ) : buttonProps !== undefined ? (
                                <button
                                    {...buttonProps}
                                    className={cx(classes.button, buttonProps.className)}
                                    disabled={disabled}
                                >
                                    {title}
                                </button>
                            ) : (
                                title
                            )}
                        </HtmlTitleTag>

                        {desc !== undefined && (
                            <div className={cx(fr.cx("fr-tile__desc"), classes.desc)}>{desc}</div>
                        )}
                        {detail !== undefined && (
                            <div className={cx(fr.cx("fr-tile__detail"), classes.detail)}>
                                {detail}
                            </div>
                        )}
                        {start !== undefined && (
                            <div className={cx(fr.cx("fr-tile__start"), classes.start)}>
                                {start}
                            </div>
                        )}
                    </div>
                </div>

                {imageUrl !== undefined && imageUrl.length > 0 && (
                    <div className={cx(fr.cx("fr-tile__header"), classes.header)}>
                        {imageSvg ? (
                            <div className={cx(fr.cx("fr-tile__pictogram"), classes.img)}>
                                <svg
                                    aria-hidden={true}
                                    className={cx(fr.cx("fr-artwork"), classes.artwork)}
                                    viewBox="0 0 80 80"
                                    width="80px"
                                    height="80px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    {(
                                        [
                                            "artwork-decorative",
                                            "artwork-minor",
                                            "artwork-major"
                                        ] as const
                                    ).map(label => (
                                        <use
                                            key={label}
                                            className={fr.cx(`fr-${label}`)}
                                            xlinkHref={`${imageUrl}#${label}`}
                                        />
                                    ))}
                                </svg>
                            </div>
                        ) : (
                            <div className={cx(fr.cx("fr-tile__img"), classes.img)}>
                                <img
                                    className={cx(fr.cx("fr-responsive-img"), classes.imgTag)}
                                    src={imageUrl}
                                    alt={imageAlt}
                                    width={imageWidth}
                                    height={imageHeight}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    })
);

Tile.displayName = symToStr({ Tile });

export default Tile;
