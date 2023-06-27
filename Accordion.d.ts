import React, { type ReactNode, type CSSProperties } from "react";
export type AccordionProps = AccordionProps.Controlled | AccordionProps.Uncontrolled;
export declare namespace AccordionProps {
    type Common = {
        className?: string;
        titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
        label: ReactNode;
        classes?: Partial<Record<"root" | "accordion" | "title" | "collapse", string>>;
        style?: CSSProperties;
        children: NonNullable<ReactNode>;
    };
    type Uncontrolled = Common & {
        defaultExpanded?: boolean;
        expanded?: undefined;
        onExpandedChange?: (expanded: boolean, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };
    type Controlled = Common & {
        defaultExpanded?: undefined;
        expanded: boolean;
        onExpandedChange: (expanded: boolean, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };
}
/** @see <https://components.react-dsfr.fr/?path=/docs/components-accordion>  */
export declare const Accordion: React.MemoExoticComponent<React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>>;
export default Accordion;
