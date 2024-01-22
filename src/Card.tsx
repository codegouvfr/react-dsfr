import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import { fr } from "./fr";
import type { RegisteredLinkProps } from "./link";
import { getLink } from "./link";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

//https://main--ds-gouv.netlify.app/example/component/card/
export type CardProps = {
    id?: string;
    className?: string;
    title: ReactNode;
    titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
    desc?: ReactNode;
    start?: ReactNode;
    detail?: ReactNode;
    end?: ReactNode;
    endDetail?: ReactNode;
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
            | "badge"
            | "footer",
            string
        >
    >;
    style?: CSSProperties;
} & (CardProps.EnlargedLink | CardProps.NotEnlargedLink) &
    (CardProps.Horizontal | CardProps.Vertical) &
    (CardProps.WithImageLink | CardProps.WithImageComponent | CardProps.WithoutImage);

export namespace CardProps {
    export type EnlargedLink = {
        enlargeLink: true;
        linkProps: RegisteredLinkProps;
        iconId?: FrIconClassName | RiIconClassName;
    };
    export type NotEnlargedLink = {
        enlargeLink?: false;
        linkProps?: RegisteredLinkProps;
        iconId?: never;
    };

    export type Horizontal = {
        /** Default false */
        horizontal: true;
        ratio?: "33/66" | "50/50";
    };

    export type Vertical = {
        /** Default false */
        horizontal?: false;
        ratio?: never;
    };

    export type WithImageLink = {
        badge?: ReactNode;
        imageUrl: string;
        imageAlt: string;
        imageComponent?: never;
    };

    export type WithImageComponent = {
        badge?: ReactNode;
        imageUrl?: never;
        imageAlt?: never;
        imageComponent: ReactNode;
    };

    export type WithoutImage = {
        badge?: never;
        imageUrl?: never;
        imageAlt?: never;
        imageComponent?: never;
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-card> */
export const Card = memo(
    forwardRef<HTMLDivElement, CardProps>((props, ref) => {
        const {
            id: props_id,
            className,
            title,
            titleAs: HtmlTitleTag = "h3",
            linkProps,
            desc,
            imageUrl,
            imageAlt,
            imageComponent,
            start,
            detail,
            end,
            endDetail,
            badge,
            footer,
            horizontal = false,
            ratio,
            size = "medium",
            classes = {},
            enlargeLink = false,
            background = true,
            border = true,
            shadow = false,
            grey = false,
            iconId,
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-card",
            "explicitlyProvidedId": props_id
        });

        const { Link } = getLink();

        return (
            <div
                id={id}
                className={cx(
                    fr.cx(
                        "fr-card",
                        enlargeLink && "fr-enlarge-link",
                        horizontal && "fr-card--horizontal",
                        horizontal &&
                            ratio !== undefined &&
                            `fr-card--horizontal-${ratio === "33/66" ? "tier" : "half"}`,
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
                style={style}
                ref={ref}
                {...rest}
            >
                <div className={cx(fr.cx("fr-card__body"), classes.body)}>
                    <div className={cx(fr.cx("fr-card__content"), classes.content)}>
                        <HtmlTitleTag className={cx(fr.cx("fr-card__title"), classes.title)}>
                            {linkProps !== undefined ? (
                                <Link
                                    {...linkProps}
                                    className={cx(linkProps.className, classes.link)}
                                >
                                    {title}
                                </Link>
                            ) : (
                                title
                            )}
                        </HtmlTitleTag>
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
                        <div className={cx(fr.cx("fr-card__footer"), classes.footer)}>{footer}</div>
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
                        {badge !== undefined && (
                            <ul className={cx(fr.cx("fr-badges-group"), classes.badge)}>
                                <li>{badge}</li>
                            </ul>
                        )}
                    </div>
                )}
                {imageComponent !== undefined && (
                    <div className={cx(fr.cx("fr-card__header"), classes.header)}>
                        <div className={cx(fr.cx("fr-card__img"), classes.img)}>
                            {imageComponent}
                        </div>
                        {badge !== undefined && (
                            <ul className={cx(fr.cx("fr-badges-group"), classes.badge)}>
                                <li>{badge}</li>
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
