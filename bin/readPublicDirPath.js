"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.readPublicDirPath = void 0;
var path_1 = require("path");
var fs = __importStar(require("fs"));
var assert_1 = require("tsafe/assert");
var getAbsoluteAndInOsFormatPath_1 = require("./tools/getAbsoluteAndInOsFormatPath");
/** If we read from vite config we take the liberty of creating it if it does not exist */
function readPublicDirPath(params) {
    return __awaiter(this, void 0, void 0, function () {
        var projectDirPath, viteConfigFilePath, viteConfig, _a, afterPublicDir, indexEnd, _b, path, basename, dirname, delimiter, extname, format, isAbsolute, join, normalize, parse, posix, relative, resolve, sep, toNamespacedPath, win32, rest, part, candidate, publicDirPath_1, publicDirPath;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    projectDirPath = params.projectDirPath;
                    viteConfigFilePath = (function () {
                        var e_1, _a;
                        try {
                            for (var _b = __values([".js", ".ts"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var ext = _c.value;
                                var candidateFilePath = (0, path_1.join)(projectDirPath, "vite.config".concat(ext));
                                if (!fs.existsSync(candidateFilePath)) {
                                    continue;
                                }
                                return candidateFilePath;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return undefined;
                    })();
                    if (viteConfigFilePath === undefined) {
                        return [3 /*break*/, 5];
                    }
                    viteConfig = fs.readFileSync(viteConfigFilePath).toString("utf8");
                    if (!viteConfig
                        .split(/\r?\n/)
                        .filter(function (line) { return !line.startsWith("//"); })
                        .join("\n")
                        .includes("publicDir")) {
                        return [3 /*break*/, 5];
                    }
                    _a = __read(viteConfig.split(/\s["']?publicDir["']?\s*:/), 2), afterPublicDir = _a[1];
                    indexEnd = 0;
                    _c.label = 1;
                case 1:
                    if (!(indexEnd < afterPublicDir.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("path")); })];
                case 2:
                    _b = _c.sent(), path = _b.default, basename = _b.basename, dirname = _b.dirname, delimiter = _b.delimiter, extname = _b.extname, format = _b.format, isAbsolute = _b.isAbsolute, join = _b.join, normalize = _b.normalize, parse = _b.parse, posix = _b.posix, relative = _b.relative, resolve = _b.resolve, sep = _b.sep, toNamespacedPath = _b.toNamespacedPath, win32 = _b.win32, rest = __rest(_b, ["default", "basename", "dirname", "delimiter", "extname", "format", "isAbsolute", "join", "normalize", "parse", "posix", "relative", "resolve", "sep", "toNamespacedPath", "win32"]);
                    (0, assert_1.assert)();
                    part = afterPublicDir
                        .substring(0, indexEnd)
                        .replace(/__dirname/g, "\"".concat(projectDirPath, "\""));
                    candidate = void 0;
                    try {
                        candidate = eval(part);
                    }
                    catch (_d) {
                        return [3 /*break*/, 3];
                    }
                    if (typeof candidate !== "string") {
                        return [3 /*break*/, 3];
                    }
                    publicDirPath_1 = (0, getAbsoluteAndInOsFormatPath_1.getAbsoluteAndInOsFormatPath)({
                        "pathIsh": candidate,
                        "cwd": (0, path_1.dirname)(viteConfigFilePath)
                    });
                    if (!fs.existsSync(publicDirPath_1)) {
                        fs.mkdirSync(publicDirPath_1, { "recursive": true });
                    }
                    return [2 /*return*/, publicDirPath_1];
                case 3:
                    indexEnd++;
                    return [3 /*break*/, 1];
                case 4:
                    console.error("Can't parse the vite configuration please open an issue about it on the react-dsfr GitHub repository.");
                    process.exit(-1);
                    _c.label = 5;
                case 5:
                    publicDirPath = (0, path_1.join)(projectDirPath, "public");
                    return [2 /*return*/, publicDirPath];
            }
        });
    });
}
exports.readPublicDirPath = readPublicDirPath;
//# sourceMappingURL=readPublicDirPath.js.map