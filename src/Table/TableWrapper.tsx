import { type CSSProperties, forwardRef, memo } from "react";
import { cx } from "../tools/cx";
import { fr, FrClassName } from "../fr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import { useAnalyticsId } from "../tools/useAnalyticsId";

export type TableWrapperProps = {
    id?: string;
    className?: string;
    /** Default: false */
    fixed?: boolean;
    /** Default: false */
    noScroll?: boolean;
    /** Default: false */
    bordered?: boolean;
    /** Default: false */
    noCaption?: boolean;
    /** Default: false */
    bottomCaption?: boolean;
    style?: CSSProperties;
    colorVariant?: TableProps.ColorVariant;
    children?: React.ReactNode;
};

export namespace TableProps {
    type ExtractColorVariant<FrClassName> = FrClassName extends `fr-table--${infer AccentColor}`
        ? Exclude<
              AccentColor,
              "no-scroll" | "no-caption" | "caption-bottom" | "layout-fixed" | "bordered"
          >
        : never;

    export type ColorVariant = ExtractColorVariant<FrClassName>;
}

export const TableWrapper = memo(
    forwardRef<HTMLDivElement, TableWrapperProps>((props, ref) => {
        const {
            children,
            id: id_props,
            bordered = false,
            noScroll = false,
            fixed = false,
            noCaption = false,
            bottomCaption = false,
            colorVariant,
            className,
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-table",
            "explicitlyProvidedId": id_props
        });

        return (
            <div
                id={id}
                ref={ref}
                style={style}
                className={cx(
                    fr.cx(
                        "fr-table",
                        {
                            "fr-table--bordered": bordered,
                            "fr-table--no-scroll": noScroll,
                            "fr-table--layout-fixed": fixed,
                            "fr-table--no-caption": noCaption,
                            "fr-table--caption-bottom": bottomCaption
                        },
                        colorVariant !== undefined && `fr-table--${colorVariant}`
                    ),
                    className
                )}
            >
                <div className={fr.cx("fr-table__wrapper")}>
                    <div className={fr.cx("fr-table__container")}>
                        <div className={fr.cx("fr-table__content")}>{children}</div>
                    </div>
                </div>
            </div>
        );
    })
);

TableWrapper.displayName = symToStr({ TableWrapper });

export default TableWrapper;
