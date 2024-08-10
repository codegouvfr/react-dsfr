import "./assets/language-select.css";
/** NOTE: Can be used as quick access item in the Header */
export declare function LanguageSelect<Language extends string>(props: {
    id?: string;
    supportedLangs: readonly Language[];
    fullNameByLang: Record<Language, string>;
    lang: Language;
    setLang: (lang: Language) => void;
}): JSX.Element;
export declare const useTranslation: () => {
    t: (<K extends "select language">(messageKey: K) => {
        "select language": string;
    }[K] extends (params: any) => infer R ? R : {
        "select language": string;
    }[K]) & (<K_1 extends never>(messageKey: K_1, params: {
        "select language": string;
    }[K_1] extends infer T ? T extends {
        "select language": string;
    }[K_1] ? T extends (params: any) => any ? Parameters<T>[0] : never : never : never) => {
        "select language": string;
    }[K_1] extends (params: any) => infer R_1 ? R_1 : {
        "select language": string;
    }[K_1]);
}, addLanguageSelectTranslations: (params: {
    lang: string;
    messages: Partial<{
        "select language": string;
    }>;
}) => void;
