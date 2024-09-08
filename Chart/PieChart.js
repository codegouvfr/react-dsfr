"use client";
import React from "react";
import { symToStr } from "tsafe/symToStr";
import "@gouvfr/dsfr-chart/PieChart/pie-chart.common";
import "@gouvfr/dsfr-chart/PieChart/pie-chart.css";
import { chartWrapper, stringifyObjectValue } from "./chartWrapper";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-piechart> */
export const PieChart = chartWrapper((props) => React.createElement("pie-chart", Object.assign({}, stringifyObjectValue(props))), "pie-chart");
PieChart.displayName = symToStr({ PieChart });
export default PieChart;
//# sourceMappingURL=PieChart.js.map