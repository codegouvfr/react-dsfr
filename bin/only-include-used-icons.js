#!/usr/bin/env node
"use strict";
/**
 * This script is ran with `npx react-dsfr include-used-icons`
 * It scans your codebase to find which icons are used and only include those in the final build.
 * Do do that it patches the node_modules/@codegouvfr/react-dsfr/dist/utility/icons/icons.css file
 * and the public/dsfr/utility/icons/icons.css file (if applicable, not in Next.js for example).
 * The script can figure out where your node_modules and public directories are.
 *
 * There are two optional arguments that you can use:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--silent` to disable console.log
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.generateIconsRawCssCode = exports.PATH_OF_PATCHED_RAW_CSS_CODE_FOR_COMPAT_WITH_REMIXICON_RELATIVE_TO_DSFR = exports.PATH_OF_ICONS_JSON = void 0;
var getProjectRoot_1 = require("./tools/getProjectRoot");
var fs = __importStar(require("fs"));
var path_1 = require("path");
var assert_1 = require("tsafe/assert");
var exclude_1 = require("tsafe/exclude");
var promises_1 = require("fs/promises");
var crawl_1 = require("./tools/crawl");
var path_2 = require("path");
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var getAbsoluteAndInOsFormatPath_1 = require("./tools/getAbsoluteAndInOsFormatPath");
var readPublicDirPath_1 = require("./readPublicDirPath");
var fs_existsAsync_1 = require("./tools/fs.existsAsync");
var fnv1aHashToHex_1 = require("./tools/fnv1aHashToHex");
var modifyHtmlHrefs_1 = require("./tools/modifyHtmlHrefs");
exports.PATH_OF_ICONS_JSON = (0, path_1.join)("utility", "icons", "icons.json");
exports.PATH_OF_PATCHED_RAW_CSS_CODE_FOR_COMPAT_WITH_REMIXICON_RELATIVE_TO_DSFR = (0, path_1.join)("utility", "icons", "dsfr_remixicon.css");
function generateIconsRawCssCode(params) {
    var usedIcons = params.usedIcons, patchedRawCssCodeForCompatWithRemixIcon = params.patchedRawCssCodeForCompatWithRemixIcon;
    var buildRule = function (icon, isHighContrast) {
        var iconId = icon.iconId, prefix = icon.prefix;
        var className = "".concat(prefix).concat(iconId);
        var relativePath = (function () {
            switch (icon.prefix) {
                case "fr-icon-":
                    return icon.svgRelativePath;
                case "ri-":
                    return "../../icons/remixicon/".concat(iconId, ".svg");
            }
        })();
        return __spreadArray(__spreadArray([
            ".".concat(className, "::before,"),
            ".".concat(className, "::after {")
        ], __read((isHighContrast
            ? ["    background-image: url(\"".concat(relativePath, "\");")]
            : [
                "    -webkit-mask-image: url(\"".concat(relativePath, "\");"),
                "    mask-image: url(\"".concat(relativePath, "\");")
            ])), false), [
            "}",
            ""
        ], false).map(!isHighContrast ? function (line) { return line; } : function (line) { return "    ".concat(line); })
            .join("\n");
    };
    return __spreadArray(__spreadArray(__spreadArray([], __read(usedIcons.map(function (icon) { return buildRule(icon, false); })), false), __read((usedIcons.length === 0
        ? []
        : __spreadArray(__spreadArray([
            "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {"
        ], __read(usedIcons.map(function (icon) { return buildRule(icon, true); })), false), [
            "}",
            ""
        ], false))), false), __read((usedIcons.find(function (_a) {
        var prefix = _a.prefix;
        return prefix === "ri-";
    }) === undefined
        ? []
        : [patchedRawCssCodeForCompatWithRemixIcon])), false).join("\n");
}
exports.generateIconsRawCssCode = generateIconsRawCssCode;
var CODEGOUV_REACT_DSFR = JSON.parse(fs.readFileSync((0, path_1.join)((0, getProjectRoot_1.getProjectRoot)(), "package.json")).toString("utf8"))["name"];
function getCommandContext(args) {
    return __awaiter(this, void 0, void 0, function () {
        var argv, projectDirPath, projectDirPath_1, isProjectPathReactDsfr, srcFilePaths_1, nodeModulesDirPath, dsfrDirPath, dsfrDirPath_static, htmlFilePath, isSilent, srcFilePaths;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    argv = (0, yargs_parser_1.default)(args);
                    projectDirPath = (function () {
                        read_from_argv: {
                            var arg = argv["projectDir"];
                            if (arg === undefined) {
                                break read_from_argv;
                            }
                            return (0, getAbsoluteAndInOsFormatPath_1.getAbsoluteAndInOsFormatPath)({ "pathIsh": arg, "cwd": process.cwd() });
                        }
                        return process.cwd();
                    })();
                    projectDirPath_1 = process.cwd();
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var packageJsonFilePath, packageJson, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        packageJsonFilePath = (0, path_1.join)(projectDirPath_1, "package.json");
                                        return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)(packageJsonFilePath)];
                                    case 1:
                                        if (!(_c.sent())) {
                                            return [2 /*return*/, false];
                                        }
                                        _b = (_a = JSON).parse;
                                        return [4 /*yield*/, (0, promises_1.readFile)(packageJsonFilePath)];
                                    case 2:
                                        packageJson = _b.apply(_a, [(_c.sent()).toString("utf8")]);
                                        return [2 /*return*/, packageJson["name"] === CODEGOUV_REACT_DSFR];
                                }
                            });
                        }); })()];
                case 1:
                    isProjectPathReactDsfr = _a.sent();
                    if (!isProjectPathReactDsfr) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Promise.all([
                            (0, crawl_1.crawl)({
                                "dirPath": (0, path_1.join)(projectDirPath_1, "src"),
                                "returnedPathsType": "absolute",
                                "getDoCrawlInDir": function (_a) {
                                    var relativeDirPath = _a.relativeDirPath;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_b) {
                                            if ((0, path_2.basename)(relativeDirPath) === "generatedFromCss") {
                                                return [2 /*return*/, false];
                                            }
                                            if ((0, path_2.basename)(relativeDirPath) === "bin") {
                                                return [2 /*return*/, false];
                                            }
                                            return [2 /*return*/, true];
                                        });
                                    });
                                }
                            }),
                            (0, crawl_1.crawl)({
                                "dirPath": (0, path_1.join)(projectDirPath_1, "stories"),
                                "returnedPathsType": "absolute"
                            })
                        ])];
                case 2:
                    srcFilePaths_1 = (_a.sent())
                        .flat()
                        .filter(function (filePath) {
                        return ["tsx", "jsx", "js", "ts", "mdx", "html", "htm"].find(function (ext) {
                            return filePath.endsWith(".".concat(ext));
                        }) !== undefined;
                    });
                    return [2 /*return*/, {
                            projectDirPath: projectDirPath_1,
                            srcFilePaths: srcFilePaths_1,
                            "dsfrDirPath": (0, path_1.join)(projectDirPath_1, "dist", "dsfr"),
                            "spaParams": undefined,
                            "isSilent": false
                        }];
                case 3: return [4 /*yield*/, (function callee(n) {
                        return __awaiter(this, void 0, void 0, function () {
                            var nodeModulesDirPath, doesExist;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (n >= projectDirPath.split(path_2.sep).length) {
                                            throw new Error("Need to install node modules?");
                                        }
                                        nodeModulesDirPath = path_1.join.apply(void 0, __spreadArray([], __read(__spreadArray(__spreadArray([projectDirPath], __read(new Array(n).fill("..")), false), ["node_modules"], false)), false));
                                        return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)(path_1.join.apply(void 0, __spreadArray([], __read(__spreadArray([nodeModulesDirPath], __read(CODEGOUV_REACT_DSFR.split("/")), false)), false)))];
                                    case 1:
                                        doesExist = _a.sent();
                                        if (!doesExist) {
                                            return [2 /*return*/, callee(n + 1)];
                                        }
                                        return [2 /*return*/, nodeModulesDirPath];
                                }
                            });
                        });
                    })(0)];
                case 4:
                    nodeModulesDirPath = _a.sent();
                    dsfrDirPath = path_1.join.apply(void 0, __spreadArray([], __read(__spreadArray(__spreadArray([nodeModulesDirPath], __read(CODEGOUV_REACT_DSFR.split("/")), false), ["dsfr"], false)), false));
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var dsfrDirPath_static, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = path_1.join;
                                        return [4 /*yield*/, (0, readPublicDirPath_1.readPublicDirPath)({ projectDirPath: projectDirPath })];
                                    case 1:
                                        dsfrDirPath_static = _a.apply(void 0, [_b.sent(), "dsfr"]);
                                        return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)(dsfrDirPath_static)];
                                    case 2:
                                        if (!(_b.sent())) {
                                            return [2 /*return*/, undefined];
                                        }
                                        return [2 /*return*/, dsfrDirPath_static];
                                }
                            });
                        }); })()];
                case 5:
                    dsfrDirPath_static = _a.sent();
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var filePath, filePath;
                            return __generator(this, function (_a) {
                                if (dsfrDirPath_static === undefined) {
                                    return [2 /*return*/, undefined];
                                }
                                vite: {
                                    filePath = (0, path_1.join)(projectDirPath, "index.html");
                                    if (!fs.existsSync(filePath)) {
                                        break vite;
                                    }
                                    return [2 /*return*/, filePath];
                                }
                                cra: {
                                    if (dsfrDirPath_static === undefined) {
                                        break cra;
                                    }
                                    filePath = (0, path_1.join)((0, path_2.dirname)(dsfrDirPath_static), "index.html");
                                    if (!fs.existsSync(filePath)) {
                                        break cra;
                                    }
                                    return [2 /*return*/, filePath];
                                }
                                // Next.js
                                return [2 /*return*/, undefined];
                            });
                        }); })()];
                case 6:
                    htmlFilePath = _a.sent();
                    isSilent = argv["silent"] === true;
                    return [4 /*yield*/, Promise.all([
                            (0, crawl_1.crawl)({
                                "dirPath": projectDirPath,
                                "returnedPathsType": "absolute",
                                "getDoCrawlInDir": function (_a) {
                                    var relativeDirPath = _a.relativeDirPath;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    if (relativeDirPath === "dist") {
                                                        return [2 /*return*/, false];
                                                    }
                                                    if ((0, path_2.basename)(relativeDirPath) === "node_modules") {
                                                        return [2 /*return*/, false];
                                                    }
                                                    return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)((0, path_1.join)(projectDirPath, relativeDirPath, exports.PATH_OF_ICONS_JSON))];
                                                case 1:
                                                    if (_b.sent()) {
                                                        // We don't want to search in public/dsfr
                                                        return [2 /*return*/, false];
                                                    }
                                                    if ((0, path_2.basename)(relativeDirPath).startsWith(".")) {
                                                        return [2 /*return*/, false];
                                                    }
                                                    return [2 /*return*/, true];
                                            }
                                        });
                                    });
                                }
                            }),
                            (0, crawl_1.crawl)({
                                "dirPath": nodeModulesDirPath,
                                "returnedPathsType": "absolute",
                                "getDoCrawlInDir": function (_a) {
                                    var relativeDirPath = _a.relativeDirPath;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var parsedPackageJson, _b, _c, packageName;
                                        var e_1, _d;
                                        return __generator(this, function (_e) {
                                            switch (_e.label) {
                                                case 0:
                                                    if (relativeDirPath.startsWith("@") &&
                                                        relativeDirPath.split(path_2.sep).length === 1) {
                                                        return [2 /*return*/, true];
                                                    }
                                                    if (!(relativeDirPath.split(path_2.sep).length === 1 ||
                                                        (relativeDirPath.startsWith("@") &&
                                                            relativeDirPath.split(path_2.sep).length === 2))) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, (0, promises_1.readFile)((0, path_1.join)(nodeModulesDirPath, relativeDirPath, "package.json")).then(function (buff) { return JSON.parse(buff.toString("utf8")); }, function () { return undefined; })];
                                                case 1:
                                                    parsedPackageJson = _e.sent();
                                                    if (parsedPackageJson === undefined) {
                                                        return [2 /*return*/, false];
                                                    }
                                                    if (parsedPackageJson["name"] === "tss-react") {
                                                        return [2 /*return*/, false];
                                                    }
                                                    try {
                                                        for (_b = __values([
                                                            CODEGOUV_REACT_DSFR,
                                                            "@gouvfr/dsfr",
                                                            "@dataesr/react-dsfr"
                                                        ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                                                            packageName = _c.value;
                                                            if (Object.keys(__assign(__assign(__assign({}, parsedPackageJson["dependencies"]), parsedPackageJson["devDependencies"]), parsedPackageJson["peerDependencies"])).includes(packageName)) {
                                                                return [2 /*return*/, true];
                                                            }
                                                        }
                                                    }
                                                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                                    finally {
                                                        try {
                                                            if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                                                        }
                                                        finally { if (e_1) throw e_1.error; }
                                                    }
                                                    return [2 /*return*/, false];
                                                case 2:
                                                    if ((0, path_2.dirname)(relativeDirPath).endsWith(path_1.join.apply(void 0, __spreadArray([], __read(CODEGOUV_REACT_DSFR.split("/")), false)))) {
                                                        return [2 /*return*/, (0, path_2.basename)(relativeDirPath) === "src"];
                                                    }
                                                    if ((0, path_2.basename)(relativeDirPath) === "generatedFromCss") {
                                                        return [2 /*return*/, false];
                                                    }
                                                    if ((0, path_2.basename)(relativeDirPath) === "node_modules") {
                                                        return [2 /*return*/, false];
                                                    }
                                                    if ((0, path_2.basename)(relativeDirPath).startsWith(".")) {
                                                        return [2 /*return*/, false];
                                                    }
                                                    return [2 /*return*/, true];
                                            }
                                        });
                                    });
                                }
                            })
                        ])];
                case 7:
                    srcFilePaths = (_a.sent())
                        .flat()
                        .filter(function (filePath) {
                        return ["tsx", "jsx", "js", "ts", "mdx", "html", "htm"].find(function (ext) {
                            return filePath.endsWith(".".concat(ext));
                        }) !== undefined;
                    });
                    return [2 /*return*/, {
                            projectDirPath: projectDirPath,
                            srcFilePaths: srcFilePaths,
                            dsfrDirPath: dsfrDirPath,
                            "spaParams": (function () {
                                if (dsfrDirPath_static === undefined) {
                                    return undefined;
                                }
                                (0, assert_1.assert)(htmlFilePath !== undefined);
                                return {
                                    dsfrDirPath_static: dsfrDirPath_static,
                                    htmlFilePath: htmlFilePath
                                };
                            })(),
                            isSilent: isSilent
                        }];
            }
        });
    });
}
function main(args) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var commandContext, log, icons, _b, _c, usedIconClassNames, usedIcons, rawIconCssCodeBuffer, hasChanged, iconsMinCssRelativePath;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getCommandContext(args)];
                case 1:
                    commandContext = _d.sent();
                    log = commandContext.isSilent ? undefined : console.log;
                    _c = (_b = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)((0, path_1.join)(commandContext.dsfrDirPath, exports.PATH_OF_ICONS_JSON))];
                case 2:
                    icons = _c.apply(_b, [(_d.sent()).toString("utf8")]);
                    return [4 /*yield*/, (function getUsedIconClassNames() {
                            return __awaiter(this, void 0, void 0, function () {
                                var prefixes, prefixDsfr, prefixRemixIcon, rest, _a, availableDsfrIconClassNames, availableRemixiconIconClassNames, setUsedIconClassNames;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            prefixes = { "prefixDsfr": "fr-icon-", "prefixRemixIcon": "ri-" };
                                            (0, assert_1.assert)();
                                            prefixDsfr = prefixes.prefixDsfr, prefixRemixIcon = prefixes.prefixRemixIcon, rest = __rest(prefixes, ["prefixDsfr", "prefixRemixIcon"]);
                                            (0, assert_1.assert)();
                                            _a = (function () {
                                                var allAvailableIconClassNames = icons.map(function (_a) {
                                                    var prefix = _a.prefix, iconId = _a.iconId;
                                                    return "".concat(prefix).concat(iconId);
                                                });
                                                var availableDsfrIconClassNames = [];
                                                var availableRemixiconIconClassNames = [];
                                                allAvailableIconClassNames.forEach(function (className) {
                                                    if (className.startsWith(prefixDsfr)) {
                                                        availableDsfrIconClassNames.push(className);
                                                        return;
                                                    }
                                                    if (className.startsWith(prefixRemixIcon)) {
                                                        availableRemixiconIconClassNames.push(className);
                                                        return;
                                                    }
                                                });
                                                return { availableDsfrIconClassNames: availableDsfrIconClassNames, availableRemixiconIconClassNames: availableRemixiconIconClassNames };
                                            })(), availableDsfrIconClassNames = _a.availableDsfrIconClassNames, availableRemixiconIconClassNames = _a.availableRemixiconIconClassNames;
                                            setUsedIconClassNames = new Set();
                                            return [4 /*yield*/, Promise.all(commandContext.srcFilePaths.map(function (srcFilePath) { return __awaiter(_this, void 0, void 0, function () {
                                                    var rawFileContent;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, (0, promises_1.readFile)(srcFilePath)];
                                                            case 1:
                                                                rawFileContent = (_a.sent()).toString("utf8");
                                                                __spreadArray(__spreadArray([], __read((!rawFileContent.includes(prefixDsfr) ? [] : availableDsfrIconClassNames)), false), __read((!rawFileContent.includes(prefixRemixIcon)
                                                                    ? []
                                                                    : availableRemixiconIconClassNames)), false).forEach(function (className) {
                                                                    if (!rawFileContent.includes(className)) {
                                                                        return;
                                                                    }
                                                                    log === null || log === void 0 ? void 0 : log("Found ".concat(className, " in ").concat((0, path_1.relative)(process.cwd(), srcFilePath)));
                                                                    setUsedIconClassNames.add(className);
                                                                });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))];
                                        case 1:
                                            _b.sent();
                                            return [2 /*return*/, { "usedIconClassNames": Array.from(setUsedIconClassNames) }];
                                    }
                                });
                            });
                        })()];
                case 3:
                    usedIconClassNames = (_d.sent()).usedIconClassNames;
                    if (usedIconClassNames.length > 300) {
                        console.warn("There is probably an error in the only-include-used-icons script, including ".concat(usedIconClassNames.length, " icons!"));
                    }
                    log === null || log === void 0 ? void 0 : log("Found usage of ".concat(usedIconClassNames.length, " different icons."));
                    usedIcons = usedIconClassNames.map(function (className) {
                        var icon = icons.find(function (_a) {
                            var prefix = _a.prefix, iconId = _a.iconId;
                            return "".concat(prefix).concat(iconId) === className;
                        });
                        (0, assert_1.assert)(icon !== undefined);
                        return icon;
                    });
                    rawIconCssCodeBuffer = Buffer.from(generateIconsRawCssCode({
                        "patchedRawCssCodeForCompatWithRemixIcon": fs
                            .readFileSync((0, path_1.join)(commandContext.dsfrDirPath, exports.PATH_OF_PATCHED_RAW_CSS_CODE_FOR_COMPAT_WITH_REMIXICON_RELATIVE_TO_DSFR))
                            .toString("utf8"),
                        usedIcons: usedIcons
                    }), "utf8");
                    hasChanged = false;
                    iconsMinCssRelativePath = (0, path_1.join)("utility", "icons", "icons.min.css");
                    return [4 /*yield*/, Promise.all([commandContext.dsfrDirPath, (_a = commandContext.spaParams) === null || _a === void 0 ? void 0 : _a.dsfrDirPath_static]
                            .filter((0, exclude_1.exclude)(undefined))
                            .map(function (dsfrDirPath) { return __awaiter(_this, void 0, void 0, function () {
                            var cssFilePath, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        cssFilePath = (0, path_1.join)(dsfrDirPath, iconsMinCssRelativePath);
                                        _b = (_a = Buffer).compare;
                                        return [4 /*yield*/, (0, promises_1.readFile)(cssFilePath)];
                                    case 1:
                                        if (_b.apply(_a, [_c.sent(), rawIconCssCodeBuffer]) === 0) {
                                            return [2 /*return*/];
                                        }
                                        hasChanged = true;
                                        log === null || log === void 0 ? void 0 : log("Patching ".concat((0, path_1.relative)(process.cwd(), cssFilePath)));
                                        return [4 /*yield*/, (0, promises_1.writeFile)(cssFilePath, rawIconCssCodeBuffer)];
                                    case 2:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 4:
                    _d.sent();
                    if (!hasChanged) {
                        log === null || log === void 0 ? void 0 : log("No change since last run");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Promise.all([
                            (function generateUsedRemixiconFiles() {
                                var _a;
                                return __awaiter(this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, Promise.all([commandContext.dsfrDirPath, (_a = commandContext.spaParams) === null || _a === void 0 ? void 0 : _a.dsfrDirPath_static]
                                                    .filter((0, exclude_1.exclude)(undefined))
                                                    .map(function (dsfrDistDirPath) { return __awaiter(_this, void 0, void 0, function () {
                                                    var remixiconDirPath;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                remixiconDirPath = (0, path_1.join)(dsfrDistDirPath, "icons", "remixicon");
                                                                if (!fs.existsSync(remixiconDirPath)) {
                                                                    fs.mkdirSync(remixiconDirPath);
                                                                }
                                                                return [4 /*yield*/, Promise.all(usedIcons
                                                                        .map(function (icon) { return (icon.prefix !== "ri-" ? undefined : icon); })
                                                                        .filter((0, exclude_1.exclude)(undefined))
                                                                        .map(function (_a) {
                                                                        var iconId = _a.iconId, rawSvgCode = _a.rawSvgCode;
                                                                        return (0, promises_1.writeFile)((0, path_1.join)(remixiconDirPath, "".concat(iconId, ".svg")), Buffer.from(rawSvgCode, "utf8"));
                                                                    }))];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))];
                                            case 1:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })(),
                            (function copyUsedDsfrIconsToStatic() {
                                return __awaiter(this, void 0, void 0, function () {
                                    var dsfrDirPath_static;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (commandContext.spaParams === undefined) {
                                                    return [2 /*return*/];
                                                }
                                                dsfrDirPath_static = commandContext.spaParams.dsfrDirPath_static;
                                                return [4 /*yield*/, Promise.all(usedIcons
                                                        .map(function (icon) { return (icon.prefix !== "fr-icon-" ? undefined : icon); })
                                                        .filter((0, exclude_1.exclude)(undefined))
                                                        .map(function (_a) {
                                                        var svgRelativePath = _a.svgRelativePath;
                                                        return [commandContext.dsfrDirPath, dsfrDirPath_static].map(function (baseDirPath) {
                                                            return (0, path_1.join)(baseDirPath, (0, path_2.dirname)(iconsMinCssRelativePath), svgRelativePath);
                                                        });
                                                    })
                                                        .map(function (_a) {
                                                        var _b = __read(_a, 2), srcFilePath = _b[0], destFilePath = _b[1];
                                                        return (0, promises_1.cp)(srcFilePath, destFilePath);
                                                    }))];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })(),
                            (function addHashQueryParameterInIndexHtml() {
                                return __awaiter(this, void 0, void 0, function () {
                                    var html, modifiedHtml;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (commandContext.spaParams === undefined) {
                                                    return [2 /*return*/];
                                                }
                                                return [4 /*yield*/, (0, promises_1.readFile)(commandContext.spaParams.htmlFilePath)];
                                            case 1:
                                                html = (_a.sent()).toString("utf8");
                                                modifiedHtml = (0, modifyHtmlHrefs_1.modifyHtmlHrefs)({
                                                    "html": html,
                                                    "getModifiedHref": function (href) {
                                                        if (!href.includes(iconsMinCssRelativePath.replace(/\\/g, "/"))) {
                                                            return href;
                                                        }
                                                        var _a = __read(href.split("?"), 1), urlWithoutQuery = _a[0];
                                                        return "".concat(urlWithoutQuery, "?hash=").concat((0, fnv1aHashToHex_1.fnv1aHashToHex)(rawIconCssCodeBuffer.toString("utf8")));
                                                    }
                                                }).modifiedHtml;
                                                return [4 /*yield*/, (0, promises_1.writeFile)(commandContext.spaParams.htmlFilePath, Buffer.from(modifiedHtml, "utf8"))];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })(),
                            (function clearCache() {
                                return __awaiter(this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, Promise.all([
                                                    (0, path_1.join)(".next", "cache"),
                                                    (0, path_1.join)(".vite"),
                                                    (0, path_1.join)(".cache", "storybook"),
                                                    (0, path_1.join)(".cache", "babel-loader"),
                                                    (0, path_1.join)(".cache", "default-development")
                                                ]
                                                    .map(function (relativeDirPath) {
                                                    return (0, path_1.join)(commandContext.projectDirPath, "node_modules", relativeDirPath);
                                                })
                                                    .map(function (dirPath) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)(dirPath)];
                                                            case 1:
                                                                if (!(_a.sent())) {
                                                                    return [2 /*return*/];
                                                                }
                                                                return [4 /*yield*/, (0, promises_1.rm)(dirPath, { "recursive": true, "force": true })];
                                                            case 2:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })()
                        ])];
                case 5:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
if (require.main === module) {
    main(process.argv.slice(2));
}
//# sourceMappingURL=only-include-used-icons.js.map