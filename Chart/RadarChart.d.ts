import React from "react";
import "@gouvfr/dsfr-chart/RadarChart/radar-chart.common";
import "@gouvfr/dsfr-chart/RadarChart/radar-chart.css";
import { IntrinsicGraphType, BaseChartProps, MultiChartProps } from "./chartWrapper";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "radar-chart": IntrinsicGraphType;
        }
    }
}
export type RadarChartBaseProps = MultiChartProps;
export type RadarChartProps = RadarChartBaseProps & BaseChartProps;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-radarchart> */
export declare const RadarChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<MultiChartProps & BaseChartProps & React.RefAttributes<HTMLDivElement>>>;
export default RadarChart;
