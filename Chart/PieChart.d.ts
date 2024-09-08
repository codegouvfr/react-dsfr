import React from "react";
import "@gouvfr/dsfr-chart/PieChart/pie-chart.common";
import "@gouvfr/dsfr-chart/PieChart/pie-chart.css";
import { ChartProps, IntrinsicGraphType, BaseChartProps } from "./chartWrapper";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "pie-chart": {
                fill?: string;
            } & IntrinsicGraphType;
        }
    }
}
export type PieChartBaseProps = {
    fill?: boolean;
} & ChartProps;
export type PieChartProps = PieChartBaseProps & BaseChartProps;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-piechart> */
export declare const PieChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    fill?: boolean | undefined;
} & ChartProps & BaseChartProps & React.RefAttributes<HTMLDivElement>>>;
export default PieChart;
