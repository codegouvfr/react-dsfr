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
import React, { forwardRef, memo } from "react";
import { assert } from "tsafe";
import { symToStr } from "tsafe/symToStr";
import Tag from "./Tag";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import { cx } from "./tools/cx";
import { fr } from "./fr";
export const TagsGroup = memo(forwardRef((props, ref) => {
    const { id: props_id, className, tags, smallTags = false, style } = props, rest = __rest(props, ["id", "className", "tags", "smallTags", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-tags-group",
        "explicitlyProvidedId": props_id
    });
    const tagsGroupClassName = cx(fr.cx("fr-tags-group", smallTags && "fr-tags-group--sm"), className);
    return (React.createElement("ul", { className: tagsGroupClassName, style: style, id: id, ref: ref }, tags.map((tagProps, i) => (React.createElement("li", { key: i },
        React.createElement(Tag, Object.assign({}, tagProps)))))));
}));
TagsGroup.displayName = symToStr({ TagsGroup });
export default TagsGroup;
//# sourceMappingURL=TagsGroup.js.map