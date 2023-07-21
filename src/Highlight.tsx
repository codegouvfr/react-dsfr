import React, { memo, forwardRef, type ReactNode, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type HighlightProps = {
    id?: string;
    className?: string;
    classes?: Partial<Record<"root" | "content", string>>;
    size?: HighlightProps.Size;
    style?: CSSProperties;
    children: NonNullable<ReactNode>;
};

export namespace HighlightProps {
    export type Size = "sm" | "lg";
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-highlight> */
export const Highlight = memo(
    forwardRef<HTMLDivElement, HighlightProps>((props, ref) => {
        const { className, classes = {}, style, children, size, id: id_props, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-highlight",
            "explicitlyProvidedId": id_props
        });

        return (
            <div
                id={id}
                className={cx(fr.cx("fr-highlight"), classes.root, className)}
                ref={ref}
                style={style}
                {...rest}
            >
                <p className={cx(fr.cx({ [`fr-text--${size}`]: size }), classes.content)}>
                    {children}
                </p>
            </div>
        );
    })
);

Highlight.displayName = symToStr({ Highlight });

export default Highlight;
