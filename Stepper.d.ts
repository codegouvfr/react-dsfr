import React, { type ReactNode, type CSSProperties } from "react";
export type StepperProps = {
    id?: string;
    className?: string;
    currentStep: number;
    stepCount: number;
    title: ReactNode;
    nextTitle?: ReactNode;
    classes?: Partial<Record<"root" | "title" | "state" | "steps" | "details", string>>;
    style?: CSSProperties;
};
/** @see <https://components.react-dsfr.fr/?path=/docs/components-stepper> */
export declare const Stepper: React.MemoExoticComponent<React.ForwardRefExoticComponent<StepperProps & React.RefAttributes<HTMLDivElement>>>;
declare const addStepperTranslations: (params: {
    lang: string;
    messages: Partial<{
        progress: (p: {
            currentStep: number;
            stepCount: number;
        }) => string;
        "next step": string;
    }>;
}) => void;
export { addStepperTranslations };
export default Stepper;
