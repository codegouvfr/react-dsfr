import { type ReactNode } from "react";
type Message = NonNullable<ReactNode> | ((params: any) => NonNullable<ReactNode>);
type Messages = Record<string, Message>;
type FrMessagesToTranslationFunction<FrMessages extends Messages> = {
    (messageKey: NonFunctionMessageKey<FrMessages>): string;
    <K extends FunctionMessageKey<FrMessages>>(messageKey: K, params: ExtractArgument<FrMessages[K]>): string;
};
type ExtractArgument<TMessage extends Message> = TMessage extends (params: any) => Exclude<Message, string> ? Parameters<TMessage>[0] : never;
type NonFunctionMessageKey<FrMessages extends Messages> = {
    [Key in keyof FrMessages]: FrMessages[Key] extends string ? Key : never;
}[keyof FrMessages];
type FunctionMessageKey<FrMessages extends Messages> = Exclude<keyof FrMessages, NonFunctionMessageKey<FrMessages>>;
export declare function setUseLang(params: {
    useLang: () => string;
}): void;
export declare function createComponentI18nApi<ComponentName extends string, FrMessages extends Messages>(params: {
    componentName: ComponentName;
    frMessages: FrMessages;
}): {
    useTranslation: () => {
        t: FrMessagesToTranslationFunction<FrMessages>;
    };
} & Record<`add${ComponentName}Translations`, (params: {
    lang: string;
    messages: Partial<FrMessages>;
}) => void>;
export {};
