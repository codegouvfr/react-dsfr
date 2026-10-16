import React, { forwardRef, memo } from "react";
import { symToStr } from "tsafe/symToStr";
import { useAnalyticsId } from "../tools/useAnalyticsId";
import { TableWrapper, TableWrapperProps } from "./TableWrapper";
import BaseTable, { TableProps as BaseTableProps } from "./BaseTable";
import InteractiveTable, { TableProps as InteractiveTableProps } from "./InteractiveTable";

export type TableProps = Omit<TableWrapperProps, "children"> &
    (BaseTableProps | InteractiveTableProps);

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/tableau>  */
export const Table = memo(
    forwardRef<HTMLDivElement, TableProps>((props, ref) => {
        const { id: id_props, ...rest } = props;

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-table",
            "explicitlyProvidedId": id_props
        });

        return (
            <TableWrapper ref={ref} id={id} {...rest}>
                {isInteractiveTable(props) ? (
                    <InteractiveTable {...props} />
                ) : (
                    <BaseTable {...props} />
                )}
            </TableWrapper>
        );
    })
);

function isInteractiveTable(
    props: BaseTableProps | InteractiveTableProps
): props is InteractiveTableProps {
    return Boolean(
        props.headers?.find(
            header => header != null && typeof header === "object" && "sortable" in header
        )
    );
}

Table.displayName = symToStr({ Table });

export default Table;
