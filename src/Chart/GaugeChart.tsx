"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/GaugeChart/gauge-chart.common";
import "@gouvfr/dsfr-chart/GaugeChart/gauge-chart.css";
import { chartWrapper, BaseChartProps, stringifyObjectValue, ChartColor } from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsfr-chart/blob/v1.0.0/src/components/GaugeChart.vue#L55
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
export const GaugeChart = chartWrapper(
    (props: GaugeChartBaseProps) => <gauge-chart {...stringifyObjectValue(props)} />,
    "gauge-chart"
);
GaugeChart.displayName = symToStr({ GaugeChart });

export default GaugeChart;
