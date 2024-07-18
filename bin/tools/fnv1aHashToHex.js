"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fnv1aHashToHex = void 0;
function fnv1aHashToHex(str) {
    var hash = 2166136261;
    for (var i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return (hash >>> 0).toString(16); // Convert to unsigned 32-bit integer and then to hexadecimal
}
exports.fnv1aHashToHex = fnv1aHashToHex;
//# sourceMappingURL=fnv1aHashToHex.js.map