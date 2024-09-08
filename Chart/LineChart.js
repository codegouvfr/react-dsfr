"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/LineChart/line-chart.common";
import "@gouvfr/dsfr-chart/LineChart/line-chart.css";
import { chartWrapper, stringifyObjectValue } from "./chartWrapper";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-linechart> */
export const LineChart = chartWrapper((props) => React.createElement("line-chart", Object.assign({}, stringifyObjectValue(props))), "line-chart");
LineChart.displayName = symToStr({ LineChart });
export default LineChart;
//# sourceMappingURL=LineChart.js.map