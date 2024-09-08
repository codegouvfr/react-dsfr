import React from "react";
import "@gouvfr/dsfr-chart/MultiLineChart/multiline-chart.common";
import "@gouvfr/dsfr-chart/MultiLineChart/multiline-chart.css";
import { IntrinsicGraphType, BaseChartProps, MultiChartProps, ChartLineProps, IntrinsicGraphLineType } from "./chartWrapper";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "multiline-chart": IntrinsicGraphType & IntrinsicGraphLineType;
        }
    }
}
export type MultiLineChartBaseProps = MultiChartProps & ChartLineProps;
export type MultiLineChartProps = MultiLineChartBaseProps & BaseChartProps;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-multilinechart> */
export declare const MultiLineChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<MultiChartProps & ChartLineProps & BaseChartProps & React.RefAttributes<HTMLDivElement>>>;
export default MultiLineChart;
