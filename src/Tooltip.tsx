import React, { forwardRef, memo } from "react";
import type { ReactNode, CSSProperties } from "react";
import type { Equals } from "tsafe";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import { createComponentI18nApi } from "./i18n";
import { fr } from "./fr";
import { cx } from "./tools/cx";

export type TooltipProps = TooltipProps.WithClickAction | TooltipProps.WithHoverAction;

export namespace TooltipProps {
    export type Common = {
        title: ReactNode;
        id?: string;
        className?: string;
        style?: CSSProperties;
    };

    export type WithClickAction = Common & {
        kind: "click";
        children?: undefined;
    };

    export type WithHoverAction = Common & {
        kind?: "hover";
        children?: ReactNode;
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tooltip> */
export const Tooltip = memo(
    forwardRef<HTMLSpanElement, TooltipProps>((props, ref) => {
        const { id: id_prop, className, title, kind, style, children, ...rest } = props;
        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-tooltip",
            "explicitlyProvidedId": id_prop
        });

        return (
            <>
                {kind === "click" ? (
                    <button
                        className={fr.cx("fr-btn--tooltip", "fr-btn")}
                        aria-describedby={id}
                        id={`tooltip-owner-${id}`}
                        type="button"
                    >
                        {t("tooltip-button-text")}
                    </button>
                ) : typeof children === "undefined" ? (
                    // mimic default tooltip style
                    <i
                        className={fr.cx("fr-icon--sm", "fr-icon-question-line")}
                        style={{ color: fr.colors.decisions.text.actionHigh.blueFrance.default }}
                        aria-describedby={id}
                        id={`tooltip-owner-${id}`}
                    ></i>
                ) : (
                    <span aria-describedby={id} id={`tooltip-owner-${id}`}>
                        {children}
                    </span>
                )}
                <span
                    className={cx(fr.cx("fr-tooltip", "fr-placement"), className)}
                    id={id}
                    ref={ref}
                    style={style}
                    role="tooltip"
                >
                    {title}
                </span>
            </>
        );
    })
);

Tooltip.displayName = symToStr({ Tooltip });

const { useTranslation, addTooltipTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Tooltip }),
    "frMessages": {
        "tooltip-button-text": "Information contextuelle"
    }
});

addTooltipTranslations({
    "lang": "en",
    "messages": {
        "tooltip-button-text": "Contextual information"
    }
});

export { addTooltipTranslations };

export default Tooltip;
