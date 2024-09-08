import React, { type CSSProperties } from "react";
export type ChartColor = "blue-france" | "green-bourgeon" | "blue-ecume" | "purple-glycine" | "pink-macaron" | "yellow-tournesol" | "orange-terre-battue" | "brown-cafe-creme" | "beige-gris-galet" | "green-emeraude" | "blue-cumulus" | "pink-tuile" | "yellow-moutarde" | "brown-caramel" | "green-menthe" | "brown-opera" | "green-archipel" | "green-tilleul-verveine";
export type IntrinsicGraphType = {
    x: string;
    y: string;
    name?: string;
    color?: string;
};
export type IntrinsicGraphLineType = {
    hline?: string;
    hlinename?: string;
    vline?: string;
    vlinename?: string;
    vlinecolor?: string;
    hlinecolor?: string;
};
export type BaseChartProps = {
    id?: string;
    className?: string;
    style?: CSSProperties;
    classes?: Partial<Record<"root" | "wrapper" | "link" | "details", string>>;
};
export type ChartLineProps = {
    hline?: any[];
    hlinename?: string[];
    vline?: number[];
    vlinename?: string[];
    vlinecolor?: string[];
    hlinecolor?: string[];
};
export type ChartProps = {
    x: any[];
    y: number[];
    name?: string;
    color?: ChartColor;
};
export type MultiChartProps = {
    x: any[][];
    y: number[][];
    name?: string[];
    color?: ChartColor[];
};
export declare const stringifyObjectValue: <T extends Record<PropertyKey, unknown>>(obj: T) => { [K in [keyof T, string] as K[0]]: K[1]; };
export declare const chartWrapper: <T extends {}>(ChartComponent: React.FC<T>, idPrefix: string) => React.MemoExoticComponent<React.ForwardRefExoticComponent<React.PropsWithoutRef<T & BaseChartProps> & React.RefAttributes<HTMLDivElement>>>;
