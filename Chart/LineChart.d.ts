import React from "react";
import "@gouvfr/dsfr-chart/LineChart/line-chart.common";
import "@gouvfr/dsfr-chart/LineChart/line-chart.css";
import { ChartProps, IntrinsicGraphType, BaseChartProps, ChartLineProps, IntrinsicGraphLineType } from "./chartWrapper";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "line-chart": IntrinsicGraphType & IntrinsicGraphLineType;
        }
    }
}
export type LineChartBaseProps = ChartProps & ChartLineProps;
export type LineChartProps = LineChartBaseProps & BaseChartProps;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-linechart> */
export declare const LineChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<ChartProps & ChartLineProps & BaseChartProps & React.RefAttributes<HTMLDivElement>>>;
export default LineChart;
