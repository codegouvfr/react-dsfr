import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/BarLineChart/bar-line-chart.common";
import "@gouvfr/dsfr-chart/BarLineChart/bar-line-chart.css";
import {
    chartWrapper,
    IntrinsicGraphType,
    BaseChartProps,
    stringifyObjectValue,
    ChartProps,
    ChartLineProps,
    IntrinsicGraphLineType
} from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsfr-chart/blob/v1.0.0/src/components/BarLineChart.vue#L75
            "bar-line-chart": {
                ybar: string;
            } & IntrinsicGraphType &
                IntrinsicGraphLineType;
        }
    }
}

export type BarLineChartBaseProps = {
    ybar: number[];
    name: [string, string];
    horizontal?: boolean;
    stacked: boolean;
} & Omit<ChartProps, "name"> &
    ChartLineProps;

export type BarLineChartProps = BarLineChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-chart> */
export const BarLineChart = chartWrapper((props: BarLineChartBaseProps) => {
    return <bar-line-chart {...stringifyObjectValue(props)} />;
}, "bar-line-chart");
BarLineChart.displayName = symToStr({ BarLineChart });

export default BarLineChart;
