import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useId } from "react";
import { createComponentI18nApi } from "./i18n";
import { symToStr } from "tsafe/symToStr";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { Equals, assert } from "tsafe";

export type UploadProps = {
    classes?: any;
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

const Upload = (props: UploadProps) => {
    const { t } = useTranslation();
    const {
        classes = {},
        className,
        disabled = false,
        hint = t("hint"),
        multiple = false,
        state = "default",
        stateRelatedMessage,
        nativeInputProps = {}
    } = props;

    const inputId = (function useClosure() {
        const id = useId();

        return nativeInputProps.id ?? `input-${id}`;
    })();

    const messageId = `${inputId}-desc-error`;
    return (
        <div
            className={cx(
                fr.cx(
                    "fr-upload-group",
                    disabled && "fr-input-group--disabled",
                    (() => {
                        switch (state) {
                            case "error":
                                return "fr-input-group--error";
                            case "success":
                                return "fr-input-group--valid";
                            case "default":
                                return undefined;
                        }
                        assert<Equals<typeof state, never>>(false);
                    })()
                ),
                classes.root,
                className
            )}
        >
            <label className="fr-label" aria-disabled={disabled} htmlFor={inputId}>
                Ajouter des fichiers
                <span className="fr-hint-text">{hint}</span>
            </label>
            <input
                aria-describedby="file-upload-with-error-desc-error"
                aria-disabled={disabled}
                className="fr-upload"
                disabled={disabled}
                id={inputId}
                multiple={multiple}
                name={inputId}
                type="file"
            />
            {state !== "default" && (
                <p
                    id={messageId}
                    className={cx(
                        fr.cx(
                            (() => {
                                switch (state) {
                                    case "error":
                                        return "fr-error-text";
                                    case "success":
                                        return "fr-valid-text";
                                }
                                assert<Equals<typeof state, never>>(false);
                            })()
                        ),
                        classes.message
                    )}
                >
                    {stateRelatedMessage}
                </p>
            )}
        </div>
    );
};

const { useTranslation } = createComponentI18nApi({
    "componentName": symToStr({ Upload }),
    "frMessages": {
        /* spell-checker: disable */
        "hint": "Taille maximale : 500 Mo. Formats supportés : jpg, png, pdf. Plusieurs fichiers possibles."
        /* spell-checker: enable */
    }
});

export default Upload;
