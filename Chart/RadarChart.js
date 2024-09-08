"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/RadarChart/radar-chart.common";
import "@gouvfr/dsfr-chart/RadarChart/radar-chart.css";
import { chartWrapper, stringifyObjectValue } from "./chartWrapper";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-radarchart> */
export const RadarChart = chartWrapper((props) => React.createElement("radar-chart", Object.assign({}, stringifyObjectValue(props))), "radar-chart");
RadarChart.displayName = symToStr({ RadarChart });
export default RadarChart;
//# sourceMappingURL=RadarChart.js.map