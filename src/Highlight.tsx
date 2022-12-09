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
import "./dsfr/component/highlight/highlight.css";

export type HighlightProps = {
    className?: string;
    classes?: Partial<Record<"root" | "content", string>>;
    size?: HighlightProps.Size;
    children: NonNullable<ReactNode>;
};

export namespace HighlightProps {
    export type Size = "sm" | "lg";
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-highlight> */
export const Highlight = memo(
    forwardRef<HTMLDivElement, HighlightProps>(props => {
        const { className, classes = {}, children, size, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        return (
            <div className={cx(fr.cx("fr-highlight"), classes.root, className)} {...rest}>
                <p className={cx(fr.cx({ [`fr-text--${size}`]: size }), classes.content)}>
                    {children}
                </p>
            </div>
        );
    })
);

Highlight.displayName = symToStr({ Highlight });

export default Highlight;
