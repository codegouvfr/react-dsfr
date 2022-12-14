import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";

// We make users import dsfr.css, so we don't need to import the scoped CSS
// but in the future if we have a complete component coverage it
// we could stop requiring users to import the hole CSS and only import on a
// per component basis.
import "./dsfr/component/stepper/stepper.css";

export type StepperProps = {
    className?: string;
    currentStep: number;
    steps: number;
    title: string;
    nextTitle?: string;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-stepper> */
export const Stepper = memo(
    forwardRef<HTMLDivElement, StepperProps>((props, ref) => {
        const { className, currentStep, steps, title, nextTitle, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        return (
            <div className={cx(fr.cx("fr-stepper"), className)} ref={ref}>
                <h2 className="fr-stepper__title">
                    <span className="fr-stepper__state">
                        Étape {currentStep} sur {steps}
                    </span>
                    {title}
                </h2>
                <div
                    className="fr-stepper__steps"
                    data-fr-current-step={currentStep}
                    data-fr-steps={steps}
                ></div>
                {nextTitle && (
                    <p className="fr-stepper__details">
                        <span className="fr-text--bold">Étape suivante :</span> {nextTitle}
                    </p>
                )}
            </div>
        );
    })
);

Stepper.displayName = symToStr({ Stepper });

export default Stepper;
