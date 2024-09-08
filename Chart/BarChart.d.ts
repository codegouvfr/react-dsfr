import React from "react";
import "@gouvfr/dsfr-chart/BarChart/bar-chart.common";
import "@gouvfr/dsfr-chart/BarChart/bar-chart.css";
import { IntrinsicGraphType, BaseChartProps, MultiChartProps, ChartLineProps, IntrinsicGraphLineType } from "./chartWrapper";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "bar-chart": {
                horizontal?: string;
                stacked?: string;
            } & IntrinsicGraphType & IntrinsicGraphLineType;
        }
    }
}
export type BarChartBaseProps = {
    horizontal?: boolean;
    stacked?: boolean;
} & MultiChartProps & ChartLineProps;
export type BarChartProps = BarChartBaseProps & BaseChartProps;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-barchart> */
export declare const BarChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    horizontal?: boolean | undefined;
    stacked?: boolean | undefined;
} & MultiChartProps & ChartLineProps & BaseChartProps & React.RefAttributes<HTMLDivElement>>>;
export default BarChart;
