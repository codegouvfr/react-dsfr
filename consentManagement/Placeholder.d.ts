import React from "react";
export type PlaceholderProps = {
    className?: string;
    style?: React.CSSProperties;
    titleAs?: "span" | `h${1 | 2 | 3 | 4 | 5 | 6}`;
    classes?: Partial<Record<"root" | "title" | "description" | "button", string>>;
    title: string;
    description: string;
    onGranted: () => void;
};
export declare const Placeholder: React.MemoExoticComponent<React.ForwardRefExoticComponent<PlaceholderProps & React.RefAttributes<HTMLDivElement>>>;
declare const addPlaceholderTranslations: (params: {
    lang: string;
    messages: Partial<{
        "enable message": string;
    }>;
}) => void;
export { addPlaceholderTranslations };
