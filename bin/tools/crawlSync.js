"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawlSync = void 0;
var fs = __importStar(require("fs"));
var path_1 = require("path");
var crawlSyncRec = function (dirPath, filePaths) {
    var e_1, _a;
    try {
        for (var _b = __values(fs.readdirSync(dirPath)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var basename = _c.value;
            var fileOrDirPath = (0, path_1.join)(dirPath, basename);
            if (fs.lstatSync(fileOrDirPath).isDirectory()) {
                crawlSyncRec(fileOrDirPath, filePaths);
                continue;
            }
            filePaths.push(fileOrDirPath);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
};
/** List all files in a given directory return paths relative to the dir_path */
function crawlSync(params) {
    var dirPath = params.dirPath, returnedPathsType = params.returnedPathsType;
    var filePaths = [];
    crawlSyncRec(dirPath, filePaths);
    switch (returnedPathsType) {
        case "absolute":
            return filePaths;
        case "relative to dirPath":
            return filePaths.map(function (filePath) { return (0, path_1.relative)(dirPath, filePath); });
    }
}
exports.crawlSync = crawlSync;
//# sourceMappingURL=crawlSync.js.map