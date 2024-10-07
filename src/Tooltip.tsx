import React, { forwardRef, memo, ReactElement } from "react";
import type { Equals } from "tsafe";
import { assert } from "tsafe/assert";
import { symToStr } from "tsafe/symToStr";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import { createComponentI18nApi } from "./i18n";

export type TooltipProps = TooltipProps.WithClickAction | TooltipProps.WithHoverAction;

export namespace TooltipProps {
    export type Common = {
        description: string;
        id?: string;
        className?: string;
    };

    export type WithClickAction = Common & {
        kind: "click";
        children?: ReactElement | string;
    };

    export type WithHoverAction = Common & {
        kind?: "hover";
        children: ReactElement | string;
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tooltip> */
export const Tooltip = memo(
    forwardRef<HTMLSpanElement, TooltipProps>((props, ref) => {
        const { id: id_prop, className, description, kind, children, ...rest } = props;
        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-tooltip",
            "explicitlyProvidedId": id_prop
        });

        const displayChildren = (
            children: ReactElement | string | undefined,
            id: string
        ): ReactElement => {
            if (children === undefined) return <></>;
            return typeof children === "string" ? (
                <span aria-describedby={id} id={`tooltip-owner-${id}`}>
                    {children}
                </span>
            ) : (
                children &&
                    React.cloneElement(children, {
                        "aria-describedby": id,
                        "id": `tooltip-owner-${id}`
                    })
            );
        };

        return (
            <>
                {props.kind === "click" ? (
                    <span ref={ref}>
                        {children === undefined ? (
                            <button
                                className="fr-btn--tooltip fr-btn"
                                aria-describedby={id}
                                id={`tooltip-owner-${id}`}
                            >
                                {t("tooltip-button-text")}
                            </button>
                        ) : (
                            displayChildren(children, id)
                        )}
                        <span
                            className={`fr-tooltip fr-placement ${props.className}`}
                            id={id}
                            role="tooltip"
                            aria-hidden="true"
                        >
                            {props.description}
                        </span>
                    </span>
                ) : (
                    <span ref={ref}>
                        {displayChildren(children, id)}
                        <span
                            className={`fr-tooltip fr-placement ${props.className}`}
                            id={id}
                            role="tooltip"
                            aria-hidden="true"
                        >
                            {props.description}
                        </span>
                    </span>
                )}
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
