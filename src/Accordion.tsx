"use client";

import React, {
    forwardRef,
    memo,
    useId,
    useState,
    type ReactNode,
    type CSSProperties
} from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { symToStr } from "tsafe/symToStr";
import { useConstCallback } from "./tools/powerhooks/useConstCallback";

export type AccordionProps = AccordionProps.Controlled | AccordionProps.Uncontrolled;

export namespace AccordionProps {
    export type Common = {
        className?: string;
        titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
        label: ReactNode;
        classes?: Partial<Record<"root" | "accordion" | "title" | "collapse", string>>;
        style?: CSSProperties;
        children: NonNullable<ReactNode>;
    };

    export type Uncontrolled = Common & {
        defaultExpanded?: boolean;
        expanded?: undefined;
        onExpandedChange?: (
            expanded: boolean,
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void;
    };

    export type Controlled = Common & {
        defaultExpanded?: undefined;
        expanded: boolean;
        onExpandedChange: (
            expanded: boolean,
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-accordion>  */
export const Accordion = memo(
    forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
        const {
            className,
            titleAs: HtmlTitleTag = "h3",
            label,
            classes = {},
            style,
            children,
            expanded: expandedProp,
            defaultExpanded = false,
            onExpandedChange,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const accordionId = `accordion-${useId()}`;

        const [expandedState, setExpandedState] = useState(defaultExpanded);

        const value = expandedProp ? expandedProp : expandedState;

        const onExtendButtonClick = useConstCallback(
            (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setExpandedState(!value);
                onExpandedChange?.(!value, event);
            }
        );

        return (
            <section
                className={cx(fr.cx("fr-accordion"), className)}
                style={style}
                ref={ref}
                {...rest}
            >
                <HtmlTitleTag className={cx(fr.cx("fr-accordion__title"), classes.title)}>
                    <button
                        className={fr.cx("fr-accordion__btn")}
                        aria-expanded={value}
                        aria-controls={accordionId}
                        onClick={onExtendButtonClick}
                        type="button"
                    >
                        {label}
                    </button>
                </HtmlTitleTag>
                <div className={cx(fr.cx("fr-collapse"), classes.collapse)} id={accordionId}>
                    {children}
                </div>
            </section>
        );
    })
);

Accordion.displayName = symToStr({ Accordion });

export default Accordion;
