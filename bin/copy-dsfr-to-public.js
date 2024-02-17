#!/usr/bin/env node
"use strict";
/**
 * This script is ran with `npx copy-dsfr-to-public`
 * It takes two optional arguments:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--publicDir <path>` to specify the public directory.
 *   In Vite projects we will read the vite.config.ts (or .js) file to find the public directory.
 *   In other projects we will assume it's <project root>/public.
 *   This path is expressed relative to the project directory.
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
var path_1 = require("path");
var fs = __importStar(require("fs"));
var getProjectRoot_1 = require("./tools/getProjectRoot");
var yargs_parser_1 = __importDefault(require("yargs-parser"));
var getAbsoluteAndInOsFormatPath_1 = require("./tools/getAbsoluteAndInOsFormatPath");
var readPublicDirPath_1 = require("./readPublicDirPath");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var argv, projectDirPath, publicDirPath, gitignoreFilePath, gitignoreRaw, pathToIgnore_1, dsfrDirPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                argv = (0, yargs_parser_1.default)(process.argv.slice(2));
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
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var arg, publicDirPath_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    read_from_argv: {
                                        arg = argv["publicDir"];
                                        if (arg === undefined) {
                                            break read_from_argv;
                                        }
                                        publicDirPath_1 = (0, getAbsoluteAndInOsFormatPath_1.getAbsoluteAndInOsFormatPath)({
                                            "pathIsh": arg,
                                            "cwd": projectDirPath
                                        });
                                        if (!fs.existsSync(publicDirPath_1)) {
                                            fs.mkdirSync(publicDirPath_1, { "recursive": true });
                                        }
                                        return [2 /*return*/, publicDirPath_1];
                                    }
                                    return [4 /*yield*/, (0, readPublicDirPath_1.readPublicDirPath)({ projectDirPath: projectDirPath })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })()];
            case 1:
                publicDirPath = _a.sent();
                if (!fs.existsSync(publicDirPath)) {
                    console.error("Can't locate your public directory, use the --public option to specify it.");
                    process.exit(-1);
                }
                edit_gitignore: {
                    gitignoreFilePath = (0, path_1.join)(projectDirPath, ".gitignore");
                    if (!fs.existsSync(gitignoreFilePath)) {
                        fs.writeFileSync(gitignoreFilePath, Buffer.from("", "utf8"));
                    }
                    gitignoreRaw = fs.readFileSync(gitignoreFilePath).toString("utf8");
                    pathToIgnore_1 = "/".concat((0, path_1.join)((0, path_1.relative)(projectDirPath, publicDirPath), "dsfr").replace(new RegExp("\\".concat(path_1.sep), "g"), "/"), "/");
                    if (gitignoreRaw.split("\n").find(function (line) { return line.startsWith(pathToIgnore_1); }) !== undefined) {
                        break edit_gitignore;
                    }
                    fs.writeFileSync(gitignoreFilePath, Buffer.from("".concat(gitignoreRaw, "\n").concat(pathToIgnore_1, "\n"), "utf8"));
                }
                dsfrDirPath = (0, path_1.join)(publicDirPath, "dsfr");
                if (fs.existsSync(dsfrDirPath)) {
                    fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
                }
                (function callee(depth) {
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
                        callee(depth + 1);
                        return;
                    }
                    fs.cpSync(dsfrDirPathInNodeModules, dsfrDirPath, {
                        "recursive": true
                    });
                })(0);
                return [2 /*return*/];
        }
    });
}); })();
function getRepoIssueUrl() {
    var reactDsfrRepoUrl = JSON.parse(fs.readFileSync((0, path_1.join)((0, getProjectRoot_1.getProjectRoot)(), "package.json")).toString("utf8"))["repository"]["url"].replace(/^git/, "https:")
        .replace(/\.git$/, "");
    return "".concat(reactDsfrRepoUrl, "/issues");
}
//# sourceMappingURL=copy-dsfr-to-public.js.map