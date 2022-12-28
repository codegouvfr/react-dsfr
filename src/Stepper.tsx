"use client";

import React, { memo, forwardRef } from "react";
import type { ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { createComponentI18nApi } from "./i18n/i18n";

export type StepperProps = {
    className?: string;
    currentStep: number;
    stepCount: number;
    title: ReactNode;
    nextTitle?: ReactNode;
    classes?: Partial<Record<"root" | "title" | "state" | "steps" | "details", string>>;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-stepper> */
export const Stepper = memo(
    forwardRef<HTMLDivElement, StepperProps>((props, ref) => {
        const {
            className,
            currentStep,
            stepCount,
            title,
            nextTitle,
            classes = {},
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        return (
            <div className={cx(fr.cx("fr-stepper"), classes.root, className)} ref={ref}>
                <h2 className={cx(fr.cx("fr-stepper__title"), classes.title)}>
                    <span className={cx(fr.cx("fr-stepper__state"), classes.state)}>
                        {t("progress", { currentStep, stepCount })}
                    </span>
                    {title}
                </h2>
                <div
                    className={cx(fr.cx("fr-stepper__steps"), classes.steps)}
                    data-fr-current-step={currentStep}
                    data-fr-steps={stepCount}
                ></div>
                {nextTitle !== undefined && (
                    <p className={cx(fr.cx("fr-stepper__details"), classes.details)}>
                        <span className={fr.cx("fr-text--bold")}>{t("next step")}</span> {nextTitle}
                    </p>
                )}
            </div>
        );
    })
);

Stepper.displayName = symToStr({ Stepper });

const { useTranslation, addStepperTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Stepper }),
    "frMessages": {
        /* spell-checker: disable */
        "progress": (p: { currentStep: number; stepCount: number }) =>
            `Étape ${p.currentStep} sur ${p.stepCount}`,
        "next step": `Étape suivante :`
        /* spell-checker: enable */
    }
});

addStepperTranslations({
    "lang": "en",
    "messages": {
        "progress": ({ currentStep, stepCount }) => `Step ${currentStep} over ${stepCount}`,
        "next step": "Next step: "
    }
});

export { addStepperTranslations };

export default Stepper;
