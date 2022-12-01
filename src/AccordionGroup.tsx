import React, { forwardRef, memo } from "react";
import { assert } from "tsafe";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import "@gouvfr/dsfr/dist/component/accordion/accordion.css";
import { symToStr } from "tsafe/symToStr";
import { Accordion, AccordionProps } from "./Accordion";

export type AccordionGroup = AccordionGroup.Controlled;

export namespace AccordionGroup {
    export type Common = {
        className?: string;
        accordions: AccordionProps[];
    };

    export type Controlled = Common & {};
}

/** @see <https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon>  */
export const AccordionGroup = memo(
    forwardRef<HTMLDivElement, AccordionGroup>((props, ref) => {
        const { className, accordions, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        return (
            <div className={cx(fr.cx("fr-accordions-group"), className)} ref={ref} {...rest}>
                {accordions.map(({ label, content, className, titleAs, classes = {} }) => (
                    <Accordion
                        label={label}
                        content={content}
                        titleAs={titleAs}
                        classes={classes}
                        className={className}
                    />
                ))}
            </div>
        );
    })
);

AccordionGroup.displayName = symToStr({ AccordionGroup });

export default AccordionGroup;
