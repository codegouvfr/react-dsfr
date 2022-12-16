import React, { memo, forwardRef } from "react";
import type { ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

import { FrIconClassName, RiIconClassName } from "./lib/generatedFromCss/classNames";
import { fr, RegisteredLinkProps } from "./lib";
import { useLink } from "./lib/routing";
import { cx } from "./lib/tools/cx";

import "./dsfr/component/card/card.css";

//https://main--ds-gouv.netlify.app/example/component/card/
export type CardProps = {
    className?: string;
    title: ReactNode;
    linkProps: RegisteredLinkProps;
    desc?: ReactNode;
    imageUrl?: string;
    imageAlt?: string;
    start?: ReactNode;
    detail?: ReactNode;
    end?: ReactNode;
    endDetail?: ReactNode;
    badges?: ReactNode[]; // todo: restrict to badge component ? these badges are display on the image
    footer?: ReactNode; // where actions can be placed
    horizontal?: boolean;
    size?: "small" | "medium" | "large"; // only affect the text
    enlargeLink?: boolean; // make the whole card clickable
    iconId?: FrIconClassName | RiIconClassName; // only needed when enlargeMode=true
    shadow?: boolean;
    background?: boolean;
    border?: boolean;
    grey?: boolean;
    classes?: Partial<
        Record<
            | "root"
            | "title"
            | "card"
            | "link"
            | "body"
            | "content"
            | "desc"
            | "header"
            | "img"
            | "imgTag"
            | "start"
            | "detail"
            | "end"
            | "endDetail"
            | "badges"
            | "footer",
            string
        >
    >;
} & (CardProps.Default | CardProps.Horizontal);

export namespace CardProps {
    export type Default = {};

    export type Horizontal = {
        horizontal: true;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-alert> */
export const Card = memo(
    forwardRef<HTMLDivElement, CardProps>((props, ref) => {
        const {
            className,
            title,
            linkProps,
            desc,
            imageUrl,
            imageAlt,
            start,
            detail,
            end,
            endDetail,
            badges,
            footer,
            horizontal = false,
            size = "medium",
            classes = {},
            enlargeLink = true,
            background = true,
            border = true,
            shadow = false,
            grey = false,
            iconId,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { Link } = useLink();

        return (
            <div
                className={cx(
                    fr.cx("fr-card"),
                    enlargeLink === true && fr.cx("fr-enlarge-link"),
                    horizontal === true && fr.cx("fr-card--horizontal"),
                    size === "small" && fr.cx("fr-card--sm"),
                    size === "large" && fr.cx("fr-card--lg"),
                    background === false && fr.cx("fr-card--no-background"),
                    border === false && fr.cx("fr-card--no-border"),
                    shadow === true && fr.cx("fr-card--shadow"),
                    grey === true && fr.cx("fr-card--grey"),
                    iconId !== undefined && fr.cx(iconId),
                    classes.root,
                    className
                )}
                ref={ref}
            >
                <div className={cx(fr.cx("fr-card__body"), classes.body)}>
                    <div className={cx(fr.cx("fr-card__content"), classes.content)}>
                        <h3 className={cx(fr.cx("fr-card__title"), classes.title)}>
                            <Link {...linkProps} className={cx(classes.link)}>
                                {title}
                            </Link>
                        </h3>
                        {desc !== undefined && (
                            <p className={cx(fr.cx("fr-card__desc"), classes.desc)}>{desc}</p>
                        )}
                        <div className={cx(fr.cx("fr-card__start"), classes.start)}>
                            {start}
                            {detail !== undefined && (
                                <p className={cx(fr.cx("fr-card__detail"), classes.detail)}>
                                    {detail}
                                </p>
                            )}
                        </div>
                        <div className={cx(fr.cx("fr-card__end"), classes.end)}>
                            {end}
                            {endDetail !== undefined && (
                                <p className={cx(fr.cx("fr-card__detail"), classes.endDetail)}>
                                    {endDetail}
                                </p>
                            )}
                        </div>
                    </div>
                    {footer !== undefined && (
                        <p className={cx(fr.cx("fr-card__footer"), classes.footer)}>{footer}</p>
                    )}
                </div>
                {/* ensure we dont have an empty imageUrl string */}
                {(imageUrl !== undefined && imageUrl.length && (
                    <div className={cx(fr.cx("fr-card__header"), classes.header)}>
                        <div className={cx(fr.cx("fr-card__img"), classes.img)}>
                            <img
                                className={cx(fr.cx("fr-responsive-img"), classes.imgTag)}
                                src={imageUrl}
                                alt={imageAlt}
                            />
                        </div>
                        {(badges !== undefined && badges.length && (
                            <ul className={cx(fr.cx("fr-badges-group"), classes.badges)}>
                                {badges.map((badge, i) => (
                                    <li key={i}>{badge}</li>
                                ))}
                            </ul>
                        )) ||
                            null}
                    </div>
                )) ||
                    null}
            </div>
        );
    })
);

Card.displayName = symToStr({ Card });

export default Card;
