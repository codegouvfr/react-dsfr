import React, { memo, forwardRef, type CSSProperties, useEffect, useState } from "react";
import { prDsfrLoaded } from "../start";
import { useAnalyticsId } from "../tools/useAnalyticsId";
import { cx } from "../tools/cx";

export type ChartColor =
    | "blue-france"
    | "green-bourgeon"
    | "blue-ecume"
    | "purple-glycine"
    | "pink-macaron"
    | "yellow-tournesol"
    | "orange-terre-battue"
    | "brown-cafe-creme"
    | "beige-gris-galet"
    | "green-emeraude"
    | "blue-cumulus"
    | "pink-tuile"
    | "yellow-moutarde"
    | "brown-caramel"
    | "green-menthe"
    | "brown-opera"
    | "green-archipel"
    | "green-tilleul-verveine";

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

const typeSafeObjectFromEntries = <T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
    entries: T
): { [K in T[number] as K[0]]: K[1] } => {
    return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
};

const typeSafeObjectEntries = <T extends Record<PropertyKey, unknown>>(
    obj: T
): { [K in keyof T]: [K, T[K]] }[keyof T][] => {
    return Object.entries(obj) as { [K in keyof T]: [K, T[K]] }[keyof T][];
};

export const stringifyObjectValue = <T extends Record<PropertyKey, unknown>>(obj: T) =>
    typeSafeObjectFromEntries(typeSafeObjectEntries(obj).map(([k, v]) => [k, JSON.stringify(v)]));

export const chartWrapper = <T extends {}>(ChartComponent: React.FC<T>, idPrefix: string) => {
    return memo(
        forwardRef<HTMLDivElement, React.ComponentProps<typeof ChartComponent> & BaseChartProps>(
            (props, ref) => {
                const [isDsfrLoaded, setIsDsfrLoaded] = useState(false);
                const { className, style, classes = {}, id: props_id, ...rest } = props;
                const graphProps = rest as T;

                useEffect(() => {
                    prDsfrLoaded.then(() => setIsDsfrLoaded(true));
                });

                const id = useAnalyticsId({
                    "defaultIdPrefix": `fr-chart-${idPrefix}`,
                    "explicitlyProvidedId": props_id
                });

                if (!isDsfrLoaded) {
                    return null;
                }

                return (
                    <div id={id} className={cx(className, classes.root)} style={style} ref={ref}>
                        <ChartComponent {...graphProps} />
                    </div>
                );
            }
        )
    );
};
