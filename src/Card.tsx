import React, { memo, forwardRef } from "react";
import type { ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

import { FrIconClassName, RiIconClassName } from "./lib/generatedFromCss/classNames";
import { fr, RegisteredLinkProps } from "./lib";
import { getLink } from "./lib/routing";
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
    /** where actions can be placed */
    footer?: ReactNode;
    /** Default: "medium", only affect the text */
    size?: "small" | "medium" | "large";
    /** make the whole card clickable */
    enlargeLink?: boolean;
    /** only needed when enlargeLink=true */
    iconId?: FrIconClassName | RiIconClassName;
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
    /** Default false */
    horizontal?: boolean;
} & (CardProps.EnlargedLink | CardProps.NotEnlargedLink);

export namespace CardProps {
    export type EnlargedLink = {
        enlargeLink: true;
        iconId?: FrIconClassName | RiIconClassName;
    };
    export type NotEnlargedLink = {
        enlargeLink?: false;
        iconId?: never;
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

        const { Link } = getLink();

        return (
            <div
                className={cx(
                    fr.cx(
                        "fr-card",
                        enlargeLink && "fr-enlarge-link",
                        horizontal && "fr-card--horizontal",
                        (() => {
                            switch (size) {
                                case "large":
                                    return "fr-card--lg";
                                case "small":
                                    return "fr-card--sm";
                                case "medium":
                                    return undefined;
                            }
                        })(),
                        !background && "fr-card--no-background",
                        !border && "fr-card--no-border",
                        shadow && "fr-card--shadow",
                        grey && "fr-card--grey",
                        iconId !== undefined && iconId
                    ),
                    classes.root,
                    className
                )}
                ref={ref}
                {...rest}
            >
                <div className={cx(fr.cx("fr-card__body"), classes.body)}>
                    <div className={cx(fr.cx("fr-card__content"), classes.content)}>
                        <h3 className={cx(fr.cx("fr-card__title"), classes.title)}>
                            <Link {...linkProps} className={cx(linkProps.className, classes.link)}>
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
                {/* ensure we don't have an empty imageUrl string */}
                {imageUrl !== undefined && imageUrl.length && (
                    <div className={cx(fr.cx("fr-card__header"), classes.header)}>
                        <div className={cx(fr.cx("fr-card__img"), classes.img)}>
                            <img
                                className={cx(fr.cx("fr-responsive-img"), classes.imgTag)}
                                src={imageUrl}
                                alt={imageAlt}
                            />
                        </div>
                        {badges !== undefined && badges.length && (
                            <ul className={cx(fr.cx("fr-badges-group"), classes.badges)}>
                                {badges.map((badge, i) => (
                                    <li key={i}>{badge}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        );
    })
);

Card.displayName = symToStr({ Card });

export default Card;
