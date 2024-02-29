import React, { useEffect, useMemo, useState, useId, type ReactNode } from "react";
import { fr } from "../../fr";
import type { RegisteredLinkProps } from "../../link";
import { createModal } from "../../Modal";
import type { ExtractFinalityFromFinalityDescription, FinalityConsent } from "../types";
import type { ProcessConsentChanges } from "../processConsentChanges";
import { useLang } from "../../i18n";
import { useIsModalOpen } from "../../Modal/useIsModalOpen";
import { objectKeys } from "tsafe/objectKeys";
import { assert } from "tsafe/assert";
import {
    createProcessConsentChanges,
    createFullDenyFinalityConsent
} from "../processConsentChanges";
import { exclude } from "tsafe/exclude";
import { useTranslation } from "./translation";
import { useRerenderOnChange, createStatefulObservable } from "../../tools/StatefulObservable";
import { useConst } from "../../tools/powerhooks/useConst";

export function createConsentManagement<
    FinalityDescription extends Record<
        string,
        { title: ReactNode; description?: ReactNode; subFinalities?: Record<string, ReactNode> }
    >
>(params: {
    personalDataPolicyLinkProps: RegisteredLinkProps | undefined;
    finalityDescription: ((params: { lang: string }) => FinalityDescription) | FinalityDescription;
    useFinalityConsent: () =>
        | FinalityConsent<ExtractFinalityFromFinalityDescription<FinalityDescription>>
        | undefined;
    processConsentChanges: ProcessConsentChanges<
        ExtractFinalityFromFinalityDescription<FinalityDescription>
    >;
    finalities: ExtractFinalityFromFinalityDescription<FinalityDescription>[];
}) {
    type Finality = typeof finalities[number];

    const {
        finalityDescription: finalityDescriptionOrGetFinalityDescription,
        personalDataPolicyLinkProps,
        useFinalityConsent,
        processConsentChanges,
        finalities
    } = params;

    const modal = createModal({
        "isOpenedByDefault": false,
        "id": "fr-consent-modal"
    });

    function ConsentManagement() {
        const lang = useLang();

        const { t } = useTranslation();

        const finalityDescription = useMemo(
            () =>
                typeof finalityDescriptionOrGetFinalityDescription === "function"
                    ? finalityDescriptionOrGetFinalityDescription({ lang })
                    : finalityDescriptionOrGetFinalityDescription,
            [lang]
        );

        const { processLocalConsentChange, localFinalityConsent } = (function useClosure() {
            const realFinalityConsent = useFinalityConsent();

            const $localFinalityConsent = useConst(() =>
                createStatefulObservable(
                    () => realFinalityConsent ?? createFullDenyFinalityConsent(finalities)
                )
            );

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
                "setFinalityConsent": ({ finalityConsent }) =>
                    ($localFinalityConsent.current = finalityConsent)
            });

            const processLocalConsentChange: (
                params:
                    | {
                          type: "grantAll" | "denyAll";
                      }
                    | {
                          type: "atomic change";
                          finality: Finality;
                          isConsentGiven: boolean;
                      }
            ) => void = processConsentChanges;

            return {
                processLocalConsentChange,
                "localFinalityConsent": $localFinalityConsent.current
            };
        })();

        const [isProcessingChanges, setIsProcessingChanges] = useState(false);

        const createOnClick =
            (type: "grantAll" | "denyAll" | "apply local changes") => async () => {
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

        return (
            <modal.Component title={t("consent modal title")} size="large">
                <div>
                    <div className={fr.cx("fr-consent-service", "fr-consent-manager__header")}>
                        <fieldset className={fr.cx("fr-fieldset", "fr-fieldset--inline")}>
                            <legend className={fr.cx("fr-consent-service__title")}>
                                {t("preferences for all services", { personalDataPolicyLinkProps })}
                            </legend>
                            <div className={fr.cx("fr-consent-service__radios")}>
                                <div
                                    className={fr.cx(
                                        "fr-btns-group",
                                        "fr-btns-group--inline",
                                        "fr-btns-group--right"
                                    )}
                                >
                                    <button
                                        id={`${modal.id}-button-accept-all`}
                                        title={t("accept all - title")}
                                        className={fr.cx("fr-btn")}
                                        onClick={createOnClick("grantAll")}
                                        disabled={isProcessingChanges}
                                    >
                                        {t("accept all")}
                                    </button>{" "}
                                    <button
                                        id={`${modal.id}-button-refuse-all`}
                                        title={t("refuse all - title")}
                                        className={fr.cx("fr-btn", "fr-btn--secondary")}
                                        disabled={isProcessingChanges}
                                        onClick={createOnClick("denyAll")}
                                    >
                                        {t("refuse all")}
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <ConsentService
                        title={t("mandatory cookies")}
                        description={t("mandatory cookies - description")}
                        finalityConsent={true}
                        onChange={undefined}
                        subFinalities={undefined}
                    />
                    {objectKeys(finalityDescription)
                        .map(finality => ({
                            "finality": (assert(typeof finality === "string"), finality),
                            "wrap": finalityDescription[finality]
                        }))
                        .map(({ finality, wrap }) => (
                            <ConsentService
                                key={finality}
                                title={wrap.title}
                                description={wrap.description}
                                subFinalities={wrap.subFinalities}
                                onChange={({ subFinality, isConsentGiven }) =>
                                    (subFinality !== undefined
                                        ? [`${finality}.${subFinality}` as Finality]
                                        : wrap.subFinalities === undefined
                                        ? [finality as Finality]
                                        : Object.keys(wrap.subFinalities).map(
                                              subFinality =>
                                                  `${finality}.${subFinality}` as Finality
                                          )
                                    ).forEach(finality =>
                                        processLocalConsentChange({
                                            "type": "atomic change",
                                            finality,
                                            isConsentGiven
                                        })
                                    )
                                }
                                finalityConsent={
                                    localFinalityConsent[
                                        finality as keyof typeof localFinalityConsent
                                    ]
                                }
                            />
                        ))}

                    <ul
                        className={fr.cx(
                            "fr-consent-manager__buttons",
                            "fr-btns-group",
                            "fr-btns-group--right",
                            "fr-btns-group--inline-sm"
                        )}
                    >
                        <li>
                            <button
                                id={`${modal.id}-button-confirm`}
                                className={fr.cx("fr-btn")}
                                disabled={isProcessingChanges}
                                onClick={createOnClick("apply local changes")}
                            >
                                {t("confirm choices")}
                            </button>
                        </li>
                    </ul>
                </div>
            </modal.Component>
        );
    }

    function ConsentService(props: {
        title: ReactNode;
        description: ReactNode | undefined;
        subFinalities: Record<string, ReactNode> | undefined;
        finalityConsent:
            | boolean
            | ({
                  isFullConsent: boolean;
              } & Record<string, boolean>);
        /** Undefined when not modifiable */
        onChange:
            | ((params: { subFinality: string | undefined; isConsentGiven: boolean }) => void)
            | undefined;
    }) {
        const { title, description, subFinalities, finalityConsent, onChange } = props;

        const { t } = useTranslation();

        const { legendId, descriptionId, acceptInputId, refuseInputId, subFinalityDivId } =
            (function useClosure() {
                const id = useId();

                const legendId = `finality-${id}-legend`;

                const descriptionId = `finality-${id}-desc`;

                const acceptInputId = `consent-finality-${id}-accept`;

                const refuseInputId = `consent-finality-${id}-refuse`;

                const subFinalityDivId = `finality-${id}-collapse`;

                return { legendId, descriptionId, acceptInputId, refuseInputId, subFinalityDivId };
            })();

        const macroState = useMemo(
            (): "full consent" | "full refusal" | "partial consent" =>
                typeof finalityConsent === "boolean"
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
                    : "full refusal",
            [finalityConsent]
        );

        const [isSubFinalityDivCollapsed, setIsSubFinalityDivCollapsed] = useState(true);

        return (
            <div className={fr.cx("fr-consent-service")}>
                <fieldset
                    aria-labelledby={`${legendId} ${descriptionId}`}
                    role="group"
                    className={fr.cx("fr-fieldset")}
                >
                    <legend id={legendId} className={fr.cx("fr-consent-service__title")}>
                        {title}
                    </legend>
                    <div className={fr.cx("fr-consent-service__radios")}>
                        <div className={fr.cx("fr-radio-group")}>
                            <input
                                type="radio"
                                id={acceptInputId}
                                checked={macroState === "full consent"}
                                {...(() => {
                                    if (onChange === undefined)
                                        return {
                                            "disabled": true
                                        };

                                    return {
                                        "onChange": () =>
                                            onChange({
                                                "subFinality": undefined,
                                                "isConsentGiven": true
                                            })
                                    };
                                })()}
                            />
                            <label className="fr-label" htmlFor={acceptInputId}>
                                {t("accept")}
                            </label>
                        </div>
                        <div className={fr.cx("fr-radio-group")}>
                            <input
                                type="radio"
                                id={refuseInputId}
                                checked={macroState === "full refusal"}
                                {...(() => {
                                    if (onChange === undefined)
                                        return {
                                            "disabled": true
                                        };

                                    return {
                                        "onChange": () =>
                                            onChange({
                                                "subFinality": undefined,
                                                "isConsentGiven": false
                                            })
                                    };
                                })()}
                            />
                            <label className={fr.cx("fr-label")} htmlFor={refuseInputId}>
                                {t("refuse")}
                            </label>
                        </div>
                    </div>
                    {description !== undefined && (
                        <p className={fr.cx("fr-consent-service__desc")}>{description}</p>
                    )}
                    {subFinalities !== undefined &&
                        (assert(typeof finalityConsent !== "boolean"),
                        assert(onChange !== undefined),
                        (
                            <>
                                <div className={fr.cx("fr-consent-service__collapse")}>
                                    <button
                                        className={fr.cx("fr-consent-service__collapse-btn")}
                                        aria-expanded="false"
                                        aria-describedby={legendId}
                                        aria-controls={subFinalityDivId}
                                        onClick={() =>
                                            setIsSubFinalityDivCollapsed(!isSubFinalityDivCollapsed)
                                        }
                                    >
                                        {t(
                                            isSubFinalityDivCollapsed
                                                ? "see more details"
                                                : "hide details"
                                        )}
                                    </button>
                                </div>
                                <div
                                    className={fr.cx("fr-consent-services", "fr-collapse")}
                                    id={subFinalityDivId}
                                >
                                    {Object.entries(subFinalities).map(([subFinality, title]) => (
                                        <SubConsentService
                                            key={subFinality}
                                            title={title}
                                            isConsentGiven={finalityConsent[subFinality]}
                                            onChange={({ isConsentGiven }) =>
                                                onChange({
                                                    subFinality,
                                                    isConsentGiven
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                            </>
                        ))}
                </fieldset>
            </div>
        );
    }

    function SubConsentService(props: {
        title: ReactNode;
        onChange: (params: { isConsentGiven: boolean }) => void;
        isConsentGiven: boolean;
    }) {
        const { title, onChange, isConsentGiven } = props;

        const { t } = useTranslation();

        const { acceptInputId, refuseInputId } = (function useClosure() {
            const id = useId();

            const acceptInputId = `consent-finality-${id}-service-accept`;
            const refuseInputId = `consent-finality-${id}-service-refuse`;

            return { acceptInputId, refuseInputId };
        })();

        return (
            <div className={fr.cx("fr-consent-service")}>
                <fieldset className={fr.cx("fr-fieldset", "fr-fieldset--inline")}>
                    <legend className={fr.cx("fr-consent-service__title")}>{title}</legend>
                    <div className="fr-consent-service__radios fr-fieldset--inline">
                        <div className="fr-radio-group">
                            <input
                                type="radio"
                                id={acceptInputId}
                                checked={isConsentGiven}
                                onChange={() => onChange({ "isConsentGiven": true })}
                            />
                            <label className={fr.cx("fr-label")} htmlFor={acceptInputId}>
                                {t("accept")}
                            </label>
                        </div>
                        <div className={fr.cx("fr-radio-group")}>
                            <input
                                type="radio"
                                id={refuseInputId}
                                checked={!isConsentGiven}
                                onChange={() => onChange({ "isConsentGiven": false })}
                            />
                            <label className={fr.cx("fr-label")} htmlFor={refuseInputId}>
                                {t("refuse")}
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }

    const consentModalButtonProps = modal.buttonProps;

    function useIsConsentManagementOpen() {
        return useIsModalOpen(modal);
    }

    return { ConsentManagement, consentModalButtonProps, useIsConsentManagementOpen };
}
