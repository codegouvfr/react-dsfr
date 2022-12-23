import React, { memo, forwardRef, ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";

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
    forwardRef<HTMLDivElement, HighlightProps>((props, ref) => {
        const { className, classes = {}, children, size, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        return (
            <div className={cx(fr.cx("fr-highlight"), classes.root, className)} ref={ref} {...rest}>
                <p className={cx(fr.cx({ [`fr-text--${size}`]: size }), classes.content)}>
                    {children}
                </p>
            </div>
        );
    })
);

Highlight.displayName = symToStr({ Highlight });

export default Highlight;
