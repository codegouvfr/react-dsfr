import React, { memo, forwardRef, useId, type CSSProperties } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { createComponentI18nApi } from "../i18n";
import type { Equals } from "tsafe";
import { cx } from "../tools/cx";
import { fr } from "../fr";
import { SearchButton } from "./SearchButton";
import "../assets/search-bar.css";

export type SearchBarProps = {
    className?: string;
    /** Default: "Rechercher" (or translation) */
    label?: string;
    /** Default: false */
    big?: boolean;
    classes?: Partial<Record<"root" | "label", string>>;
    style?: CSSProperties;
    renderInput?: (
        /**
         * id and name must be forwarded to the <input /> component
         * the others params can, but it's not mandatory.
         **/
        params: {
            id: string;
            type: "search";
            className: string;
            placeholder: string;
        }
    ) => JSX.Element;

    onButtonClick?: (text: string) => void;
};

/**
 * @see <https://components.react-dsfr.fr/?path=/docs/components-input>
 * */
export const SearchBar = memo(
    forwardRef<HTMLDivElement, SearchBarProps>((props, ref) => {
        const {
            className,
            label: label_props,
            big = false,
            classes = {},
            style,
            renderInput = ({ className, id, placeholder, type }) => (
                <input className={className} id={id} placeholder={placeholder} type={type} />
            ),
            onButtonClick,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const { t } = useTranslation();

        const label = label_props ?? t("label");

        const inputId = `search-${useId()}-input`;

        return (
            <div
                className={cx(
                    fr.cx("fr-search-bar", big && "fr-search-bar--lg"),
                    classes.root,
                    className
                )}
                role="search"
                ref={ref}
                style={style}
                {...rest}
            >
                <label className={cx(fr.cx("fr-label"), classes.label)} htmlFor={inputId}>
                    {label}
                </label>
                {renderInput({
                    "className": fr.cx("fr-input"),
                    "placeholder": label,
                    "type": "search",
                    "id": inputId
                })}
                <SearchButton searchInputId={inputId} onClick={onButtonClick} />
            </div>
        );
    })
);

SearchBar.displayName = symToStr({ SearchBar });

export default SearchBar;

export const { useTranslation, addSearchBarTranslations } = createComponentI18nApi({
    "componentName": symToStr({ SearchBar }),
    "frMessages": {
        /* spell-checker: disable */
        "label": "Rechercher"
        /* spell-checker: enable */
    }
});

addSearchBarTranslations({
    "lang": "en",
    "messages": {
        "label": "Search"
    }
});
