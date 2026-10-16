import React, { memo, type ReactNode } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { symToStr } from "tsafe/symToStr";

export type TableProps = {
    data: ReactNode[][];
    caption?: ReactNode;
    headers?: ReactNode[];
};

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/tableau>  */
export const Table = memo((props: TableProps) => {
    const { data, headers, caption, ...rest } = props;

    assert<Equals<keyof typeof rest, never>>();

    return (
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
    );
});

Table.displayName = symToStr({ Table });

export default Table;
