import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/LineChart/line-chart.common";
import "@gouvfr/dsfr-chart/LineChart/line-chart.css";
import {
    chartWrapper,
    ChartProps,
    IntrinsicGraphType,
    BaseChartProps,
    stringifyObjectValue,
    ChartLineProps,
    IntrinsicGraphLineType
} from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsfr-chart/blob/v1.0.0/src/components/LineChart.vue#L70
            "line-chart": IntrinsicGraphType & IntrinsicGraphLineType;
        }
    }
}

export type LineChartBaseProps = ChartProps & ChartLineProps;

export type LineChartProps = LineChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-chart> */
export const LineChart = chartWrapper(
    (props: LineChartBaseProps) => <line-chart {...stringifyObjectValue(props)} />,
    "line-chart"
);
LineChart.displayName = symToStr({ LineChart });

export default LineChart;
