import React, { forwardRef, memo, ReactNode, useId } from "react";
import { assert } from "tsafe";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import "@gouvfr/dsfr/dist/component/accordion/accordion.css";
import { symToStr } from "tsafe/symToStr";

export type AccordionProps = AccordionProps.Controlled;

//TODO Controlled mode (callback onClick, expended etc ...)
export namespace AccordionProps {
    export type Common = {
        className?: string;
        titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
        label: ReactNode;
        classes?: Partial<Record<"root" | "accordion" | "title" | "collapse", string>>;
        content: NonNullable<ReactNode>;
    };

    export type Controlled = Common & {};
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
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useId();

        return (
            <section className={cx(fr.cx("fr-accordion"), className)} ref={ref} {...rest}>
                <HtmlTitleTag className={cx(fr.cx("fr-accordion__title"), classes.title)}>
                    <button
                        className={fr.cx("fr-accordion__btn")}
                        aria-expanded="true"
                        aria-controls={`accordion-${id}`}
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
