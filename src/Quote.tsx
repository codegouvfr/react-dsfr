import React, { memo, forwardRef, ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";

// We make users import dsfr.css, so we don't need to import the scoped CSS
// but in the future if we have a complete component coverage it
// we could stop requiring users to import the hole CSS and only import on a
// per component basis.
import "./dsfr/component/quote/quote.css";

export type QuoteProps = {
    className?: string;
    text: string;
    author?: string;
    source?: ReactNode;
    sourceUrl?: string;
    image?: string;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-quote> */
export const Quote = memo(
    forwardRef<HTMLDivElement, QuoteProps>((props, ref) => {
        const { className, text, author, source, sourceUrl, image, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        return (
            <figure
                className={cx(fr.cx("fr-quote"), fr.cx("fr-quote--column"), className)}
                ref={ref}
            >
                <blockquote cite={sourceUrl}>
                    <p>« {text} »</p>
                </blockquote>
                <figcaption>
                    {author && <p className="fr-quote__author">{author}</p>}
                    {source && <ul className="fr-quote__source">{source}</ul>}
                    {image && (
                        <div className="fr-quote__image">
                            <img src={image} className="fr-responsive-img" alt="" />
                        </div>
                    )}
                </figcaption>
            </figure>
        );
    })
);

Quote.displayName = symToStr({ Quote });

export default Quote;
