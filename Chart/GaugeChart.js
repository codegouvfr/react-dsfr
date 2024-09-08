"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/GaugeChart/gauge-chart.common";
import "@gouvfr/dsfr-chart/GaugeChart/gauge-chart.css";
import { chartWrapper, stringifyObjectValue } from "./chartWrapper";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-gaugechart> */
export const GaugeChart = chartWrapper((props) => React.createElement("gauge-chart", Object.assign({}, stringifyObjectValue(props))), "gauge-chart");
GaugeChart.displayName = symToStr({ GaugeChart });
export default GaugeChart;
//# sourceMappingURL=GaugeChart.js.map