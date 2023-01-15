import React, { memo, forwardRef, useId } from "react";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { createComponentI18nApi } from "./i18n";
import type { Equals } from "tsafe";
import { cx } from "./tools/cx";
import { fr } from "./fr";

export type SearchBarProps = {
    className?: string;
    /** Default: "Rechercher" (or translation) */
    label?: string;
    /** Props forwarded to the underlying <input /> element */
    nativeInputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    /** Default: false */
    big?: boolean;
    classes?: Partial<Record<"root" | "label" | "input", string>>;
};

/**
 * @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-input>
 * */
export const SearchBar = memo(
    forwardRef<HTMLDivElement, SearchBarProps>((props, ref) => {
        const {
            className,
            label: label_props,
            nativeInputProps = {},
            big = false,
            classes = {},
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
                {...rest}
            >
                <label className={cx(fr.cx("fr-label"), classes.label)} htmlFor={inputId}>
                    {label}
                </label>
                <input
                    {...nativeInputProps}
                    className={cx(fr.cx("fr-input"), classes.input, nativeInputProps.className)}
                    placeholder={label}
                    type="search"
                    id={inputId}
                />
                <button className="fr-btn" title="Rechercher">
                    {label}
                </button>
            </div>
        );
    })
);

SearchBar.displayName = symToStr({ SearchBar });

export default SearchBar;

const { useTranslation, addSearchBarTranslations } = createComponentI18nApi({
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

export { addSearchBarTranslations };
