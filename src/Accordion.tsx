import React, { forwardRef, memo, ReactNode, useId, useState } from "react";
import { assert } from "tsafe";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import "@gouvfr/dsfr/dist/component/accordion/accordion.css";
import { symToStr } from "tsafe/symToStr";
import { useConstCallback } from "./lib/tools/powerhooks/useConstCallback";

export type AccordionProps = AccordionProps.Controlled | AccordionProps.Uncontrolled;

//TODO Controlled mode (callback onClick, expended etc ...)
export namespace AccordionProps {
    export type Common = {
        className?: string;
        titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
        label: ReactNode;
        classes?: Partial<Record<"root" | "accordion" | "title" | "collapse", string>>;
        content: NonNullable<ReactNode>;
        defaultExpanded?: boolean;
    };

    export type Uncontrolled = Common & {
        expanded?: undefined;
        onChange?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, expanded: boolean) => void;
    };

    export type Controlled = Common & {
        expanded: boolean;
        onChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, expanded: boolean) => void;
    };
}

/** @see <https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon>  */
export const Accordion = memo(
    forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
        const {
            className,
            titleAs: HtmlTitleTag = "h3",
            label,
            classes = {},
            content,
            expanded: expandedProp,
            defaultExpanded = false,
            onChange,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useId();

        const [expandedState, setExpandedState] = useState(defaultExpanded);

        const value = expandedProp ? expandedProp : expandedState;

        const handleChange = useConstCallback(
            (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setExpandedState(!value);
                if (onChange) {
                    onChange(event, !value);
                }
            }
        );

        return (
            <section className={cx(fr.cx("fr-accordion"), className)} ref={ref} {...rest}>
                <HtmlTitleTag className={cx(fr.cx("fr-accordion__title"), classes.title)}>
                    <button
                        className={fr.cx("fr-accordion__btn")}
                        aria-expanded={value}
                        aria-controls={`accordion-${id}`}
                        onClick={handleChange}
                    >
                        {label}
                    </button>
                </HtmlTitleTag>
                <div className={cx(fr.cx("fr-collapse"), classes.collapse)} id={`accordion-${id}`}>
                    {content}
                </div>
            </section>
        );
    })
);

Accordion.displayName = symToStr({ Accordion });

export default Accordion;
