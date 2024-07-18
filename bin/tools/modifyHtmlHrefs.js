"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyHtmlHrefs = void 0;
function modifyHtmlHrefs(params) {
    var html = params.html, getModifiedHref = params.getModifiedHref;
    var modifiedHtml = html;
    [
        [/href="([^"]+)"/g, '"'],
        [/href='([^']+)'/g, "'"]
    ].forEach(function (_a) {
        var _b = __read(_a, 2), regex = _b[0], quoteSymbol = _b[1];
        return (modifiedHtml = modifiedHtml.replace(regex, function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a, 2), href = _b[1];
            return "href=".concat(quoteSymbol).concat(getModifiedHref(href)).concat(quoteSymbol);
        }));
    });
    return { modifiedHtml: modifiedHtml };
}
exports.modifyHtmlHrefs = modifyHtmlHrefs;
//# sourceMappingURL=modifyHtmlHrefs.js.map