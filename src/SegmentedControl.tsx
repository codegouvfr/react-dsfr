import { CSSProperties, forwardRef, memo } from "react";
import { assert, Equals } from "tsafe";
import { fr } from "./fr";
import React from "react";
import { CxArg } from "tss-react";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type SegmentedControlProps = {
    id?: string;
    className?: string;
    classes?: Partial<
        Record<
            | "root"
            | "container"
            | "row"
            | "newsletter-col"
            | "newsletter"
            | "newsletter-title"
            | "newsletter-desc"
            | "newsletter-form-wrapper"
            | "newsletter-form-hint"
            | "social-col"
            | "social"
            | "social-title"
            | "social-buttons"
            | "social-buttons-each",
            CxArg
        >
    >;
    style?: CSSProperties;
};

//https://main--ds-gouv.netlify.app/example/component/segmented/
export namespace SegmentedControlProps {}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-segmented-control> */
export const SegmentedControl = memo(
    forwardRef<HTMLFieldSetElement, SegmentedControlProps>((props, ref) => {
        const { id: props_id, className, classes = {}, style, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-follow",
            "explicitlyProvidedId": props_id
        });

        return (
            <fieldset
                id={id}
                className={cx(fr.cx("fr-segmented"), classes.root, className)}
                ref={ref}
                style={style}
                {...rest}
            ></fieldset>
        );
    })
);
