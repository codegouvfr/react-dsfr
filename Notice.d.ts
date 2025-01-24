import React, { type ReactNode, type CSSProperties } from "react";
import { type FrClassName } from "./fr";
import { type RegisteredLinkProps } from "./link";
export type NoticeProps = (NoticeProps.NonClosable | NoticeProps.Closable) & (NoticeProps.OptionalIcon | NoticeProps.MandatoryIcon);
export declare namespace NoticeProps {
    type Common = {
        id?: string;
        className?: string;
        classes?: Partial<Record<"root" | "title" | "description" | "close" | "link", string>>;
        title: NonNullable<ReactNode>;
        description?: ReactNode;
        style?: CSSProperties;
        link?: {
            linkProps: RegisteredLinkProps;
            text: ReactNode;
        };
        /** Default: "info" */
        severity?: NoticeProps.Severity;
    };
    export type NonClosable = Common & {
        isClosable?: false;
        isClosed?: never;
        onClose?: never;
    };
    export type Closable = Closable.Controlled | Closable.Uncontrolled;
    export namespace Closable {
        type Controlled = Common & {
            isClosable: true;
            isClosed: boolean;
            onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
        };
        type Uncontrolled = Common & {
            isClosable: true;
            onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
            isClosed?: never;
        };
    }
    export type OptionalIcon = {
        severity?: Exclude<Severity, RiskyAlertSeverity | WeatherSeverity>;
        iconDisplayed?: boolean;
    };
    export type MandatoryIcon = {
        severity: RiskyAlertSeverity | WeatherSeverity;
        iconDisplayed?: true;
    };
    type ExtractSeverity<FrClassName> = FrClassName extends `fr-notice--${infer Severity}` ? Severity : never;
    export type Severity = Exclude<ExtractSeverity<FrClassName>, "no-icon">;
    type ExtractWeatherSeverity<Severity> = Severity extends `weather-${infer _WeatherSeverity}` ? Severity : never;
    export type WeatherSeverity = ExtractWeatherSeverity<Severity>;
    export type RiskyAlertSeverity = "witness" | "kidnapping" | "attack" | "cyberattack";
    export {};
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-notice> */
export declare const Notice: React.MemoExoticComponent<React.ForwardRefExoticComponent<NoticeProps & React.RefAttributes<HTMLDivElement>>>;
export default Notice;
declare const addNoticeTranslations: (params: {
    lang: string;
    messages: Partial<{
        "hide message": string;
    }>;
}) => void;
export { addNoticeTranslations };
