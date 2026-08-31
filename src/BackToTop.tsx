"use client";

import React, { forwardRef, memo, type CSSProperties } from "react";
import type { Equals } from "tsafe";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type BackToTopProps = {
    id?: string;
    className?: string;
    style?: CSSProperties;
    classes?: Partial<Record<"root" | "link", string>>;
    /** Default: false (the link is aligned on the left of the content) */
    right?: boolean;
} & (BackToTopProps.WithAnchor | BackToTopProps.WithTargetRef);

export namespace BackToTopProps {
    export type WithAnchor = {
        /**
         * Anchor of the element to go back to. Default: `"#top"`.
         *
         * The DSFR expects the matching `id` to be set on the topmost element of the
         * page, `<body id="top">` or the skip links container
         * (`<div class="fr-skiplinks" id="top">`), so that the navigation focus is
         * moved back to the top of the page along with the scroll.
         */
        anchor?: string;
        targetRef?: undefined;
    };

    export type WithTargetRef = {
        anchor?: undefined;
        /**
         * Element to scroll back to, as an alternative to `anchor` when no `id` can be
         * set on the top of the page. A `<button>` is rendered instead of a link: it
         * scrolls the element into view and moves the focus onto it.
         *
         * Typed structurally rather than as `RefObject<HTMLElement>` so that refs
         * created by both React 18 and React 19 are accepted.
         */
        targetRef: { readonly current: HTMLElement | null };
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-backtotop> */
export const BackToTop = memo(
    forwardRef<HTMLDivElement, BackToTopProps>((props, ref) => {
        const {
            id: id_props,
            className,
            style,
            classes = {},
            right = false,
            anchor,
            targetRef,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-back-to-top",
            "explicitlyProvidedId": id_props
        });

        const linkClassName = cx(
            fr.cx("fr-link", "fr-link--icon-left", "fr-icon-arrow-up-fill"),
            classes.link
        );

        // The wrapper only carries a class when the link is aligned on the right or when
        // the consumer provides one, `|| undefined` keeps an empty class="" out of the DOM.
        const rootClassName =
            cx(right && fr.cx("fr-grid-row", "fr-grid-row--right"), classes.root, className) ||
            undefined;

        return (
            <div id={id} ref={ref} style={style} className={rootClassName}>
                {targetRef === undefined ? (
                    <a className={linkClassName} href={anchor ?? "#top"}>
                        {t("back to top")}
                    </a>
                ) : (
                    <button
                        type="button"
                        className={linkClassName}
                        onClick={() => scrollBackTo(targetRef.current)}
                    >
                        {t("back to top")}
                    </button>
                )}
            </div>
        );
    })
);

function scrollBackTo(element: HTMLElement | null) {
    if (element === null) {
        return;
    }

    // An anchor gets the focus move for free from the browser, a scripted scroll does
    // not: without this, keyboard and screen reader users stay where they were while the
    // viewport jumps. An element that isn't already reachable has to be made
    // programmatically focusable first.
    if (element.tabIndex < 0) {
        element.tabIndex = -1;
    }

    element.focus({ "preventScroll": true });

    element.scrollIntoView({
        "behavior": window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        "block": "start"
    });
}

BackToTop.displayName = symToStr({ BackToTop });

const { useTranslation, addBackToTopTranslations } = createComponentI18nApi({
    "componentName": symToStr({ BackToTop }),
    "frMessages": {
        /* spell-checker: disable */
        "back to top": "Haut de page"
        /* spell-checker: enable */
    }
});

addBackToTopTranslations({
    "lang": "en",
    "messages": {
        "back to top": "Back to top"
    }
});
addBackToTopTranslations({
    "lang": "es",
    "messages": {
        "back to top": "Volver arriba"
    }
});
addBackToTopTranslations({
    "lang": "de",
    "messages": {
        "back to top": "Zum Seitenanfang"
    }
});

export { addBackToTopTranslations };

export default BackToTop;
