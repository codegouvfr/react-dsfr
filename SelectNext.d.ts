import React, { type ReactNode, type CSSProperties, type ForwardedRef, type DetailedHTMLProps, type SelectHTMLAttributes, type ChangeEvent } from "react";
import type { FrClassName } from "./fr/generatedFromCss/classNames";
export type SelectProps<Options extends SelectProps.Option[]> = {
    options: Options;
    className?: string;
    label: ReactNode;
    hint?: ReactNode;
    nativeSelectProps?: Omit<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, "value" | "onChange"> & {
        value?: Options[number]["value"];
        onChange?: (e: Omit<ChangeEvent<HTMLSelectElement>, "target" | "currentTarget"> & {
            target: Omit<ChangeEvent<HTMLSelectElement>, "value"> & {
                value: Options[number]["value"];
            };
            currentTarget: Omit<ChangeEvent<HTMLSelectElement>, "value"> & {
                value: Options[number]["value"];
            };
        }) => void;
    };
    /** Default: false */
    disabled?: boolean;
    /** Default: "default" */
    state?: SelectProps.State | "default";
    /** The message won't be displayed if state is "default" */
    stateRelatedMessage?: ReactNode;
    style?: CSSProperties;
    placeholder?: string;
};
export declare namespace SelectProps {
    export type Option<T extends string = string> = {
        value: T;
        label: string;
        disabled?: boolean;
        /** Default: false, should be used only in uncontrolled mode */
        selected?: boolean;
    };
    type ExtractState<FrClassName> = FrClassName extends `fr-select-group--${infer State}` ? Exclude<State, "disabled"> : never;
    export type State = ExtractState<FrClassName>;
    export {};
}
/**
 * @see <https://components.react-dsfr.fr/?path=/docs/components-select>
 * */
declare function NonMemoizedNonForwardedSelect<T extends SelectProps.Option[]>(props: SelectProps<T>, ref: React.LegacyRef<HTMLDivElement>): JSX.Element;
export declare const Select: <T extends SelectProps.Option<string>[]>(props: SelectProps<T> & {
    ref?: React.ForwardedRef<HTMLDivElement> | undefined;
}) => ReturnType<typeof NonMemoizedNonForwardedSelect>;
export default Select;
declare const addSelectTranslations: (params: {
    lang: string;
    messages: Partial<{
        "select an option": string;
    }>;
}) => void;
export { addSelectTranslations };
