"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/ScatterChart/scatter-chart.common";
import "@gouvfr/dsfr-chart/ScatterChart/scatter-chart.css";
import {
    chartWrapper,
    BaseChartProps,
    MultiChartProps,
    IntrinsicGraphType,
    stringifyObjectValue,
    ChartLineProps,
    IntrinsicGraphLineType
} from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsfr-chart/blob/v1.0.0/src/components/ScatterChart.vue#L75
            "scatter-chart": {
                showLine?: string;
            } & IntrinsicGraphType &
                IntrinsicGraphLineType;
        }
    }
}

type ScatterChartBaseProps = {
    x: number[][];
    showLine?: boolean;
} & Omit<MultiChartProps, "x"> &
    ChartLineProps;

export type ScatterChartProps = ScatterChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-radarchart> */
export const ScatterChart = chartWrapper(
    (props: ScatterChartBaseProps) => <scatter-chart {...stringifyObjectValue(props)} />,
    "scatter-chart"
);
ScatterChart.displayName = symToStr({ ScatterChart });

export default ScatterChart;
