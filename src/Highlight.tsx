import React, { memo, ReactNode } from "react";
import type { ForwardedRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";

export type HighlightProps = {
    className?: string;
    classes?: Partial<Record<"root" | "content", string>>;
    size?: HighlightProps.Size;
    children: NonNullable<ReactNode>;
    ref?: ForwardedRef<HTMLDivElement>;
};

export namespace HighlightProps {
    export type Size = "sm" | "lg";
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-highlight> */
export const Highlight = memo((props: HighlightProps) => {
    const { className, classes = {}, children, size, ref, ...rest } = props;

    assert<Equals<keyof typeof rest, never>>();

    return (
        <div className={cx(fr.cx("fr-highlight"), classes.root, className)} ref={ref}>
            <p className={cx(fr.cx({ [`fr-text--${size}`]: size }), classes.content)}>{children}</p>
        </div>
    );
});

Highlight.displayName = symToStr({ Highlight });

export default Highlight;
