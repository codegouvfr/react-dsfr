import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    ReactNode,
    forwardRef,
    memo,
    useId
} from "react";
import { createComponentI18nApi } from "./i18n";
import { symToStr } from "tsafe/symToStr";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { Equals, assert } from "tsafe";

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

export const Upload = memo(
    forwardRef<HTMLDivElement, UploadProps>((props, ref) => {
        const { t } = useTranslation();
        const {
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
                    className
                )}
                ref={ref}
            >
                <label className={fr.cx("fr-label")} aria-disabled={disabled} htmlFor={inputId}>
                    {t("add_files")}
                    <span className={fr.cx("fr-hint-text")}>{hint}</span>
                </label>
                <input
                    aria-describedby={messageId}
                    aria-disabled={disabled}
                    className={cx(fr.cx("fr-upload"))}
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
                            )
                        )}
                    >
                        {stateRelatedMessage}
                    </p>
                )}
            </div>
        );
    })
);

Upload.displayName = "Upload";

const { useTranslation, addUploadTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Upload }),
    "frMessages": {
        /* spell-checker: disable */
        "add_files": "Ajouter des fichiers",
        "hint": "Taille maximale : 500 Mo. Formats supportés : jpg, png, pdf. Plusieurs fichiers possibles."
        /* spell-checker: enable */
    }
});

addUploadTranslations({
    lang: "en",
    messages: {
        "add_files": "Add files",
        "hint": "Maximum size : 500 Mo. Supported formats : jpg, png, pdf. Many files possible."
    }
});
