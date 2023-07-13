import React, { type ReactNode, type CSSProperties } from "react";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
export type QuoteProps = {
    id?: string;
    className?: string;
    text: ReactNode;
    author?: ReactNode;
    source?: ReactNode;
    sourceUrl?: string;
    imageUrl?: string;
    size?: "medium" | "large" | "xlarge";
    accentColor?: QuoteProps.AccentColor;
    classes?: Partial<Record<"root" | "author" | "source" | "image" | "imageTag" | "text", string>>;
    style?: CSSProperties;
};
export declare namespace QuoteProps {
    type ExtractAccentColor<FrClassName> = FrClassName extends `fr-quote--${infer AccentColor}` ? AccentColor : never;
    export type AccentColor = ExtractAccentColor<FrClassName>;
    export {};
}
/** @see <https://components.react-dsfr.fr/?path=/docs/components-quote> */
export declare const Quote: React.MemoExoticComponent<React.ForwardRefExoticComponent<QuoteProps & React.RefAttributes<HTMLDivElement>>>;
export default Quote;
