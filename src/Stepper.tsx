import React, { memo, forwardRef } from "react";
import type { ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import { createComponentI18nApi } from "./lib/i18n";

// We make users import dsfr.css, so we don't need to import the scoped CSS
// but in the future if we have a complete component coverage it
// we could stop requiring users to import the hole CSS and only import on a
// per component basis.
import "./dsfr/component/stepper/stepper.css";

export type StepperProps = {
    className?: string;
    step: number;
    stepCount: number;
    title: ReactNode;
    nextTitle?: ReactNode;
    classes?: Partial<Record<"root" | "title" | "state" | "steps" | "details", string>>;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-stepper> */
export const Stepper = memo(
    forwardRef<HTMLDivElement, StepperProps>((props, ref) => {
        const { className, step, stepCount, title, nextTitle, classes = {}, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        return (
            <div className={cx(fr.cx("fr-stepper"), classes.root, className)} ref={ref}>
                <h2 className={cx(fr.cx("fr-stepper__title"), classes.title)}>
                    <span className={cx(fr.cx("fr-stepper__state"), classes.state)}>
                        {t("progress", { step, stepCount })}
                    </span>
                    {title}
                </h2>
                <div
                    className={cx(fr.cx("fr-stepper__steps"), classes.steps)}
                    data-fr-current-step={step}
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
        "progress": (p: { step: number; stepCount: number }) =>
            `Étape ${p.step} sur ${p.stepCount}`,
        "next step": `Étape suivante :`
        /* spell-checker: enable */
    }
});

addStepperTranslations({
    "lang": "en",
    "messages": {
        "progress": ({ step, stepCount }) => `Step ${step} over ${stepCount}`,
        "next step": "Next step: "
    }
});

export { addStepperTranslations };

export default Stepper;
