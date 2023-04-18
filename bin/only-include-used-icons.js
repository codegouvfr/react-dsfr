#!/usr/bin/env node
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIconsRawCssCode = exports.pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist = exports.pathOfIconsJson = void 0;
var getProjectRoot_1 = require("./tools/getProjectRoot");
var fs = __importStar(require("fs"));
var path_1 = require("path");
var assert_1 = require("tsafe/assert");
var exclude_1 = require("tsafe/exclude");
var promises_1 = require("fs/promises");
var crawl_1 = require("./tools/crawl");
var path_2 = require("path");
exports.pathOfIconsJson = (0, path_1.join)("utility", "icons", "icons.json");
exports.pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist = (0, path_1.join)("utility", "icons", "dsfr_remixicon.css");
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var packageName, cwd, dsfrDistDirPath, _a, icons, _b, _c, usedIconClassNames, usedIcons, rawIconCssCodeBuffer, onConfirmedChange;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    packageName = JSON.parse(fs.readFileSync((0, path_1.join)((0, getProjectRoot_1.getProjectRoot)(), "package.json")).toString("utf8"))["name"];
                    cwd = process.cwd();
                    if (!((0, getProjectRoot_1.getProjectRoot)() === cwd)) return [3 /*break*/, 1];
                    _a = (0, path_1.join)(cwd, "dist", "dsfr");
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, (function callee(n) {
                        return __awaiter(this, void 0, void 0, function () {
                            var dirPath, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (n >= cwd.split(path_2.sep).length) {
                                            throw new Error("Need to install node modules?");
                                        }
                                        dirPath = path_1.join.apply(void 0, __spreadArray([], __read(__spreadArray(__spreadArray(__spreadArray(__spreadArray([
                                            cwd
                                        ], __read(new Array(n).fill("..")), false), [
                                            "node_modules"
                                        ], false), __read(packageName.split("/")), false), [
                                            "dsfr"
                                        ], false)), false));
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, (0, promises_1.access)(dirPath)];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _a = _b.sent();
                                        return [2 /*return*/, callee(n + 1)];
                                    case 4: return [2 /*return*/, dirPath];
                                }
                            });
                        });
                    })(0)];
                case 2:
                    _a = _d.sent();
                    _d.label = 3;
                case 3:
                    dsfrDistDirPath = _a;
                    _c = (_b = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)((0, path_1.join)(dsfrDistDirPath, exports.pathOfIconsJson))];
                case 4:
                    icons = _c.apply(_b, [(_d.sent()).toString("utf8")]);
                    return [4 /*yield*/, (function getUsedIconClassNames() {
                            return __awaiter(this, void 0, void 0, function () {
                                var candidateFilePaths, prefixes, prefixDsfr, prefixRemixIcon, rest, _a, availableDsfrIconClassNames, availableRemixiconIconClassNames, setUsedIconClassNames;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, (0, crawl_1.crawl)({
                                                "dirPath": cwd,
                                                "getDoCrawlInDir": function (_a) {
                                                    var relativeDirPath = _a.relativeDirPath;
                                                    return __awaiter(_this, void 0, void 0, function () {
                                                        var parsedPackageJson, _b, _c, packageName_1;
                                                        var e_1, _d;
                                                        return __generator(this, function (_e) {
                                                            switch (_e.label) {
                                                                case 0:
                                                                    if (relativeDirPath === "node_modules") {
                                                                        return [2 /*return*/, true];
                                                                    }
                                                                    if (relativeDirPath.startsWith("node_modules".concat(path_2.sep, "@")) &&
                                                                        relativeDirPath.split(path_2.sep).length === 2) {
                                                                        return [2 /*return*/, true];
                                                                    }
                                                                    if (!(relativeDirPath.startsWith("node_modules") &&
                                                                        (relativeDirPath.split(path_2.sep).length === 2 ||
                                                                            (relativeDirPath.startsWith("node_modules".concat(path_2.sep, "@")) &&
                                                                                relativeDirPath.split(path_2.sep).length === 3)))) return [3 /*break*/, 2];
                                                                    return [4 /*yield*/, (0, promises_1.readFile)((0, path_1.join)(relativeDirPath, "package.json")).then(function (buff) { return JSON.parse(buff.toString("utf8")); }, function () { return undefined; })];
                                                                case 1:
                                                                    parsedPackageJson = _e.sent();
                                                                    if (parsedPackageJson === undefined) {
                                                                        return [2 /*return*/, false];
                                                                    }
                                                                    try {
                                                                        for (_b = __values([
                                                                            "@gouvfr/dsfr",
                                                                            "@codegouvfr/react-dsfr",
                                                                            "@dataesr/react-dsfr"
                                                                        ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                                                                            packageName_1 = _c.value;
                                                                            if (Object.keys(__assign(__assign(__assign({}, parsedPackageJson["dependencies"]), parsedPackageJson["devDependencies"]), parsedPackageJson["peerDependencies"])).includes(packageName_1)) {
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
                                                                    if (relativeDirPath === "public".concat(path_2.sep, "dsfr")) {
                                                                        return [2 /*return*/, false];
                                                                    }
                                                                    if ((0, path_2.basename)(relativeDirPath) === "generatedFromCss") {
                                                                        return [2 /*return*/, false];
                                                                    }
                                                                    if ((0, path_2.dirname)(relativeDirPath).endsWith(path_1.join.apply(void 0, __spreadArray([], __read(packageName.split("/")), false)))) {
                                                                        return [2 /*return*/, (0, path_2.basename)(relativeDirPath) === "src"];
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
                                            })];
                                        case 1:
                                            candidateFilePaths = (_b.sent()).filter(function (filePath) {
                                                return ["tsx", "jsx", "js", "ts", "html", "htm"].find(function (ext) {
                                                    return filePath.endsWith(".".concat(ext));
                                                }) !== undefined;
                                            });
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
                                            return [4 /*yield*/, Promise.all(candidateFilePaths.map(function (candidateFilePath) { return __awaiter(_this, void 0, void 0, function () {
                                                    var rawFileContent;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, (0, promises_1.readFile)(candidateFilePath)];
                                                            case 1:
                                                                rawFileContent = (_a.sent()).toString("utf8");
                                                                __spreadArray(__spreadArray([], __read((!rawFileContent.includes(prefixDsfr) ? [] : availableDsfrIconClassNames)), false), __read((!rawFileContent.includes(prefixRemixIcon)
                                                                    ? []
                                                                    : availableRemixiconIconClassNames)), false).forEach(function (className) {
                                                                    if (!rawFileContent.includes(className)) {
                                                                        return;
                                                                    }
                                                                    setUsedIconClassNames.add(className);
                                                                });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))];
                                        case 2:
                                            _b.sent();
                                            return [2 /*return*/, { "usedIconClassNames": Array.from(setUsedIconClassNames) }];
                                    }
                                });
                            });
                        })()];
                case 5:
                    usedIconClassNames = (_d.sent()).usedIconClassNames;
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
                            .readFileSync((0, path_1.join)(dsfrDistDirPath, exports.pathOfPatchedRawCssCodeForCompatWithRemixIconRelativeToDsfrDist))
                            .toString("utf8"),
                        usedIcons: usedIcons
                    }), "utf8");
                    onConfirmedChange = function () { return __awaiter(_this, void 0, void 0, function () {
                        var nextCacheDir;
                        return __generator(this, function (_a) {
                            nextCacheDir = (0, path_1.join)(cwd, ".next", "cache");
                            if (!fs.existsSync(nextCacheDir)) {
                                return [2 /*return*/];
                            }
                            (0, promises_1.rm)(nextCacheDir, { "recursive": true, "force": true });
                            return [2 /*return*/];
                        });
                    }); };
                    [dsfrDistDirPath, (0, path_1.join)(cwd, "public", "dsfr")].forEach(function (dsfrDistDirPath) { return __awaiter(_this, void 0, void 0, function () {
                        var cssFilePaths, remixiconDirPath;
                        var _this = this;
                        return __generator(this, function (_a) {
                            cssFilePaths = ["icons.css", "icons.min.css"].map(function (cssFileBasename) {
                                return (0, path_1.join)(dsfrDistDirPath, "utility", "icons", cssFileBasename);
                            });
                            if (cssFilePaths.some(function (cssFilePath) { return !fs.existsSync(cssFilePath); })) {
                                return [2 /*return*/];
                            }
                            remixiconDirPath = (0, path_1.join)(dsfrDistDirPath, "icons", "remixicon");
                            if (!fs.existsSync(remixiconDirPath)) {
                                fs.mkdirSync(remixiconDirPath);
                            }
                            usedIcons
                                .map(function (icon) { return (icon.prefix !== "ri-" ? undefined : icon); })
                                .filter((0, exclude_1.exclude)(undefined))
                                .map(function (_a) {
                                var iconId = _a.iconId, rawSvgCode = _a.rawSvgCode;
                                return (0, promises_1.writeFile)((0, path_1.join)(remixiconDirPath, "".concat(iconId, ".svg")), Buffer.from(rawSvgCode, "utf8"));
                            });
                            cssFilePaths.forEach(function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                                var currentCode;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, promises_1.readFile)(filePath)];
                                        case 1:
                                            currentCode = _a.sent();
                                            if (Buffer.compare(rawIconCssCodeBuffer, currentCode) === 0) {
                                                return [2 /*return*/];
                                            }
                                            onConfirmedChange();
                                            (0, promises_1.writeFile)(filePath, rawIconCssCodeBuffer);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=only-include-used-icons.js.map