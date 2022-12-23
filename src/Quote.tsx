import React, { memo, forwardRef, ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

import { FrClassName } from "./lib/generatedFromCss/classNames";
import { cx } from "./lib/tools/cx";
import { fr } from "./lib";

export type QuoteProps = {
    className?: string;
    text: ReactNode;
    author?: ReactNode;
    source?: ReactNode;
    sourceUrl?: string;
    imageUrl?: string;
    size?: "medium" | "large" | "xlarge";
    accentColor?: QuoteProps.AccentColor;
    classes?: Partial<Record<"root" | "author" | "source" | "image" | "imageTag" | "text", string>>;
};

export namespace QuoteProps {
    type ExtractAccentColor<FrClassName> = FrClassName extends `fr-quote--${infer AccentColor}`
        ? AccentColor
        : never;

    export type AccentColor = ExtractAccentColor<FrClassName>;
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-quote> */
export const Quote = memo(
    forwardRef<HTMLDivElement, QuoteProps>((props, ref) => {
        const {
            className,
            text,
            author,
            source,
            sourceUrl,
            imageUrl,
            size = "xlarge",
            accentColor,
            classes = {},
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        return (
            <figure
                className={cx(
                    fr.cx("fr-quote"),
                    imageUrl && fr.cx("fr-quote--column"),
                    accentColor && `fr-quote--${accentColor}`,
                    classes.root,
                    className
                )}
                ref={ref}
            >
                <blockquote cite={sourceUrl}>
                    <p
                        className={cx(
                            size === "large" && fr.cx("fr-text--lg"),
                            size === "medium" && fr.cx("fr-text--md"),
                            classes.text
                        )}
                    >
                        « {text} »
                    </p>
                </blockquote>
                <figcaption>
                    {author !== undefined && (
                        <p className={cx(fr.cx("fr-quote__author"), classes.author)}>{author}</p>
                    )}
                    {source !== undefined && (
                        <ul className={cx(fr.cx("fr-quote__source"), classes.source)}>{source}</ul>
                    )}
                    {imageUrl !== undefined && (
                        <div className={cx("fr-quote__image", classes.image)}>
                            <img
                                src={imageUrl}
                                className={cx(fr.cx("fr-responsive-img"), classes.imageTag)}
                                alt=""
                            />
                        </div>
                    )}
                </figcaption>
            </figure>
        );
    })
);

Quote.displayName = symToStr({ Quote });

export default Quote;
