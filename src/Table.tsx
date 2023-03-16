import React, { forwardRef, memo, type ReactNode, type CSSProperties } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { symToStr } from "tsafe/symToStr";
import type { FrClassName } from "./fr/generatedFromCss/classNames";

export type TableProps = {
    fixed?: boolean;
    data: string[][];
    className?: string;
    caption?: ReactNode;
    bordered?: boolean;
    headers?: string[];
    noScroll?: boolean;
    noCaption?: boolean;
    style?: CSSProperties;
    bottomCaption?: boolean;
    colorVariant?: TableProps.ColorVariant;
};

export namespace TableProps {
    type ExtractColorVariant<FrClassName> = FrClassName extends `fr-table--${infer AccentColor}`
        ? AccentColor
        : never;

    export type ColorVariant = ExtractColorVariant<FrClassName>;
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/tableau>  */
export const Table = memo(
    forwardRef<HTMLDivElement, TableProps>((props, ref) => {
        const {
            data,
            headers,
            caption,
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

        return (
            <div
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
                <table>
                    {caption !== undefined && <caption>{caption}</caption>}
                    {headers !== undefined && (
                        <thead>
                            <tr>
                                {headers.map((header, i) => (
                                    <th key={i} scope="col">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {row.map((col, j) => (
                                    <td key={j}>{col}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    })
);

Table.displayName = symToStr({ Table });

export default Table;
