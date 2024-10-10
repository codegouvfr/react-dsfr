var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { createComponentI18nApi } from "./i18n";
import { getLink } from "./link";
import { useAnalyticsId } from "./tools/useAnalyticsId";
const DynamicLink = (_a) => {
    var { useReactLinkComponent, children } = _a, rest = __rest(_a, ["useReactLinkComponent", "children"]);
    const { Link } = getLink();
    return useReactLinkComponent ? React.createElement(Link, Object.assign({}, rest), children) : React.createElement("a", Object.assign({}, rest), children);
};
// naive page slicing
const getPaginationParts = ({ count, defaultPage }) => {
    const maxVisiblePages = 10;
    const slicesSize = 4;
    // first n pages
    if (count <= maxVisiblePages) {
        return Array.from({ length: count }, (_, v) => ({
            number: v + 1,
            active: defaultPage === v + 1
        }));
    }
    // last n pages
    if (defaultPage > count - maxVisiblePages) {
        return Array.from({ length: maxVisiblePages }, (_, v) => {
            const pageNumber = count - (maxVisiblePages - v) + 1;
            return {
                number: pageNumber,
                active: defaultPage === pageNumber
            };
        });
    }
    // slices
    return [
        ...Array.from({ length: slicesSize }, (_, v) => {
            if (defaultPage > slicesSize) {
                const pageNumber = v + defaultPage;
                return { number: pageNumber, active: defaultPage === pageNumber };
            }
            return { number: v + 1, active: defaultPage === v + 1 };
        }),
        { number: null, active: false },
        ...Array.from({ length: slicesSize }, (_, v) => {
            const pageNumber = count - (slicesSize - v) + 1;
            return {
                number: pageNumber,
                active: defaultPage === pageNumber
            };
        })
    ];
};
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-pagination> */
export const Pagination = memo(forwardRef((props, ref) => {
    const { id: id_props, className, count, defaultPage = 1, showFirstLast = true, getPageLinkProps, classes = {}, style } = props, rest = __rest(props, ["id", "className", "count", "defaultPage", "showFirstLast", "getPageLinkProps", "classes", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-pagination",
        "explicitlyProvidedId": id_props
    });
    const { t } = useTranslation();
    const { Link } = getLink();
    const parts = getPaginationParts({ count, defaultPage });
    const activePage = parts.find(part => part.active);
    const currentPage = activePage === null || activePage === void 0 ? void 0 : activePage.number;
    const isCurrentPageFirstPage = currentPage === 1;
    const isCurrentPageLastPage = currentPage === count;
    return (React.createElement("nav", { id: id, role: "navigation", className: cx(fr.cx("fr-pagination"), classes.root, className), "aria-label": t("aria-label"), style: style, ref: ref },
        React.createElement("ul", { className: cx(fr.cx("fr-pagination__list"), classes.list) },
            showFirstLast && (React.createElement("li", null,
                React.createElement(DynamicLink, Object.assign({ useReactLinkComponent: defaultPage > 1 }, (count > 0 && defaultPage > 1 && getPageLinkProps(1)), {
                    className: cx(fr.cx("fr-pagination__link", "fr-pagination__link--first"), classes.link, getPageLinkProps(1).className),
                    "aria-disabled": count > 0 && isCurrentPageFirstPage ? true : undefined,
                    role: "link"
                }), t("first page")))),
            React.createElement("li", null,
                React.createElement(DynamicLink, Object.assign({ useReactLinkComponent: defaultPage > 1 }, (defaultPage > 1 && getPageLinkProps(defaultPage - 1)), {
                    className: cx(fr.cx("fr-pagination__link", "fr-pagination__link--prev", "fr-pagination__link--lg-label"), classes.link),
                    "aria-disabled": isCurrentPageFirstPage ? true : undefined,
                    role: "link"
                }), t("previous page"))),
            parts.map(part => (React.createElement("li", { key: part.number }, part.number === null ? (React.createElement("a", { className: cx(fr.cx("fr-pagination__link"), classes.link) }, "...")) : (React.createElement(Link, Object.assign({ className: cx(fr.cx("fr-pagination__link"), classes.link), "aria-current": part.active ? true : undefined, title: `Page ${part.number}` }, getPageLinkProps(part.number)), part.number))))),
            React.createElement("li", null,
                React.createElement(DynamicLink, Object.assign({ useReactLinkComponent: defaultPage < count }, (defaultPage < count && getPageLinkProps(defaultPage + 1)), {
                    className: cx(fr.cx("fr-pagination__link", "fr-pagination__link--next", "fr-pagination__link--lg-label"), classes.link),
                    "aria-disabled": isCurrentPageLastPage ? true : undefined,
                    role: "link"
                }), t("next page"))),
            showFirstLast && (React.createElement("li", null,
                React.createElement(DynamicLink, Object.assign({ useReactLinkComponent: defaultPage < count }, (defaultPage < count && getPageLinkProps(count)), {
                    className: cx(fr.cx("fr-pagination__link", "fr-pagination__link--last"), classes.link),
                    "aria-disabled": isCurrentPageLastPage ? true : undefined
                }), t("last page")))))));
}));
Pagination.displayName = symToStr({ Pagination });
const { useTranslation, addPaginationTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Pagination }),
    "frMessages": {
        "first page": "Première page",
        "previous page": "Page précédente",
        "next page": "Page suivante",
        "last page": "Dernière page",
        "aria-label": "Pagination"
    }
});
addPaginationTranslations({
    "lang": "en",
    "messages": {
        "first page": "First page",
        "previous page": "Previous page",
        "next page": "Next page",
        "last page": "Last page",
        "aria-label": "Pagination"
    }
});
export { addPaginationTranslations };
export default Pagination;
//# sourceMappingURL=Pagination.js.map