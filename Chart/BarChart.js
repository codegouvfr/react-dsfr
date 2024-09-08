"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/BarChart/bar-chart.common";
import "@gouvfr/dsfr-chart/BarChart/bar-chart.css";
import { chartWrapper, stringifyObjectValue } from "./chartWrapper";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-barchart> */
export const BarChart = chartWrapper((props) => {
    return React.createElement("bar-chart", Object.assign({}, stringifyObjectValue(props)));
}, "bar-chart");
BarChart.displayName = symToStr({ BarChart });
export default BarChart;
//# sourceMappingURL=BarChart.js.map