"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/ScatterChart/scatter-chart.common";
import "@gouvfr/dsfr-chart/ScatterChart/scatter-chart.css";
import { chartWrapper, stringifyObjectValue } from "./chartWrapper";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-radarchart> */
export const ScatterChart = chartWrapper((props) => React.createElement("scatter-chart", Object.assign({}, stringifyObjectValue(props))), "scatter-chart");
ScatterChart.displayName = symToStr({ ScatterChart });
export default ScatterChart;
//# sourceMappingURL=ScatterChart.js.map