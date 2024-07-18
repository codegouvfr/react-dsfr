#!/usr/bin/env node
"use strict";
/**
 * This script is ran with `npx react-dsfr copy-dsfr-to-public`
 * It takes one optional arguments (for NX monorepos):
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var path_1 = require("path");
var fs = __importStar(require("fs"));
var getProjectRoot_1 = require("./tools/getProjectRoot");
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var getAbsoluteAndInOsFormatPath_1 = require("./tools/getAbsoluteAndInOsFormatPath");
var readPublicDirPath_1 = require("./readPublicDirPath");
var transformCodebase_1 = require("./tools/transformCodebase");
var assert_1 = require("tsafe/assert");
var modifyHtmlHrefs_1 = require("./tools/modifyHtmlHrefs");
function main(args) {
    return __awaiter(this, void 0, void 0, function () {
        var argv, projectDirPath, publicDirPath, htmlFilePath, dsfrDirPath, gouvFrDsfrVersion, versionFilePath, currentVersion, dsfrDistNodeModulesDirPath, dsfrMinCssFileRelativePath, usedAssetsRelativeFilePaths_1, fileToKeepRelativePaths_1, modifiedHtml;
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
                    return [4 /*yield*/, (0, readPublicDirPath_1.readPublicDirPath)({ projectDirPath: projectDirPath })];
                case 1:
                    publicDirPath = _a.sent();
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var filePath, filePath;
                            return __generator(this, function (_a) {
                                vite: {
                                    filePath = (0, path_1.join)(projectDirPath, "index.html");
                                    if (!fs.existsSync(filePath)) {
                                        break vite;
                                    }
                                    return [2 /*return*/, filePath];
                                }
                                cra: {
                                    filePath = (0, path_1.join)(publicDirPath, "index.html");
                                    if (!fs.existsSync(filePath)) {
                                        break cra;
                                    }
                                    return [2 /*return*/, filePath];
                                }
                                (0, assert_1.assert)(false, "Can't locate your index.html file.");
                                return [2 /*return*/];
                            });
                        }); })()];
                case 2:
                    htmlFilePath = _a.sent();
                    if (!fs.existsSync(publicDirPath)) {
                        console.error("Can't locate your public directory.");
                        process.exit(-1);
                    }
                    dsfrDirPath = (0, path_1.join)(publicDirPath, "dsfr");
                    gouvFrDsfrVersion = JSON.parse(fs.readFileSync((0, path_1.join)((0, getProjectRoot_1.getProjectRoot)(), "package.json")).toString("utf8"))["devDependencies"]["@gouvfr/dsfr"];
                    versionFilePath = (0, path_1.join)(dsfrDirPath, "version.txt");
                    early_exit: {
                        if (!fs.existsSync(dsfrDirPath)) {
                            break early_exit;
                        }
                        if (!fs.existsSync(versionFilePath)) {
                            break early_exit;
                        }
                        currentVersion = fs.readFileSync(versionFilePath).toString("utf8");
                        if (currentVersion !== gouvFrDsfrVersion) {
                            fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
                            break early_exit;
                        }
                        return [2 /*return*/];
                    }
                    fs.mkdirSync(dsfrDirPath, { "recursive": true });
                    fs.writeFileSync((0, path_1.join)(dsfrDirPath, ".gitignore"), Buffer.from("*", "utf8"));
                    dsfrDistNodeModulesDirPath = (function dsfrDistNodeModulesDirPath(depth) {
                        var parentProjectDirPath = (0, path_1.resolve)(path_1.join.apply(void 0, __spreadArray([], __read(__spreadArray([projectDirPath], __read(new Array(depth).fill("..")), false)), false)));
                        var dsfrDirPathInNodeModules = path_1.join.apply(void 0, [parentProjectDirPath, "node_modules", "@codegouvfr", "react-dsfr", "dsfr"]);
                        if (!fs.existsSync(dsfrDirPathInNodeModules)) {
                            if (parentProjectDirPath === "/") {
                                console.error([
                                    "Can't find dsfr directory",
                                    "please submit an issue about it here ".concat(getRepoIssueUrl())
                                ].join(" "));
                                process.exit(-1);
                            }
                            return dsfrDistNodeModulesDirPath(depth + 1);
                        }
                        return dsfrDirPathInNodeModules;
                    })(0);
                    {
                        dsfrMinCssFileRelativePath = "dsfr.min.css";
                        usedAssetsRelativeFilePaths_1 = new Set(readAssetsImportFromDsfrCss({
                            "dsfrSourceCode": fs
                                .readFileSync((0, path_1.join)(dsfrDistNodeModulesDirPath, dsfrMinCssFileRelativePath))
                                .toString("utf8")
                        }));
                        fileToKeepRelativePaths_1 = new Set([
                            (0, path_1.join)("favicon", "apple-touch-icon.png"),
                            (0, path_1.join)("favicon", "favicon.svg"),
                            (0, path_1.join)("favicon", "favicon.ico"),
                            (0, path_1.join)("favicon", "manifest.webmanifest"),
                            (0, path_1.join)("utility", "icons", "icons.min.css"),
                            dsfrMinCssFileRelativePath
                        ]);
                        (0, transformCodebase_1.transformCodebase)({
                            "srcDirPath": dsfrDistNodeModulesDirPath,
                            "destDirPath": dsfrDirPath,
                            "transformSourceCode": function (_a) {
                                var fileRelativePath = _a.fileRelativePath, sourceCode = _a.sourceCode;
                                if (fileToKeepRelativePaths_1.has(fileRelativePath) ||
                                    usedAssetsRelativeFilePaths_1.has(fileRelativePath)) {
                                    return { "modifiedSourceCode": sourceCode };
                                }
                            }
                        });
                    }
                    fs.writeFileSync(versionFilePath, Buffer.from(gouvFrDsfrVersion, "utf8"));
                    add_version_query_params_in_html_imports: {
                        modifiedHtml = (0, modifyHtmlHrefs_1.modifyHtmlHrefs)({
                            "html": fs.readFileSync(htmlFilePath).toString("utf8"),
                            "getModifiedHref": function (href) {
                                if (!href.includes("/dsfr/")) {
                                    return href;
                                }
                                var _a = __read(href.split("?"), 1), urlWithoutQuery = _a[0];
                                return "".concat(urlWithoutQuery, "?v=").concat(gouvFrDsfrVersion);
                            }
                        }).modifiedHtml;
                        if (htmlFilePath === modifiedHtml) {
                            break add_version_query_params_in_html_imports;
                        }
                        fs.writeFileSync(htmlFilePath, Buffer.from(modifiedHtml, "utf8"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
function readAssetsImportFromDsfrCss(params) {
    var dsfrSourceCode = params.dsfrSourceCode;
    var fileRelativePaths = [/url\("([^"]+)"\)/g, /url\('([^']+)'\)/g, /url\(([^)]+)\)/g]
        .map(function (regex) {
        var fileRelativePaths = [];
        dsfrSourceCode.replace(regex, function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a, 2), relativeFilePath = _b[1];
            if (relativeFilePath.startsWith("data:")) {
                return "";
            }
            fileRelativePaths.push(relativeFilePath);
            return "";
        });
        return fileRelativePaths;
    })
        .flat();
    (0, assert_1.assert)(fileRelativePaths.length !== 0);
    return fileRelativePaths;
}
function getRepoIssueUrl() {
    var reactDsfrRepoUrl = JSON.parse(fs.readFileSync((0, path_1.join)((0, getProjectRoot_1.getProjectRoot)(), "package.json")).toString("utf8"))["repository"]["url"].replace(/^git/, "https:")
        .replace(/\.git$/, "");
    return "".concat(reactDsfrRepoUrl, "/issues");
}
if (require.main === module) {
    main(process.argv.slice(2));
}
//# sourceMappingURL=copy-dsfr-to-public.js.map