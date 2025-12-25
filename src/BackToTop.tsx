import React from "react";
import { forwardRef, memo } from "react";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "./i18n";

export type BackToTopProps = {
    anchor?: string;
    /** Default: false (the back to top button is centered) */
    right?: boolean;
};

export const BackToTop = memo(
    forwardRef<HTMLAnchorElement, BackToTopProps>((props, ref) => {
        const { t } = useTranslation();
        const { anchor = "#top", right = false } = props;
        return (
            <div className={!right ? undefined : fr.cx("fr-grid-row", "fr-grid-row--right")}>
                <a
                    ref={ref}
                    className={cx(fr.cx("fr-link", "fr-icon-arrow-up-fill", "fr-link--icon-left"))}
                    href={anchor}
                >
                    {t("page top")}
                </a>
            </div>
        );
    })
);

BackToTop.displayName = symToStr({ BackToTop });

export default BackToTop;

const { useTranslation, addBackToTopTranslations } = createComponentI18nApi({
    "componentName": symToStr({ BackToTop }),
    "frMessages": {
        "page top": "Haut de page"
    }
});

addBackToTopTranslations({
    lang: "en",
    messages: {
        "page top": "Top of the page"
    }
});
