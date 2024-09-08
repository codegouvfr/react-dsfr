import React from "react";
import "@gouvfr/dsfr-chart/GaugeChart/gauge-chart.common";
import "@gouvfr/dsfr-chart/GaugeChart/gauge-chart.css";
import { BaseChartProps, ChartColor } from "./chartWrapper";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "gauge-chart": {
                value: string;
                init: string;
                target: string;
                color: string;
            };
        }
    }
}
export type GaugeChartBaseProps = {
    value: number;
    init: number;
    target: number;
    color?: ChartColor;
};
export type GaugeChartProps = GaugeChartBaseProps & BaseChartProps;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-gaugechart> */
export declare const GaugeChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<GaugeChartBaseProps & BaseChartProps & React.RefAttributes<HTMLDivElement>>>;
export default GaugeChart;
