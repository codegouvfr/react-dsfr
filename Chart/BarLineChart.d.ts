import React from "react";
import "@gouvfr/dsfr-chart/BarLineChart/barline-chart.common";
import "@gouvfr/dsfr-chart/BarLineChart/barline-chart.css";
import { IntrinsicGraphType, BaseChartProps, ChartProps, ChartLineProps, IntrinsicGraphLineType } from "./chartWrapper";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "bar-line-chart": {
                ybar: string;
            } & IntrinsicGraphType & IntrinsicGraphLineType;
        }
    }
}
export type BarLineChartBaseProps = {
    ybar: number[];
    name?: [string, string];
    horizontal?: boolean;
    stacked?: boolean;
} & Omit<ChartProps, "name"> & ChartLineProps;
export type BarLineChartProps = BarLineChartBaseProps & BaseChartProps;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-barlinechart> */
export declare const BarLineChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    ybar: number[];
    name?: [string, string] | undefined;
    horizontal?: boolean | undefined;
    stacked?: boolean | undefined;
} & Omit<ChartProps, "name"> & ChartLineProps & BaseChartProps & React.RefAttributes<HTMLDivElement>>>;
export default BarLineChart;
