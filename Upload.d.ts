import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
export type UploadProps = {
    className?: string;
    /** @default false */
    disabled?: boolean;
    hint?: string;
    /** @default false */
    multiple?: boolean;
    /** @default "default" */
    state?: "success" | "error" | "default";
    /** The message won't be displayed if state is "default" */
    stateRelatedMessage?: ReactNode;
    /** Props forwarded to the underlying <input /> element */
    nativeInputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};
export declare const Upload: React.MemoExoticComponent<React.ForwardRefExoticComponent<UploadProps & React.RefAttributes<HTMLDivElement>>>;
