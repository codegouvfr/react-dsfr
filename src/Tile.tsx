import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { RegisteredLinkProps } from "./link";
import { getLink } from "./link";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

//https://main--ds-gouv.netlify.app/example/component/tile/
export type TileProps = {
    id?: string;
    className?: string;
    title: ReactNode;
    linkProps: RegisteredLinkProps;
    desc?: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
    imageWidth?: string | number;
    imageHeight?: string | number;
    grey?: boolean;

    /** make the whole tile clickable */
    enlargeLink?: boolean;
    classes?: Partial<
        Record<"root" | "title" | "link" | "body" | "desc" | "img" | "imgTag", string>
    >;
    /** Default false */
    horizontal?: boolean;
    style?: CSSProperties;
};

export namespace TileProps {}

/** @see <https://components.react-dsfr.fr/?path=/docs/components-tile> */
export const Tile = memo(
    forwardRef<HTMLDivElement, TileProps>((props, ref) => {
        const {
            id: id_props,
            className,
            title,
            linkProps,
            desc,
            imageUrl,
            imageAlt,
            imageWidth,
            imageHeight,
            horizontal = false,
            grey = false,
            classes = {},
            enlargeLink = true,
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
                        enlargeLink && "fr-enlarge-link",
                        horizontal && "fr-tile--horizontal",
                        grey && "fr-tile--grey"
                    ),
                    classes.root,
                    className
                )}
                ref={ref}
                style={style}
                {...rest}
            >
                <div className={cx(fr.cx("fr-tile__body"), classes.body)}>
                    <h3 className={cx(fr.cx("fr-tile__title"), classes.title)}>
                        <Link
                            {...linkProps}
                            className={cx(
                                fr.cx("fr-tile__link"),
                                classes.link,
                                linkProps.className
                            )}
                        >
                            {title}
                        </Link>
                    </h3>
                    <p className={cx(fr.cx("fr-tile__desc"), classes.desc)}>{desc}</p>
                </div>
                {(imageUrl !== undefined && imageUrl.length && (
                    <div className={cx(fr.cx("fr-tile__img"), classes.img)}>
                        <img
                            className={cx(fr.cx("fr-responsive-img"), classes.imgTag)}
                            src={imageUrl}
                            alt={imageAlt}
                            width={imageWidth}
                            height={imageHeight}
                        />
                    </div>
                )) ||
                    null}
            </div>
        );
    })
);

Tile.displayName = symToStr({ Tile });

export default Tile;
