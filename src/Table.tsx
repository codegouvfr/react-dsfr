import React, { forwardRef, memo, type ReactNode, type CSSProperties, useState } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { symToStr } from "tsafe/symToStr";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import { createComponentI18nApi } from "./i18n";

export type TableProps = {
    id?: string;
    data: ReactNode[][];
    className?: string;
    caption?: ReactNode;
    headers?: (ReactNode | TableProps.SortableColumn)[];
    onSort?: (column: number, order: TableProps.SortingOrder) => void;
    defaultSort?: TableProps.SortingState;
    sort?: TableProps.SortingState;
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

    export type SortableColumn = {
        label: ReactNode;
        sortable: boolean;
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/tableau>  */
export const Table = memo(
    forwardRef<HTMLDivElement, TableProps>((props, ref) => {
        const {
            id: id_props,
            data,
            headers,
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

        const { currentSort, cycleSortingOrder } = useSort(defaultSort, sort);

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
                        <div className={fr.cx("fr-table__content")}>
                            <table>
                                {caption !== undefined && <caption>{caption}</caption>}
                                {headers !== undefined && (
                                    <thead>
                                        <tr>
                                            {headers.map((header, i) => {
                                                const label = isSortableColumn(header)
                                                    ? header.label
                                                    : header;
                                                if (!isSortable(header)) {
                                                    return (
                                                        <th key={i} scope="col">
                                                            {label}
                                                        </th>
                                                    );
                                                }
                                                const sortingOrder =
                                                    currentSort?.column === i
                                                        ? currentSort?.order
                                                        : "none";
                                                return (
                                                    <SortableTh
                                                        key={i}
                                                        order={sortingOrder}
                                                        onSort={() => {
                                                            const newOrder = cycleSortingOrder(i);
                                                            onSort?.(i, newOrder);
                                                        }}
                                                    >
                                                        {label}
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
                    </div>
                </div>
            </div>
        );
    })
);

const SortableTh = ({
    children,
    order,
    onSort
}: {
    children: ReactNode;
    order: TableProps.SortingOrder;
    onSort: () => void;
}) => {
    const { t } = useTranslation();
    return (
        <th scope="col" aria-sort={order}>
            <div className={fr.cx("fr-cell--sort")}>
                {children}
                <button
                    className={fr.cx(
                        "fr-btn",
                        "fr-btn--sm",
                        order === "none" && `fr-btn--sort`,
                        order === "ascending" && "fr-btn--sort-asc",
                        order === "descending" && "fr-btn--sort-desc"
                    )}
                    onClick={() => {
                        onSort();
                    }}
                    type="button"
                >
                    {t("sort")}
                </button>
            </div>
        </th>
    );
};

function useSort(defaultSort?: TableProps.SortingState, sort?: TableProps.SortingState) {
    const [currentSortState, setCurrentSort] = useState<TableProps.SortingState | null>(
        defaultSort ?? null
    );
    const currentSort = sort ?? currentSortState;

    function cycleSortingOrder(column: number): TableProps.SortingOrder {
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

function isSortable(header: ReactNode | TableProps.SortableColumn): boolean {
    return isSortableColumn(header) && header.sortable;
}

function isSortableColumn(
    header: ReactNode | TableProps.SortableColumn
): header is TableProps.SortableColumn {
    return typeof header === "object" && header != null && "sortable" in header;
}

Table.displayName = symToStr({ Table });

const { useTranslation, addTableTranslations } = createComponentI18nApi({
    componentName: Table.displayName,
    frMessages: {
        "sort": "Trier"
    }
});

addTableTranslations({
    lang: "en",
    messages: {
        "sort": "Sort"
    }
});

export default Table;
