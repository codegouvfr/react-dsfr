import React, { useEffect, useMemo, useState, useId } from "react";
import { fr } from "../../fr";
import { createModal } from "../../Modal";
import { useLang } from "../../i18n";
import { useIsModalOpen } from "../../Modal/useIsModalOpen";
import { objectKeys } from "tsafe/objectKeys";
import { assert } from "tsafe/assert";
import { createProcessConsentChanges, createFullDenyFinalityConsent } from "../processConsentChanges";
import { exclude } from "tsafe/exclude";
import { useTranslation } from "./translation";
import { useRerenderOnChange, createStatefulObservable } from "../../tools/StatefulObservable";
import { useConst } from "../../tools/powerhooks/useConst";
export function createConsentManagement(params) {
    const { finalityDescription: finalityDescriptionOrGetFinalityDescription, personalDataPolicyLinkProps, useFinalityConsent, processConsentChanges, finalities } = params;
    const modal = createModal({
        "isOpenedByDefault": false,
        "id": "fr-consent-modal"
    });
    function ConsentManagement() {
        const lang = useLang();
        const { t } = useTranslation();
        const finalityDescription = useMemo(() => typeof finalityDescriptionOrGetFinalityDescription === "function"
            ? finalityDescriptionOrGetFinalityDescription({ lang })
            : finalityDescriptionOrGetFinalityDescription, [lang]);
        const { processLocalConsentChange, localFinalityConsent } = (function useClosure() {
            const realFinalityConsent = useFinalityConsent();
            const $localFinalityConsent = useConst(() => createStatefulObservable(() => realFinalityConsent !== null && realFinalityConsent !== void 0 ? realFinalityConsent : createFullDenyFinalityConsent(finalities)));
            useRerenderOnChange($localFinalityConsent);
            useEffect(() => {
                if (realFinalityConsent === undefined) {
                    return;
                }
                $localFinalityConsent.current = realFinalityConsent;
            }, [realFinalityConsent]);
            const { processConsentChanges } = createProcessConsentChanges({
                "consentCallback": undefined,
                finalities,
                "getFinalityConsent": () => $localFinalityConsent.current,
                "setFinalityConsent": ({ finalityConsent }) => ($localFinalityConsent.current = finalityConsent)
            });
            const processLocalConsentChange = processConsentChanges;
            return {
                processLocalConsentChange,
                "localFinalityConsent": $localFinalityConsent.current
            };
        })();
        const [isProcessingChanges, setIsProcessingChanges] = useState(false);
        const createOnClick = (type) => async () => {
            setIsProcessingChanges(true);
            switch (type) {
                case "apply local changes":
                    await processConsentChanges({
                        "type": "new finalityConsent explicitly provided",
                        "finalityConsent": localFinalityConsent
                    });
                    break;
                case "denyAll":
                case "grantAll":
                    processLocalConsentChange({ type });
                    await processConsentChanges({ type });
                    break;
            }
            setIsProcessingChanges(false);
            modal.close();
        };
        return (React.createElement(modal.Component, { title: t("consent modal title"), size: "large" },
            React.createElement("div", null,
                React.createElement("div", { className: fr.cx("fr-consent-service", "fr-consent-manager__header") },
                    React.createElement("fieldset", { className: fr.cx("fr-fieldset", "fr-fieldset--inline") },
                        React.createElement("legend", { className: fr.cx("fr-consent-service__title") }, t("preferences for all services", { personalDataPolicyLinkProps })),
                        React.createElement("div", { className: fr.cx("fr-consent-service__radios") },
                            React.createElement("div", { className: fr.cx("fr-btns-group", "fr-btns-group--inline", "fr-btns-group--right") },
                                React.createElement("button", { id: `${modal.id}-button-accept-all`, title: t("accept all - title"), className: fr.cx("fr-btn"), onClick: createOnClick("grantAll"), disabled: isProcessingChanges }, t("accept all")),
                                " ",
                                React.createElement("button", { id: `${modal.id}-button-refuse-all`, title: t("refuse all - title"), className: fr.cx("fr-btn", "fr-btn--secondary"), disabled: isProcessingChanges, onClick: createOnClick("denyAll") }, t("refuse all")))))),
                React.createElement(ConsentService, { title: t("mandatory cookies"), description: t("mandatory cookies - description"), finalityConsent: true, onChange: undefined, subFinalities: undefined }),
                objectKeys(finalityDescription)
                    .map(finality => ({
                    "finality": (assert(typeof finality === "string"), finality),
                    "wrap": finalityDescription[finality]
                }))
                    .map(({ finality, wrap }) => (React.createElement(ConsentService, { key: finality, title: wrap.title, description: wrap.description, subFinalities: wrap.subFinalities, onChange: ({ subFinality, isConsentGiven }) => (subFinality !== undefined
                        ? [`${finality}.${subFinality}`]
                        : wrap.subFinalities === undefined
                            ? [finality]
                            : Object.keys(wrap.subFinalities).map(subFinality => `${finality}.${subFinality}`)).forEach(finality => processLocalConsentChange({
                        "type": "atomic change",
                        finality,
                        isConsentGiven
                    })), finalityConsent: localFinalityConsent[finality] }))),
                React.createElement("ul", { className: fr.cx("fr-consent-manager__buttons", "fr-btns-group", "fr-btns-group--right", "fr-btns-group--inline-sm") },
                    React.createElement("li", null,
                        React.createElement("button", { id: `${modal.id}-button-confirm`, className: fr.cx("fr-btn"), disabled: isProcessingChanges, onClick: createOnClick("apply local changes") }, t("confirm choices")))))));
    }
    function ConsentService(props) {
        const { title, description, subFinalities, finalityConsent, onChange } = props;
        const { t } = useTranslation();
        const { legendId, descriptionId, acceptInputId, refuseInputId, subFinalityDivId } = (function useClosure() {
            const id = useId();
            const legendId = `finality-${id}-legend`;
            const descriptionId = `finality-${id}-desc`;
            const acceptInputId = `consent-finality-${id}-accept`;
            const refuseInputId = `consent-finality-${id}-refuse`;
            const subFinalityDivId = `finality-${id}-collapse`;
            return { legendId, descriptionId, acceptInputId, refuseInputId, subFinalityDivId };
        })();
        const macroState = useMemo(() => typeof finalityConsent === "boolean"
            ? finalityConsent
                ? "full consent"
                : "full refusal"
            : finalityConsent.isFullConsent
                ? "full consent"
                : Object.keys(finalityConsent)
                    .filter(exclude("isFullConsent"))
                    .map(subFinality => finalityConsent[subFinality])
                    .includes(true)
                    ? "partial consent"
                    : "full refusal", [finalityConsent]);
        const [isSubFinalityDivCollapsed, setIsSubFinalityDivCollapsed] = useState(true);
        return (React.createElement("div", { className: fr.cx("fr-consent-service") },
            React.createElement("fieldset", { "aria-labelledby": `${legendId} ${descriptionId}`, role: "group", className: fr.cx("fr-fieldset") },
                React.createElement("legend", { id: legendId, className: fr.cx("fr-consent-service__title") }, title),
                React.createElement("div", { className: fr.cx("fr-consent-service__radios") },
                    React.createElement("div", { className: fr.cx("fr-radio-group") },
                        React.createElement("input", Object.assign({ type: "radio", id: acceptInputId, checked: macroState === "full consent" }, (() => {
                            if (onChange === undefined)
                                return {
                                    "disabled": true
                                };
                            return {
                                "onChange": () => onChange({
                                    "subFinality": undefined,
                                    "isConsentGiven": true
                                })
                            };
                        })())),
                        React.createElement("label", { className: "fr-label", htmlFor: acceptInputId }, t("accept"))),
                    React.createElement("div", { className: fr.cx("fr-radio-group") },
                        React.createElement("input", Object.assign({ type: "radio", id: refuseInputId, checked: macroState === "full refusal" }, (() => {
                            if (onChange === undefined)
                                return {
                                    "disabled": true
                                };
                            return {
                                "onChange": () => onChange({
                                    "subFinality": undefined,
                                    "isConsentGiven": false
                                })
                            };
                        })())),
                        React.createElement("label", { className: fr.cx("fr-label"), htmlFor: refuseInputId }, t("refuse")))),
                description !== undefined && (React.createElement("p", { id: "finality-1-desc", className: "fr-consent-service__desc" }, description)),
                subFinalities !== undefined &&
                    (assert(typeof finalityConsent !== "boolean"),
                        assert(onChange !== undefined),
                        (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: fr.cx("fr-consent-service__collapse") },
                                React.createElement("button", { className: fr.cx("fr-consent-service__collapse-btn"), "aria-expanded": "false", "aria-describedby": legendId, "aria-controls": subFinalityDivId, onClick: () => setIsSubFinalityDivCollapsed(!isSubFinalityDivCollapsed) }, t(isSubFinalityDivCollapsed
                                    ? "see more details"
                                    : "hide details"))),
                            React.createElement("div", { className: fr.cx("fr-consent-services", "fr-collapse"), id: subFinalityDivId }, Object.entries(subFinalities).map(([subFinality, title]) => (React.createElement(SubConsentService, { key: subFinality, title: title, isConsentGiven: finalityConsent[subFinality], onChange: ({ isConsentGiven }) => onChange({
                                    subFinality,
                                    isConsentGiven
                                }) }))))))))));
    }
    function SubConsentService(props) {
        const { title, onChange, isConsentGiven } = props;
        const { t } = useTranslation();
        const { acceptInputId, refuseInputId } = (function useClosure() {
            const id = useId();
            const acceptInputId = `consent-finality-${id}-service-accept`;
            const refuseInputId = `consent-finality-${id}-service-refuse`;
            return { acceptInputId, refuseInputId };
        })();
        return (React.createElement("div", { className: fr.cx("fr-consent-service") },
            React.createElement("fieldset", { className: fr.cx("fr-fieldset", "fr-fieldset--inline") },
                React.createElement("legend", { className: fr.cx("fr-consent-service__title") }, title),
                React.createElement("div", { className: "fr-consent-service__radios fr-fieldset--inline" },
                    React.createElement("div", { className: "fr-radio-group" },
                        React.createElement("input", { type: "radio", id: acceptInputId, checked: isConsentGiven, onChange: () => onChange({ "isConsentGiven": true }) }),
                        React.createElement("label", { className: fr.cx("fr-label"), htmlFor: acceptInputId }, t("accept"))),
                    React.createElement("div", { className: fr.cx("fr-radio-group") },
                        React.createElement("input", { type: "radio", id: refuseInputId, checked: !isConsentGiven, onChange: () => onChange({ "isConsentGiven": false }) }),
                        React.createElement("label", { className: fr.cx("fr-label"), htmlFor: refuseInputId }, t("refuse")))))));
    }
    const consentModalButtonProps = modal.buttonProps;
    function useIsConsentManagementOpen() {
        return useIsModalOpen(modal);
    }
    return { ConsentManagement, consentModalButtonProps, useIsConsentManagementOpen };
}
//# sourceMappingURL=ConsentManagement.js.map