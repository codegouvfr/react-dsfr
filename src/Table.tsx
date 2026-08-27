import React, { forwardRef, memo, type ReactNode, type CSSProperties, useState } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { symToStr } from "tsafe/symToStr";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import SortingOrder = TableProps.SortingOrder;
import SortingState = TableProps.SortingState;

export type TableProps = {
    id?: string;
    data: ReactNode[][];
    className?: string;
    caption?: ReactNode;
    headers?: ReactNode[];
    /** Default: [] */
    sortableColumns?: (boolean | undefined)[];
    onSort?: (column: number, order: SortingOrder) => void;
    defaultSort?: SortingState;
    sort?: SortingState;
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
};

export namespace TableProps {
    type ExtractColorVariant<FrClassName> = FrClassName extends `fr-table--${infer AccentColor}`
        ? Exclude<
              AccentColor,
              "no-scroll" | "no-caption" | "caption-bottom" | "layout-fixed" | "bordered"
          >
        : never;

    export type ColorVariant = ExtractColorVariant<FrClassName>;

    export type SortingOrder = "ascending" | "descending" | "none";

    export type SortingState = {
        column: number;
        order: SortingOrder;
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/tableau>  */
export const Table = memo(
    forwardRef<HTMLDivElement, TableProps>((props, ref) => {
        const {
            id: id_props,
            data,
            headers,
            sortableColumns = [],
            onSort,
            defaultSort,
            sort,
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

        const { currentSort: currentSortState, cycleSortingOrder } = useSort(defaultSort);
        const currentSort = sort ?? currentSortState;

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
                <table className="fr-table__content">
                    {caption !== undefined && <caption>{caption}</caption>}
                    {headers !== undefined && (
                        <thead>
                            <tr>
                                {headers.map((header, i) => {
                                    const sortable = sortableColumns[i];
                                    if (!sortable) {
                                        return (
                                            <th key={i} scope="col">
                                                {header}
                                            </th>
                                        );
                                    }
                                    const sortingOrder =
                                        currentSort?.column === i ? currentSort?.order : "none";
                                    return (
                                        <SortableTh
                                            key={i}
                                            order={sortingOrder}
                                            onSort={() => {
                                                const newOrder = cycleSortingOrder(i);
                                                onSort?.(i, newOrder);
                                            }}
                                        >
                                            {header}
                                        </SortableTh>
                                    );
                                })}
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

const SortableTh = ({
    children,
    order,
    onSort
}: {
    children: React.ReactNode;
    order: TableProps.SortingOrder;
    onSort: () => void;
}) => (
    <th scope="col" aria-sort={order}>
        <div className="fr-cell--sort">
            {children}
            <button
                className={cx(
                    `fr-btn--sort`,
                    order === "ascending" && "fr-btn--sort-asc",
                    order === "descending" && "fr-btn--sort-desc"
                )}
                onClick={() => {
                    onSort();
                }}
            />
        </div>
    </th>
);

function useSort(defaultSort?: SortingState) {
    const [currentSort, setCurrentSort] = useState<SortingState | null>(defaultSort ?? null);

    function cycleSortingOrder(column: number): SortingOrder {
        if (currentSort?.column !== column || currentSort?.order === "none") {
            setCurrentSort({ column, order: "ascending" });
            return "ascending";
        }
        if (currentSort?.order === "ascending") {
            setCurrentSort({ column, order: "descending" });
            return "descending";
        }
        setCurrentSort(null);
        return "none";
    }

    return { currentSort, cycleSortingOrder };
}

Table.displayName = symToStr({ Table });

export default Table;
