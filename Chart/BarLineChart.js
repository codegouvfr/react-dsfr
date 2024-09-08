"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/BarLineChart/barline-chart.common";
import "@gouvfr/dsfr-chart/BarLineChart/barline-chart.css";
import { chartWrapper, stringifyObjectValue } from "./chartWrapper";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-barlinechart> */
export const BarLineChart = chartWrapper((props) => {
    return React.createElement("bar-line-chart", Object.assign({}, stringifyObjectValue(props)));
}, "bar-line-chart");
BarLineChart.displayName = symToStr({ BarLineChart });
export default BarLineChart;
//# sourceMappingURL=BarLineChart.js.map