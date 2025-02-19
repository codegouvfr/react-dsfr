import React from "react";
import "@gouvfr/dsfr-chart/PieChart/pie-chart.common";
import "@gouvfr/dsfr-chart/PieChart/pie-chart.css";
import { type ChartProps, type IntrinsicGraphType, type BaseChartProps, type ChartColor } from "./chartWrapper";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "pie-chart": {
                fill?: string;
            } & IntrinsicGraphType;
        }
    }
}
export type PieChartBaseProps = {
    fill?: boolean;
    name?: string[];
    color?: ChartColor[];
} & Omit<ChartProps, "name" | "color">;
export type PieChartProps = PieChartBaseProps & BaseChartProps;
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/charts-piechart> */
export declare const PieChart: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    fill?: boolean | undefined;
    name?: string[] | undefined;
    color?: ChartColor[] | undefined;
} & Omit<ChartProps, "color" | "name"> & BaseChartProps & React.RefAttributes<HTMLDivElement>>>;
export default PieChart;
