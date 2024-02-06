import React, { forwardRef, memo } from "react";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { Equals, assert } from "tsafe";
import { createComponentI18nApi } from "../i18n";
import { symToStr } from "tsafe/symToStr";

export type PlaceholderProps = {
    className?: string;
    style?: React.CSSProperties;
    titleAs?: "span" | `h${1 | 2 | 3 | 4 | 5 | 6}`;
    classes?: Partial<Record<"root" | "title" | "description" | "button", string>>;
    title: string;
    description: string;
    onGranted: () => void;
};

export const Placeholder = memo(
    forwardRef<HTMLDivElement, PlaceholderProps>((props, ref) => {
        const { t } = useTranslation();
        const {
            className,
            titleAs: HtmlTitleTag = "h4",
            classes = {},
            style,
            title,
            description,
            onGranted,
            ...rest
        } = props;
        assert<Equals<keyof typeof rest, never>>();
        return (
            <div
                className={cx(fr.cx("fr-consent-placeholder"), classes.root, className)}
                ref={ref}
                style={style}
                {...rest}
            >
                <HtmlTitleTag className={cx(fr.cx("fr-h6", "fr-mb-2v"), classes.title)}>
                    {title}
                </HtmlTitleTag>
                <p className={cx(fr.cx("fr-mb-6v"), classes.title)}>{description}</p>
                <button
                    className={cx(fr.cx("fr-btn"), classes.button)}
                    title={description}
                    onClick={onGranted}
                >
                    {t("enable message")}
                </button>
            </div>
        );
    })
);

const { useTranslation, addPlaceholderTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Placeholder }),
    "frMessages": {
        /* spell-checker: disable */
        "enable message": "Autoriser"
        /* spell-checker: enable */
    }
});

addPlaceholderTranslations({
    "lang": "en",
    "messages": {
        "enable message": "Authorize"
    }
});

addPlaceholderTranslations({
    "lang": "es",
    "messages": {
        /* spell-checker: disable */
        "enable message": "Permitir"
        /* spell-checker: enable */
    }
});

export { addPlaceholderTranslations };
