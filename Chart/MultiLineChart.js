"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/MultiLineChart/multiline-chart.common";
import "@gouvfr/dsfr-chart/MultiLineChart/multiline-chart.css";
import { chartWrapper, stringifyObjectValue } from "./chartWrapper";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-multilinechart> */
export const MultiLineChart = chartWrapper((props) => React.createElement("multiline-chart", Object.assign({}, stringifyObjectValue(props))), "multiline-chart");
MultiLineChart.displayName = symToStr({ MultiLineChart });
export default MultiLineChart;
//# sourceMappingURL=MultiLineChart.js.map