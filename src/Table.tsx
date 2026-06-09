import React, { forwardRef, memo, type ReactNode, type CSSProperties, useState } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { symToStr } from "tsafe/symToStr";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type TableProps = {
    id?: string;
    data: ReactNode[][];
    className?: string;
    caption?: ReactNode;
    headers?: ReactNode[];
    /** Default: false */
    headColumn?: boolean;
    /** Default: false */
    selectableRows?: boolean;
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
    cellsAlignment?: (TableProps.Alignment | undefined)[][] | (TableProps.Alignment | undefined)[];
    size?: TableProps.Size;
    style?: CSSProperties;
};

export namespace TableProps {
    export type Size = "sm" | "md" | "lg";

    type ExtractCellClasses<FrClassName> = FrClassName extends `fr-cell--${infer Alignment}`
        ? Alignment
        : never;

    export type Alignment = ExtractCellClasses<FrClassName> &
        ("center" | "top" | "bottom" | "right");
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/tableau>  */
export const Table = memo(
    forwardRef<HTMLDivElement, TableProps>((props, ref) => {
        const {
            id: id_props,
            data,
            headers,
            headColumn = false,
            selectableRows = false,
            caption,
            bordered = false,
            noScroll = false,
            fixed = false,
            noCaption = false,
            bottomCaption = false,
            size = "md",
            cellsAlignment = undefined,
            className,
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const [checkedIds, setCheckedIds] = useState<number[]>([]);

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-table",
            "explicitlyProvidedId": id_props
        });

        const getCellAlignment = (i: number, j: number): undefined | string => {
            if (Array.isArray(cellsAlignment)) {
                const rowCellsAlignement = cellsAlignment[i];
                if (Array.isArray(rowCellsAlignement)) {
                    const cellAlignement = rowCellsAlignement[j];
                    return cellAlignement === undefined ? undefined : `fr-cell--${cellAlignement}`;
                }

                const cellAlignement = cellsAlignment[j];
                return cellAlignement === undefined || Array.isArray(cellAlignement)
                    ? undefined
                    : `fr-cell--${cellAlignement}`;
            }
            return undefined;
        };

        const getRole = (headColumn: boolean, i: number): React.AriaRole | undefined => {
            return headColumn && i === 0 ? "rowheader" : undefined;
        };

        return (
            <div
                id={id}
                ref={ref}
                style={style}
                className={cx(
                    fr.cx(size !== "md" && `fr-table--${size}`, "fr-table", {
                        "fr-table--bordered": bordered,
                        "fr-table--no-scroll": noScroll,
                        "fr-table--layout-fixed": fixed,
                        "fr-table--no-caption": noCaption,
                        "fr-table--caption-bottom": bottomCaption
                    }),
                    className
                )}
            >
                <div className="fr-table__wrapper">
                    <div className="fr-table__container">
                        <div className="fr-table__content">
                            <table>
                                {caption !== undefined && <caption>{caption}</caption>}
                                {headers !== undefined && (
                                    <thead>
                                        <tr>
                                            {headers.map((header, i) => (
                                                <th
                                                    key={i}
                                                    scope="col"
                                                    role={getRole(headColumn, i)}
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                )}
                                <tbody>
                                    {data.map((row, i) => {
                                        const isChecked = checkedIds.includes(i);
                                        return (
                                            <tr key={i} aria-selected={isChecked}>
                                                {row.map((col, j) => {
                                                    const role = getRole(headColumn, j);
                                                    const HtmlElement =
                                                        role === undefined ? "td" : "th";
                                                    const isSelectable = selectableRows && j === 0;
                                                    if (isSelectable) {
                                                        return (
                                                            <HtmlElement
                                                                key={j}
                                                                className={cx(
                                                                    getCellAlignment(i, j)
                                                                )}
                                                                role={role}
                                                            >
                                                                <div
                                                                    className="fr-checkbox-group fr-checkbox-group--sm"
                                                                    onClick={() => {
                                                                        setCheckedIds(
                                                                            isChecked
                                                                                ? checkedIds.filter(
                                                                                      id => id !== i
                                                                                  )
                                                                                : [...checkedIds, i]
                                                                        );
                                                                    }}
                                                                >
                                                                    <input
                                                                        name="row-select"
                                                                        type="checkbox"
                                                                        checked={isChecked}
                                                                    />
                                                                    <label className="fr-label">
                                                                        {col}
                                                                    </label>
                                                                </div>
                                                            </HtmlElement>
                                                        );
                                                    }

                                                    return (
                                                        <HtmlElement
                                                            key={j}
                                                            className={cx(getCellAlignment(i, j))}
                                                            role={role}
                                                        >
                                                            {col}
                                                        </HtmlElement>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
);

Table.displayName = symToStr({ Table });

export default Table;
