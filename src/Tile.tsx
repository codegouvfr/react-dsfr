import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { RegisteredLinkProps } from "./link";
import { getLink } from "./link";
import { fr } from "./fr";
import { cx } from "./tools/cx";

//https://main--ds-gouv.netlify.app/example/component/tile/
export type TileProps = {
    className?: string;
    title: ReactNode;
    linkProps: RegisteredLinkProps;
    desc?: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
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

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-tile> */
export const Tile = memo(
    forwardRef<HTMLDivElement, TileProps>((props, ref) => {
        const {
            className,
            title,
            linkProps,
            desc,
            imageUrl,
            imageAlt,
            horizontal = false,
            grey = false,
            classes = {},
            enlargeLink = true,
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = getLink();

        return (
            <div
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
                            className={cx(
                                fr.cx("fr-tile__link"),
                                classes.link,
                                linkProps.className
                            )}
                            href={linkProps.href}
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
