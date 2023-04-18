type FrMessagesToTranslationFunction<FrMessages extends Record<string, string | ((params: any) => string)>> = {
    (messageKey: NonFunctionMessageKey<FrMessages>): string;
    <K extends FunctionMessageKey<FrMessages>>(messageKey: K, params: ExtractArgument<FrMessages[K]>): string;
};
type ExtractArgument<Message extends string | ((params: any) => string)> = Message extends (params: any) => string ? Parameters<Message>[0] : never;
type NonFunctionMessageKey<FrMessages extends Record<string, string | ((params: any) => string)>> = {
    [Key in keyof FrMessages]: FrMessages[Key] extends string ? Key : never;
}[keyof FrMessages];
type FunctionMessageKey<FrMessages extends Record<string, string | ((params: any) => string)>> = Exclude<keyof FrMessages, NonFunctionMessageKey<FrMessages>>;
export declare function setUseLang(params: {
    useLang: () => string;
}): void;
export declare function createComponentI18nApi<ComponentName extends string, FrMessages extends Record<string, string | ((params: any) => string)>>(params: {
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
