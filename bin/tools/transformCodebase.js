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
exports.transformCodebase = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var crawlSync_1 = require("./crawlSync");
/**
 * Apply a transformation function to every file of directory
 * If source and destination are the same this function can be used to apply the transformation in place
 * like filtering out some files or modifying them.
 * */
function transformCodebase(params) {
    var e_1, _a;
    var srcDirPath = params.srcDirPath, transformSourceCode = params.transformSourceCode;
    var isTargetSameAsSource = path.relative(srcDirPath, params.destDirPath) === "";
    var destDirPath = isTargetSameAsSource
        ? path.join(srcDirPath, "..", "tmp_xOsPdkPsTdzPs34sOkHs")
        : params.destDirPath;
    fs.mkdirSync(destDirPath, {
        recursive: true
    });
    try {
        for (var _b = __values((0, crawlSync_1.crawlSync)({
            dirPath: srcDirPath,
            returnedPathsType: "relative to dirPath"
        })), _c = _b.next(); !_c.done; _c = _b.next()) {
            var fileRelativePath = _c.value;
            var filePath = path.join(srcDirPath, fileRelativePath);
            var destFilePath = path.join(destDirPath, fileRelativePath);
            // NOTE: Optimization, if we don't need to transform the file, just copy
            // it using the lower level implementation.
            if (transformSourceCode === undefined) {
                fs.mkdirSync(path.dirname(destFilePath), {
                    recursive: true
                });
                fs.copyFileSync(filePath, destFilePath);
                continue;
            }
            var transformSourceCodeResult = transformSourceCode({
                sourceCode: fs.readFileSync(filePath),
                filePath: filePath,
                fileRelativePath: fileRelativePath
            });
            if (transformSourceCodeResult === undefined) {
                continue;
            }
            fs.mkdirSync(path.dirname(destFilePath), {
                recursive: true
            });
            var newFileName = transformSourceCodeResult.newFileName, modifiedSourceCode = transformSourceCodeResult.modifiedSourceCode;
            fs.writeFileSync(path.join(path.dirname(destFilePath), newFileName !== null && newFileName !== void 0 ? newFileName : path.basename(destFilePath)), modifiedSourceCode);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (isTargetSameAsSource) {
        fs.rmSync(srcDirPath, { recursive: true });
        fs.renameSync(destDirPath, srcDirPath);
    }
}
exports.transformCodebase = transformCodebase;
//# sourceMappingURL=transformCodebase.js.map