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
    caption: ReactNode;
    bordered?: boolean;
    headers?: string[];
    noscroll?: boolean;
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

// export namespace TableProps {
//     export type Common = {
//         className?: string;
//         titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
//         label: ReactNode;
//         classes?: Partial<Record<"root" | "Table" | "title" | "collapse", string>>;
//         style?: CSSProperties;
//         children: NonNullable<ReactNode>;
//     };

//     export type Uncontrolled = Common & {
//         defaultExpanded?: boolean;
//         expanded?: undefined;
//         onExpandedChange?: (
//             expanded: boolean,
//             e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//         ) => void;
//     };

//     export type Controlled = Common & {
//         defaultExpanded?: undefined;
//         expanded: boolean;
//         onExpandedChange: (
//             expanded: boolean,
//             e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//         ) => void;
//     };
// }

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/tableau>  */
export const Table = memo(
    forwardRef<HTMLDivElement, TableProps>((props, ref) => {
        const {
            data,
            headers,
            caption,
            bordered = false,
            noscroll = false,
            fixed = false,
            noCaption = false,
            bottomCaption = false,
            colorVariant,
            className,
            style,
            // titleAs: HtmlTitleTag = "h3",
            // label,
            // classes = {},
            // style,
            // children,
            // expanded: expandedProp,
            // defaultExpanded = false,
            // onExpandedChange,
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
                            "fr-table--no-scroll": noscroll,
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
                    <caption>{caption}</caption>
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
