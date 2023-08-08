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
import React from "react";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
let Link = props => {
    const _a = props, { href } = _a, rest = __rest(_a, ["href"]);
    button: {
        if (href !== "#" || !("onClick" in rest)) {
            break button;
        }
        assert(is(rest));
        return React.createElement("button", Object.assign({}, rest, { className: cx(fr.cx("fr-link"), rest.className) }));
    }
    return React.createElement("a", Object.assign({ href: href }, rest));
};
//<a {...props} />;
export function setLink(params) {
    Link = props => {
        var _a;
        {
            const _b = props, { to, href } = _b, rest = __rest(_b, ["to", "href"]);
            const target = (_a = (typeof to === "string" ? to : undefined)) !== null && _a !== void 0 ? _a : (typeof href === "string" ? href : undefined);
            button: {
                if (target !== "#" || !("onClick" in rest)) {
                    break button;
                }
                assert(is(rest));
                return React.createElement("button", Object.assign({}, rest, { className: cx(fr.cx("fr-link"), rest.className) }));
            }
            mailto: {
                if (target === undefined || !target.startsWith("mailto:")) {
                    break mailto;
                }
                return React.createElement("a", Object.assign({ href: target }, rest));
            }
            external_links: {
                if (target === undefined ||
                    (!target.startsWith("//") && !/^https?:\/\//.test(target))) {
                    break external_links;
                }
                return React.createElement("a", Object.assign({ href: target, target: "_blank" }, rest));
            }
            anchor: {
                if (target === undefined || !target.startsWith("#")) {
                    break anchor;
                }
                return React.createElement("a", Object.assign({ href: target }, rest));
            }
        }
        return React.createElement(params.Link, Object.assign({}, props));
    };
}
export function getLink() {
    return { Link };
}
//# sourceMappingURL=link.js.map