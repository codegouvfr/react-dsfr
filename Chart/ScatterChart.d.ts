import React from "react";
import "@gouvfr/dsfr-chart/ScatterChart/scatter-chart.common";
import "@gouvfr/dsfr-chart/ScatterChart/scatter-chart.css";
import { BaseChartProps, MultiChartProps, IntrinsicGraphType, ChartLineProps, IntrinsicGraphLineType } from "./chartWrapper";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "scatter-chart": {
                showLine?: string;
            } & IntrinsicGraphType & IntrinsicGraphLineType;
        }
    }
}
type ScatterChartBaseProps = {
    x: number[][];
    showLine?: boolean;
} & Omit<MultiChartProps, "x"> & ChartLineProps;
export type ScatterChartProps = ScatterChartBaseProps & BaseChartProps;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-radarchart> */
export declare const ScatterChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    x: number[][];
    showLine?: boolean | undefined;
} & Omit<MultiChartProps, "x"> & ChartLineProps & BaseChartProps & React.RefAttributes<HTMLDivElement>>>;
export default ScatterChart;
