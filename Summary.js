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
import React, { memo, forwardRef, useId } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { getLink } from "./link";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import { generateValidHtmlId } from "./tools/generateValidHtmlId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-summary> */
export const Summary = memo(forwardRef((props, ref) => {
    const { className, links, as = "p", title, classes = {}, style, id: id_props } = props, rest = __rest(props, ["className", "links", "as", "title", "classes", "style", "id"]);
    const { t } = useTranslation();
    const titleId = useId();
    const summaryTitle = title !== null && title !== void 0 ? title : t("title");
    const { Link } = getLink();
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-summary",
        "explicitlyProvidedId": id_props
    });
    return (React.createElement("nav", { id: id, className: cx(fr.cx("fr-summary"), classes.root, className), role: "navigation", "aria-labelledby": titleId, style: style, ref: ref },
        React.createElement(as, {
            className: cx(fr.cx("fr-summary__title"), classes.title),
            id: titleId
        }, React.createElement(React.Fragment, null, summaryTitle)),
        React.createElement("ol", null, links.map((link, i) => {
            var _a;
            return link.linkProps.href !== undefined && (React.createElement("li", { key: i },
                React.createElement(Link, Object.assign({}, link.linkProps, { id: (_a = link.linkProps.id) !== null && _a !== void 0 ? _a : `${id}-link${generateValidHtmlId({
                        "text": link.text
                    })}-${i}`, className: cx(fr.cx("fr-summary__link"), classes.link, link.linkProps.className) }), link.text)));
        }))));
}));
Summary.displayName = symToStr({ Summary });
const { useTranslation, addSummaryTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Summary }),
    "frMessages": {
        /* spell-checker: disable */
        "title": "Sommaire"
        /* spell-checker: enable */
    }
});
addSummaryTranslations({
    "lang": "en",
    "messages": {
        "title": "Summary"
    }
});
export { addSummaryTranslations };
export default Summary;
//# sourceMappingURL=Summary.js.map