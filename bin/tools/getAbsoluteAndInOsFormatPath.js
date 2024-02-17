"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsoluteAndInOsFormatPath = void 0;
var path_1 = require("path");
function getAbsoluteAndInOsFormatPath(params) {
    var pathIsh = params.pathIsh, cwd = params.cwd;
    var pathOut = pathIsh;
    pathOut = pathOut.replace(/\//g, path_1.sep);
    pathOut = pathOut.endsWith(path_1.sep) ? pathOut.slice(0, -1) : pathOut;
    if (!(0, path_1.isAbsolute)(pathOut)) {
        pathOut = (0, path_1.join)(cwd, pathOut);
    }
    return pathOut;
}
exports.getAbsoluteAndInOsFormatPath = getAbsoluteAndInOsFormatPath;
//# sourceMappingURL=getAbsoluteAndInOsFormatPath.js.map