import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/MultiLineChart/multi-line-chart.common";
import "@gouvfr/dsfr-chart/MultiLineChart/multi-line-chart.css";
import {
    chartWrapper,
    IntrinsicGraphType,
    BaseChartProps,
    stringifyObjectValue,
    MultiChartProps,
    ChartLineProps,
    IntrinsicGraphLineType
} from "./chartWrapper";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // https://github.com/GouvernementFR/dsfr-chart/blob/v1.0.0/src/components/MultiLineChart.vue#L74
            "multi-line-chart": IntrinsicGraphType & IntrinsicGraphLineType;
        }
    }
}

export type MultiLineChartBaseProps = MultiChartProps & ChartLineProps;

export type MultiLineChartProps = MultiLineChartBaseProps & BaseChartProps;

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-chart> */
export const MultiLineChart = chartWrapper(
    (props: MultiLineChartBaseProps) => <multi-line-chart {...stringifyObjectValue(props)} />,
    "multi-line-chart"
);
MultiLineChart.displayName = symToStr({ MultiLineChart });

export default MultiLineChart;
