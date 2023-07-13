var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { createComponentI18nApi } from "./i18n";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.fr/?path=/docs/components-stepper> */
export const Stepper = memo(forwardRef((props, ref) => {
    const { id: id_props, className, currentStep, stepCount, title, nextTitle, classes = {}, style } = props, rest = __rest(props, ["id", "className", "currentStep", "stepCount", "title", "nextTitle", "classes", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-stepper",
        "explicitlyProvidedId": id_props
    });
    const { t } = useTranslation();
    return (React.createElement("div", { id: id, className: cx(fr.cx("fr-stepper"), classes.root, className), style: style, ref: ref },
        React.createElement("h2", { className: cx(fr.cx("fr-stepper__title"), classes.title) },
            React.createElement("span", { className: cx(fr.cx("fr-stepper__state"), classes.state) }, t("progress", { currentStep, stepCount })),
            title),
        React.createElement("div", { className: cx(fr.cx("fr-stepper__steps"), classes.steps), "data-fr-current-step": currentStep, "data-fr-steps": stepCount }),
        nextTitle !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-stepper__details"), classes.details) },
            React.createElement("span", { className: fr.cx("fr-text--bold") }, t("next step")),
            " ",
            nextTitle))));
}));
Stepper.displayName = symToStr({ Stepper });
const { useTranslation, addStepperTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Stepper }),
    "frMessages": {
        /* spell-checker: disable */
        "progress": (p) => `Étape ${p.currentStep} sur ${p.stepCount}`,
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
//# sourceMappingURL=Stepper.js.map