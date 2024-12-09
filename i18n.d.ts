import type { JSX } from "./tools/JSX";
type ReactNode = string | JSX.Element | null;
type FrMessagesToTranslationFunction<FrMessages extends Record<string, ReactNode | ((params: any) => ReactNode)>> = {
    <K extends NonFunctionMessageKey<FrMessages>>(messageKey: K): FrMessages[K] extends (params: any) => infer R ? R : FrMessages[K];
} & {
    <K extends FunctionMessageKey<FrMessages>>(messageKey: K, params: ExtractArgument<FrMessages[K]>): FrMessages[K] extends (params: any) => infer R ? R : FrMessages[K];
};
type ExtractArgument<Message extends ReactNode | ((params: any) => ReactNode)> = Message extends (params: any) => any ? Parameters<Message>[0] : never;
type NonFunctionMessageKey<FrMessages extends Record<string, ReactNode | ((params: any) => ReactNode)>> = {
    [Key in keyof FrMessages]: FrMessages[Key] extends (params: any) => any ? never : Key;
}[keyof FrMessages];
type FunctionMessageKey<FrMessages extends Record<string, ReactNode | ((params: any) => ReactNode)>> = Exclude<keyof FrMessages, NonFunctionMessageKey<FrMessages>>;
export declare function setUseLang(params: {
    useLang: () => string;
}): void;
export declare function useLang(): string;
export declare function createComponentI18nApi<ComponentName extends string, FrMessages extends Record<string, ReactNode | ((params: any) => ReactNode)>>(params: {
    componentName: ComponentName;
    frMessages: FrMessages;
}): {
    useTranslation: () => {
        t: FrMessagesToTranslationFunction<FrMessages>;
    };
} & Record<`add${Capitalize<ComponentName>}Translations`, (params: {
    lang: string;
    messages: Partial<FrMessages>;
}) => void>;
export {};
