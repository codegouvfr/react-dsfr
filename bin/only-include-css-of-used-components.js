"use strict";
/**
 * This processing stage is run by `npx react-dsfr optimize-css`, after the icon CSS
 * has been optimized.
 * It scans your codebase to find which react-dsfr components are used and rebuilds
 * the node_modules/@codegouvfr/react-dsfr/dsfr/dsfr.css and dsfr.min.css files
 * with only the CSS of those components (plus the core, which is always included).
 * The public/dsfr/dsfr.min.css file is patched as well if applicable (not in Next.js for example).
 *
 * The trimmed stylesheets are rebuilt from the granular CSS files shipped by the DSFR
 * (dsfr/core/*, dsfr/component/*, dsfr/scheme/*) so no CSS rule is ever rewritten,
 * only whole components are included or excluded. This makes the output robust to
 * classes and attributes dynamically added by the DSFR JavaScript (data-fr-js-*).
 *
 * Usage of a component is detected by:
 * - Imports of `@codegouvfr/react-dsfr/<Component>` in your sources.
 * - Usage of the component's CSS class names (e.g. "fr-table") in your sources,
 *   for when you use raw DSFR classes without the React component.
 *
 * Stylesheets (.css, .scss...) are not scanned: class name detection is substring based,
 * so a single compiled bundle would mark every component as used.
 *
 * You can force the inclusion of components that the detection would miss by adding
 * to your package.json:
 * "react-dsfr": {
 *     "additionalComponents": ["table", "Range"]
 * }
 * (values are DSFR CSS component names or react-dsfr component names)
 *
 * There are three optional arguments that you can use:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--silent` to disable console.log
 * - `--strict` to exit with a non zero code instead of falling back to the untrimmed
 *   stylesheet when something can't be resolved. Recommended in CI, where the warning
 *   would otherwise go unnoticed and the build would silently ship the full bundle.
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
exports.main = exports.generateDsfrCssCode = exports.patchCoreCssCodeForCompatWithMui = exports.getReferencedAssetRelativePaths = exports.rewriteCssRelativeUrls = exports.detectDsfrComponentsFromClassNames = exports.resolveModuleIdToDsfrComponents = exports.getReactDsfrImportedModuleIds = exports.DSFR_COMPONENT_DETECTION_CLASS_PREFIXES = exports.DSFR_COMPONENT_CSS_FILE_EXTENSIONS = exports.REACT_DSFR_MODULE_TO_DSFR_COMPONENTS = exports.DSFR_COMPONENTS_CASCADE_ORDER = void 0;
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
/**
 * The DSFR CSS components (dsfr/component/<name> directories), listed in the
 * order in which they are concatenated in the upstream dsfr.css bundle.
 * Preserving this order preserves the CSS cascade of the original stylesheet.
 *
 * The order is the order of first occurrence of each `component/<name>/main.scss`
 * in the `sources` of `@gouvfr/dsfr/dist/dsfr.main.css.map`. It is asserted against
 * the installed DSFR in test/runtime/scripts/onlyIncludeUsedComponents/dsfrComponentsCascadeOrder.test.ts
 * so that it can't silently drift on a DSFR bump.
 * `radio` is the only component that has no `main.scss` upstream, its position is
 * taken from the first occurrence of any of its stylesheets (between notice and card).
 */
exports.DSFR_COMPONENTS_CASCADE_ORDER = [
    "upload",
    "range",
    "accordion",
    "badge",
    "logo",
    "button",
    "connect",
    "quote",
    "breadcrumb",
    "form",
    "stepper",
    "tooltip",
    "link",
    "sidemenu",
    "callout",
    "highlight",
    "tab",
    "pagination",
    "summary",
    "tag",
    "download",
    "alert",
    "notice",
    "radio",
    "card",
    "checkbox",
    "input",
    "content",
    "segmented",
    "toggle",
    "skiplink",
    "select",
    "modal",
    "navigation",
    "share",
    "footer",
    "tile",
    "search",
    "consent",
    "follow",
    "password",
    "translate",
    "table",
    "transcription",
    "header"
];
/**
 * Map from react-dsfr module (the `@codegouvfr/react-dsfr/<moduleId>` import subpath)
 * to the DSFR CSS components its markup depends on, transitive dependencies included
 * (e.g. the Header renders a navigation, a search bar and a modal on mobile).
 * When in doubt a dependency is included: too much CSS is only a size cost,
 * not enough CSS is a rendering bug.
 * Modules that do not appear here and are not known non-component modules trigger
 * a fail-safe: every component is included.
 */
exports.REACT_DSFR_MODULE_TO_DSFR_COMPONENTS = {
    "Accordion": ["accordion"],
    "AgentConnectButton": ["connect", "button"],
    "Alert": ["alert", "link", "button"],
    "Badge": ["badge"],
    "Breadcrumb": ["breadcrumb", "link"],
    "Button": ["button", "link"],
    "ButtonsGroup": ["button", "link"],
    "CallOut": ["callout", "button", "link"],
    "Card": ["card", "badge", "link"],
    // The Chart components pull their CSS from the @gouvfr/dsfr-chart peer dependency.
    "Chart": [],
    "Checkbox": ["checkbox", "radio", "form"],
    "Display": ["modal", "radio", "form", "button", "link"],
    "Download": ["download", "link"],
    "Follow": ["follow", "form", "input", "upload", "button", "link", "alert", "checkbox"],
    "Footer": ["footer", "logo", "button", "link"],
    "FranceConnectButton": ["connect", "button"],
    "Header": [
        "header",
        "navigation",
        "modal",
        "logo",
        "button",
        "link",
        "search",
        "input",
        "form"
    ],
    "Highlight": ["highlight"],
    "Input": ["input", "form", "upload"],
    "LanguageSelect": ["translate", "navigation", "button", "link"],
    "MainNavigation": ["navigation", "link"],
    "Modal": ["modal", "button", "link"],
    "MonCompteProButton": ["connect", "button"],
    "Notice": ["notice", "button", "link"],
    "Pagination": ["pagination", "link"],
    "ProConnectButton": ["connect", "button"],
    "Quote": ["quote"],
    "RadioButtons": ["radio", "checkbox", "form"],
    "Range": ["range", "form"],
    "SearchBar": ["search", "input", "form", "button"],
    "SegmentedControl": ["segmented", "form"],
    "Select": ["select", "form"],
    "SelectNext": ["select", "form"],
    "SideMenu": ["sidemenu", "link"],
    "SkipLinks": ["skiplink", "link"],
    "Stepper": ["stepper"],
    "Summary": ["summary", "link"],
    "Table": ["table"],
    "Tabs": ["tab"],
    "Tag": ["tag"],
    "TagsGroup": ["tag"],
    "Tile": ["tile", "link"],
    "ToggleSwitch": ["toggle", "form"],
    "ToggleSwitchGroup": ["toggle", "form"],
    "Tooltip": ["tooltip", "button"],
    "Upload": ["upload", "input", "form"],
    "blocks/PasswordInput": ["password", "input", "form", "link", "checkbox"],
    "consentManagement": ["consent", "modal", "button", "link", "radio", "form"],
    // `link` is the registerLink module, its Link fallback renders a `fr-link` button.
    "link": ["link"],
    // `shared` only contains Fieldset, the internal building block of
    // Checkbox / RadioButtons: it renders fr-fieldset, fr-label, fr-hint-text and fr-radio-rich.
    "shared": ["form", "radio", "checkbox"]
};
/**
 * The stylesheet a DSFR component ships under `component/<name>/<name>.<ext>`, by order of
 * preference. Not every component has every variant: `download` for instance only ships
 * `download.css` and `download.min.css`, no `.main.` ones.
 */
exports.DSFR_COMPONENT_CSS_FILE_EXTENSIONS = [
    "main.min.css",
    "min.css",
    "main.css",
    "css"
];
/**
 * CSS class name prefixes that reveal a direct usage of a DSFR component in the
 * sources (when raw fr-* classes are used without importing the React component).
 * Substring matching is intentional and fail-safe: matching too much only means
 * including a component's CSS that may not be needed.
 *
 * A prefix only belongs here if it opens a selector in that component's own stylesheet.
 * A class that the component merely *styles as a descendant* is not a usage signal: its
 * base rules live elsewhere (usually in the always included core), so detecting on it
 * pulls the whole component in for nothing. dsfrComponentDetectionClassPrefixes.test.ts
 * re-derives this rule against the installed @gouvfr/dsfr.
 */
exports.DSFR_COMPONENT_DETECTION_CLASS_PREFIXES = {
    "accordion": ["fr-accordion"],
    "alert": ["fr-alert"],
    "badge": ["fr-badge"],
    "breadcrumb": ["fr-breadcrumb"],
    "button": ["fr-btn"],
    "callout": ["fr-callout"],
    "card": ["fr-card"],
    "checkbox": ["fr-checkbox"],
    "connect": ["fr-connect"],
    "consent": ["fr-consent"],
    // NOTE: deliberately not fr-responsive-img / fr-responsive-vid. Their base rules
    // live in the always included core, and every rule content.css has for them is
    // scoped under .fr-content-media, which is already the prefix detected here.
    "content": ["fr-content-media"],
    "download": ["fr-download"],
    "follow": ["fr-follow"],
    "footer": ["fr-footer"],
    "form": ["fr-fieldset", "fr-label", "fr-hint-text", "fr-message", "fr-input-group"],
    "header": ["fr-header"],
    "highlight": ["fr-highlight"],
    "input": ["fr-input"],
    "link": ["fr-link"],
    "logo": ["fr-logo"],
    "modal": ["fr-modal"],
    "navigation": ["fr-nav", "fr-menu", "fr-mega-menu"],
    "notice": ["fr-notice"],
    "pagination": ["fr-pagination"],
    "password": ["fr-password"],
    "quote": ["fr-quote"],
    "radio": ["fr-radio"],
    "range": ["fr-range"],
    "search": ["fr-search-bar"],
    "segmented": ["fr-segmented"],
    "select": ["fr-select"],
    "share": ["fr-share"],
    "sidemenu": ["fr-sidemenu"],
    "skiplink": ["fr-skiplink"],
    "stepper": ["fr-stepper"],
    "summary": ["fr-summary"],
    "tab": ["fr-tabs"],
    "table": ["fr-table"],
    "tag": ["fr-tag"],
    "tile": ["fr-tile"],
    "toggle": ["fr-toggle"],
    "tooltip": ["fr-tooltip"],
    "transcription": ["fr-transcription"],
    "translate": ["fr-translate"],
    "upload": ["fr-upload"]
};
/**
 * react-dsfr modules that are known not to render any DSFR component markup
 * (hooks, utilities, integration helpers, assets...).
 */
var NON_COMPONENT_MODULE_IDS = new Set([
    "fr",
    "i18n",
    "spa",
    "start",
    "tss",
    "mui",
    "picto",
    "tools",
    "assets",
    "favicon",
    "main.css",
    "dsfr.css",
    "next-appdir",
    "next-app-router",
    "next-pagesdir",
    "useBreakpointsValues",
    "useBreakpointsValuesPx",
    "useColors",
    "useIsDark",
    "eulerianAnalytics",
    "getHtmlAttributes",
    "zz_internal"
]);
/**
 * Regexes matching the specifier of an actual import statement.
 * Matching any textual occurrence of "@codegouvfr/react-dsfr/..." instead would
 * pick up urls and comments (a link to https://www.npmjs.com/package/@codegouvfr/react-dsfr/v/1.32.5
 * would resolve to the unknown module "v" and trigger the include-everything fail-safe).
 */
var IMPORT_SPECIFIER_REGEXES = [
    // import X from "..." / export * from "..."
    /\bfrom\s*["'`]([^"'`\n]+)["'`]/g,
    // import "..." / import("...")
    /\bimport\s*\(?\s*["'`]([^"'`\n]+)["'`]/g,
    // require("...")
    /\brequire\s*\(\s*["'`]([^"'`\n]+)["'`]/g,
    // @import "..." / @import url("...")
    /@import\s+(?:url\(\s*)?["'`]([^"'`\n]+)["'`]/g
];
var REACT_DSFR_PACKAGE_NAME = "@codegouvfr/react-dsfr";
function getReactDsfrImportedModuleIds(params) {
    var e_1, _a;
    var rawFileContent = params.rawFileContent;
    var moduleIds = new Set();
    if (!rawFileContent.includes(REACT_DSFR_PACKAGE_NAME)) {
        return [];
    }
    var importSpecifiers = new Set(IMPORT_SPECIFIER_REGEXES.map(function (regex) {
        return Array.from(rawFileContent.matchAll(regex), function (_a) {
            var _b = __read(_a, 2), specifier = _b[1];
            return specifier;
        });
    }).flat());
    var _loop_1 = function (importSpecifier) {
        if (!importSpecifier.startsWith("".concat(REACT_DSFR_PACKAGE_NAME, "/"))) {
            return "continue";
        }
        var subpath = importSpecifier.slice("".concat(REACT_DSFR_PACKAGE_NAME, "/").length);
        var segments = subpath
            .replace(/\.(?:js|mjs|cjs|ts|tsx|jsx)$/, "")
            .split("/")
            .filter(function (segment) { return segment !== "index" && segment !== ""; });
        if (segments.length === 0) {
            return "continue";
        }
        moduleIds.add((function () {
            switch (segments[0]) {
                case "blocks":
                    return segments.slice(0, 2).join("/");
                case "dsfr":
                    return segments.slice(0, 3).join("/");
                default:
                    return segments[0];
            }
        })());
    };
    try {
        for (var importSpecifiers_1 = __values(importSpecifiers), importSpecifiers_1_1 = importSpecifiers_1.next(); !importSpecifiers_1_1.done; importSpecifiers_1_1 = importSpecifiers_1.next()) {
            var importSpecifier = importSpecifiers_1_1.value;
            _loop_1(importSpecifier);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (importSpecifiers_1_1 && !importSpecifiers_1_1.done && (_a = importSpecifiers_1.return)) _a.call(importSpecifiers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return Array.from(moduleIds);
}
exports.getReactDsfrImportedModuleIds = getReactDsfrImportedModuleIds;
function resolveModuleIdToDsfrComponents(params) {
    var moduleId = params.moduleId;
    direct_import_of_a_dsfr_component_stylesheet: {
        var match_1 = moduleId.match(/^dsfr\/component\/([^/]+)/);
        if (match_1 === null) {
            break direct_import_of_a_dsfr_component_stylesheet;
        }
        var dsfrComponent = exports.DSFR_COMPONENTS_CASCADE_ORDER.find(function (componentName) { return componentName === match_1[1]; });
        return dsfrComponent === undefined ? undefined : [dsfrComponent];
    }
    if (moduleId.startsWith("dsfr/")) {
        return [];
    }
    {
        var dsfrComponents = exports.REACT_DSFR_MODULE_TO_DSFR_COMPONENTS[moduleId.split("/")[0]];
        if (dsfrComponents !== undefined) {
            return dsfrComponents;
        }
    }
    {
        var dsfrComponents = exports.REACT_DSFR_MODULE_TO_DSFR_COMPONENTS[moduleId];
        if (dsfrComponents !== undefined) {
            return dsfrComponents;
        }
    }
    var firstSegment = moduleId.split("/")[0];
    if (NON_COMPONENT_MODULE_IDS.has(firstSegment)) {
        return [];
    }
    // A component this script does not know about (newer react-dsfr version?),
    // or a new non-component module missing from NON_COMPONENT_MODULE_IDS.
    return undefined;
}
exports.resolveModuleIdToDsfrComponents = resolveModuleIdToDsfrComponents;
function detectDsfrComponentsFromClassNames(params) {
    var rawFileContent = params.rawFileContent;
    if (!rawFileContent.includes("fr-")) {
        return [];
    }
    return Object.entries(exports.DSFR_COMPONENT_DETECTION_CLASS_PREFIXES)
        .filter(function (_a) {
        var _b = __read(_a, 2), classPrefixes = _b[1];
        return classPrefixes.some(function (classPrefix) { return rawFileContent.includes(classPrefix); });
    })
        .map(function (_a) {
        var _b = __read(_a, 1), componentName = _b[0];
        return componentName;
    });
}
exports.detectDsfrComponentsFromClassNames = detectDsfrComponentsFromClassNames;
function rewriteCssRelativeUrls(params) {
    var rawCssCode = params.rawCssCode, cssFileRelativeDirPath = params.cssFileRelativeDirPath;
    return rawCssCode.replace(/url\((["']?)([^)"']+)\1\)/g, function (match, quote, url) {
        var e_2, _a;
        if (/^(?:data:|https?:|\/)/.test(url)) {
            return match;
        }
        var pathSegments = [];
        try {
            for (var _b = __values(__spreadArray(__spreadArray([], __read(cssFileRelativeDirPath.split("/")), false), __read(url.split("/")), false)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var segment = _c.value;
                if (segment === "." || segment === "") {
                    continue;
                }
                if (segment === ".." && pathSegments.length !== 0) {
                    pathSegments.pop();
                    continue;
                }
                pathSegments.push(segment);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return "url(".concat(quote).concat(pathSegments.join("/")).concat(quote, ")");
    });
}
exports.rewriteCssRelativeUrls = rewriteCssRelativeUrls;
/**
 * The assets (fonts, icons, artwork...) referenced by a stylesheet whose url()
 * have already been rewritten relative to the dsfr directory root by
 * rewriteCssRelativeUrls(). Absolute and data: urls are skipped.
 */
function getReferencedAssetRelativePaths(params) {
    var e_3, _a;
    var rawCssCode = params.rawCssCode;
    var assetRelativePaths = new Set();
    try {
        for (var _b = __values(rawCssCode.matchAll(/url\((["']?)([^)"']+)\1\)/g)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 3), url = _d[2];
            if (/^(?:data:|https?:|\/)/.test(url)) {
                continue;
            }
            var _e = __read(url.split(/[?#]/), 1), urlWithoutQuery = _e[0];
            if (urlWithoutQuery === "") {
                continue;
            }
            assetRelativePaths.add(urlWithoutQuery);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return Array.from(assetRelativePaths);
}
exports.getReferencedAssetRelativePaths = getReferencedAssetRelativePaths;
/**
 * String level equivalent of scripts/build/patchCssForMui.ts, the selectors
 * `button:not(:disabled):hover` and `button:not(:disabled):active` only exist
 * in the core stylesheet, within the `(hover: hover) and (pointer: fine)` media query.
 */
function patchCoreCssCodeForCompatWithMui(params) {
    var rawCssCode = params.rawCssCode;
    return rawCssCode
        .replace(/button:not\(:disabled\):hover(?![\w:([-])/g, 'button:not(:disabled):hover:not([class^="Mui"])')
        .replace(/button:not\(:disabled\):active(?![\w:([-])/g, 'button:not(:disabled):active:not([class^="Mui"])');
}
exports.patchCoreCssCodeForCompatWithMui = patchCoreCssCodeForCompatWithMui;
function generateDsfrCssCode(params) {
    var dsfrComponents = params.dsfrComponents, isMinified = params.isMinified, readDsfrFile = params.readDsfrFile;
    var sortedDsfrComponents = __spreadArray(__spreadArray([], __read(exports.DSFR_COMPONENTS_CASCADE_ORDER.filter(function (componentName) {
        return dsfrComponents.includes(componentName);
    })), false), __read(dsfrComponents
        .filter(function (componentName) {
        return !exports.DSFR_COMPONENTS_CASCADE_ORDER.includes(componentName);
    })
        .sort()), false);
    var readCssChunks = function (params) {
        var getFileRelativePathCandidates = params.getFileRelativePathCandidates;
        return __spreadArray([
            ["core", "core"],
            ["scheme", "scheme"]
        ], __read(sortedDsfrComponents.map(function (componentName) { return [
            "component/".concat(componentName),
            componentName
        ]; })), false).map(function (_a) {
            var e_4, _b;
            var _c = __read(_a, 2), dirRelativePath = _c[0], basename = _c[1];
            try {
                for (var _d = __values(getFileRelativePathCandidates(dirRelativePath, basename)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var fileRelativePath = _e.value;
                    var rawCssCode = readDsfrFile(fileRelativePath);
                    if (rawCssCode === undefined) {
                        continue;
                    }
                    return {
                        dirRelativePath: dirRelativePath,
                        rawCssCode: rawCssCode
                    };
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return undefined;
        })
            .filter((0, exclude_1.exclude)(undefined));
    };
    var cssChunks = __spreadArray(__spreadArray([], __read(readCssChunks({
        "getFileRelativePathCandidates": function (dirRelativePath, basename) {
            return (isMinified
                ? ["".concat(basename, ".main.min.css"), "".concat(basename, ".min.css")]
                : ["".concat(basename, ".main.css"), "".concat(basename, ".css")]).map(function (fileBasename) { return "".concat(dirRelativePath, "/").concat(fileBasename); });
        }
    })), false), __read(readCssChunks({
        "getFileRelativePathCandidates": function (dirRelativePath, basename) {
            return (isMinified ? ["".concat(basename, ".print.min.css")] : ["".concat(basename, ".print.css")]).map(function (fileBasename) { return "".concat(dirRelativePath, "/").concat(fileBasename); });
        }
    })), false);
    (0, assert_1.assert)(cssChunks.length !== 0, "Can't find the granular DSFR stylesheets to rebuild dsfr.css from");
    return __spreadArray([
        "/*! DSFR stylesheet rebuilt by react-dsfr optimize-css, components: ".concat(sortedDsfrComponents.join(", "), " */")
    ], __read(cssChunks.map(function (_a) {
        var dirRelativePath = _a.dirRelativePath, rawCssCode = _a.rawCssCode;
        var cssCode = rawCssCode
            .replace(/@charset "UTF-8";\s*/g, "")
            .replace(/^\/\*![\s\S]*?\*\/\s*/, "")
            .replace(/\/\*# sourceMappingURL=[^*]*\*\/\s*/g, "");
        cssCode = rewriteCssRelativeUrls({
            "rawCssCode": cssCode,
            "cssFileRelativeDirPath": dirRelativePath
        });
        if (dirRelativePath === "core") {
            cssCode = patchCoreCssCodeForCompatWithMui({ "rawCssCode": cssCode });
        }
        return cssCode.trim();
    })), false).join("\n");
}
exports.generateDsfrCssCode = generateDsfrCssCode;
var CODEGOUV_REACT_DSFR = JSON.parse(fs.readFileSync((0, path_1.join)((0, getProjectRoot_1.getProjectRoot)(), "package.json")).toString("utf8"))["name"];
function getCommandContext(args) {
    return __awaiter(this, void 0, void 0, function () {
        var argv, projectDirPath, packageJsonFilePath, packageJson, _a, _b, nodeModulesDirPath, dsfrDirPath, dsfrDirPath_static, htmlFilePath, isSilent, isStrict, srcFilePaths;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
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
                    packageJsonFilePath = (0, path_1.join)(process.cwd(), "package.json");
                    return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)(packageJsonFilePath)];
                case 1:
                    if (!(_c.sent())) {
                        return [3 /*break*/, 3];
                    }
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)(packageJsonFilePath)];
                case 2:
                    packageJson = _b.apply(_a, [(_c.sent()).toString("utf8")]);
                    if (packageJson["name"] !== CODEGOUV_REACT_DSFR) {
                        return [3 /*break*/, 3];
                    }
                    // The storybook documents every component, there is nothing to trim.
                    return [2 /*return*/, undefined];
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
                    nodeModulesDirPath = _c.sent();
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
                    dsfrDirPath_static = _c.sent();
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
                    htmlFilePath = _c.sent();
                    isSilent = argv["silent"] === true;
                    isStrict = argv["strict"] === true;
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
                                                    if (relativeDirPath === "build") {
                                                        return [2 /*return*/, false];
                                                    }
                                                    if ((0, path_2.basename)(relativeDirPath) === "node_modules") {
                                                        return [2 /*return*/, false];
                                                    }
                                                    return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)((0, path_1.join)(projectDirPath, relativeDirPath, "dsfr.min.css"))];
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
                                        var e_5, _d;
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
                                                    if (parsedPackageJson["name"] === CODEGOUV_REACT_DSFR) {
                                                        // Scanning react-dsfr's own sources would mark every component as used.
                                                        return [2 /*return*/, false];
                                                    }
                                                    if (parsedPackageJson["name"] === "tss-react") {
                                                        return [2 /*return*/, false];
                                                    }
                                                    if (parsedPackageJson["name"] === "@gouvfr/dsfr-chart") {
                                                        return [2 /*return*/, false];
                                                    }
                                                    if (parsedPackageJson["name"] === "@gouvfr/dsfr") {
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
                                                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                                    finally {
                                                        try {
                                                            if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                                                        }
                                                        finally { if (e_5) throw e_5.error; }
                                                    }
                                                    return [2 /*return*/, false];
                                                case 2:
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
                    srcFilePaths = (_c.sent())
                        .flat()
                        .filter(function (filePath) {
                        // NOTE: Stylesheets are deliberately not scanned: detectDsfrComponentsFromClassNames()
                        // does substring matching, so a single compiled bundle (a leftover out/, a
                        // dependency shipping the DSFR) would mark every component as used.
                        // Use "react-dsfr"."additionalComponents" in your package.json for the
                        // components you only reference from a stylesheet.
                        return ["tsx", "jsx", "js", "ts", "mdx", "html", "htm", "svelte", "vue"].find(function (ext) {
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
                                return {
                                    dsfrDirPath_static: dsfrDirPath_static,
                                    htmlFilePath: htmlFilePath
                                };
                            })(),
                            isSilent: isSilent,
                            isStrict: isStrict
                        }];
            }
        });
    });
}
function main(args) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var commandContext, log, componentsDirPath, availableDsfrComponents, usedDsfrComponents, doIncludeAllComponents, packageJsonFilePath, reactDsfrConfig, _b, _c, additionalComponents, additionalComponents_1, additionalComponents_1_1, additionalComponent, dsfrComponents_1, dsfrComponents, readDsfrFile, rawDsfrCssCodeBuffer, rawDsfrMinCssCodeBuffer, hasChanged;
        var e_6, _d;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, getCommandContext(args)];
                case 1:
                    commandContext = _e.sent();
                    if (commandContext === undefined) {
                        return [2 /*return*/];
                    }
                    log = commandContext.isSilent ? undefined : console.log;
                    componentsDirPath = (0, path_1.join)(commandContext.dsfrDirPath, "component");
                    if (!fs.existsSync(componentsDirPath)) {
                        (0, assert_1.assert)(false, [
                            "Can't find the granular DSFR stylesheets in ".concat(componentsDirPath, ","),
                            "is your installation of ".concat(CODEGOUV_REACT_DSFR, " complete?")
                        ].join(" "));
                    }
                    availableDsfrComponents = fs
                        .readdirSync(componentsDirPath, { "withFileTypes": true })
                        .filter(function (dirent) { return dirent.isDirectory(); })
                        .map(function (dirent) { return dirent.name; })
                        .filter(function (componentName) {
                        return exports.DSFR_COMPONENT_CSS_FILE_EXTENSIONS.some(function (ext) {
                            return fs.existsSync((0, path_1.join)(commandContext.dsfrDirPath, "component", componentName, "".concat(componentName, ".").concat(ext)));
                        });
                    });
                    usedDsfrComponents = new Set();
                    doIncludeAllComponents = false;
                    return [4 /*yield*/, Promise.all(commandContext.srcFilePaths.map(function (srcFilePath) { return __awaiter(_this, void 0, void 0, function () {
                            var rawFileContent, _a, _b, moduleId, dsfrComponents_2, _c, _d, componentName;
                            var e_7, _e, e_8, _f;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0: return [4 /*yield*/, (0, promises_1.readFile)(srcFilePath)];
                                    case 1:
                                        rawFileContent = (_g.sent()).toString("utf8");
                                        try {
                                            for (_a = __values(getReactDsfrImportedModuleIds({ rawFileContent: rawFileContent })), _b = _a.next(); !_b.done; _b = _a.next()) {
                                                moduleId = _b.value;
                                                dsfrComponents_2 = resolveModuleIdToDsfrComponents({ moduleId: moduleId });
                                                if (dsfrComponents_2 === undefined) {
                                                    // NOTE: Deliberately not routed through log?.(), --silent must not hide
                                                    // the fact that the optimization has been disabled for this run.
                                                    console.warn([
                                                        "[react-dsfr] Unknown react-dsfr module \"".concat(moduleId, "\" imported in"),
                                                        "".concat((0, path_1.relative)(process.cwd(), srcFilePath), ":"),
                                                        "no CSS is trimmed at all for this run, every component is included.",
                                                        "Please report it: https://github.com/codegouvfr/react-dsfr/issues"
                                                    ].join(" "));
                                                    doIncludeAllComponents = true;
                                                    continue;
                                                }
                                                if (dsfrComponents_2.length === 0) {
                                                    continue;
                                                }
                                                log === null || log === void 0 ? void 0 : log("Found import of ".concat(moduleId, " in ").concat((0, path_1.relative)(process.cwd(), srcFilePath)));
                                                dsfrComponents_2.forEach(function (componentName) { return usedDsfrComponents.add(componentName); });
                                            }
                                        }
                                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                        finally {
                                            try {
                                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                                            }
                                            finally { if (e_7) throw e_7.error; }
                                        }
                                        try {
                                            for (_c = __values(detectDsfrComponentsFromClassNames({ rawFileContent: rawFileContent })), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                componentName = _d.value;
                                                if (usedDsfrComponents.has(componentName)) {
                                                    continue;
                                                }
                                                log === null || log === void 0 ? void 0 : log("Found usage of ".concat(componentName, " classes in ").concat((0, path_1.relative)(process.cwd(), srcFilePath)));
                                                usedDsfrComponents.add(componentName);
                                            }
                                        }
                                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                                        finally {
                                            try {
                                                if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                                            }
                                            finally { if (e_8) throw e_8.error; }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _e.sent();
                    packageJsonFilePath = (0, path_1.join)(commandContext.projectDirPath, "package.json");
                    return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)(packageJsonFilePath)];
                case 3:
                    if (!(_e.sent())) {
                        return [3 /*break*/, 5];
                    }
                    _c = (_b = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)(packageJsonFilePath)];
                case 4:
                    reactDsfrConfig = _c.apply(_b, [(_e.sent()).toString("utf8")])["react-dsfr"];
                    additionalComponents = reactDsfrConfig === null || typeof reactDsfrConfig !== "object"
                        ? undefined
                        : reactDsfrConfig["additionalComponents"];
                    if (additionalComponents === undefined) {
                        if (reactDsfrConfig !== null && typeof reactDsfrConfig === "object") {
                            // A typo in the key would otherwise silently disable the escape hatch.
                            console.warn([
                                "[react-dsfr] The \"react-dsfr\" entry of your package.json has no",
                                "\"additionalComponents\" key, is it a typo? Found:",
                                "".concat(Object.keys(reactDsfrConfig).join(", "))
                            ].join(" "));
                        }
                        return [3 /*break*/, 5];
                    }
                    (0, assert_1.assert)(Array.isArray(additionalComponents) &&
                        additionalComponents.every(function (value) { return typeof value === "string"; }), 'Malformed "react-dsfr"."additionalComponents" in package.json, expected an array of strings');
                    try {
                        for (additionalComponents_1 = __values(additionalComponents), additionalComponents_1_1 = additionalComponents_1.next(); !additionalComponents_1_1.done; additionalComponents_1_1 = additionalComponents_1.next()) {
                            additionalComponent = additionalComponents_1_1.value;
                            dsfrComponents_1 = (_a = exports.REACT_DSFR_MODULE_TO_DSFR_COMPONENTS[additionalComponent]) !== null && _a !== void 0 ? _a : (availableDsfrComponents.includes(additionalComponent)
                                ? [additionalComponent]
                                : undefined);
                            if (dsfrComponents_1 === undefined) {
                                console.warn([
                                    "[react-dsfr] Unknown component \"".concat(additionalComponent, "\" in"),
                                    "\"react-dsfr\".\"additionalComponents\" of your package.json:",
                                    "no CSS is trimmed at all for this run, every component is included."
                                ].join(" "));
                                doIncludeAllComponents = true;
                                continue;
                            }
                            if (dsfrComponents_1.length === 0) {
                                // Reporting "Including <X>" here would be the exact opposite of what happens,
                                // and this escape hatch is precisely what one reaches for when something is unstyled.
                                console.warn(__spreadArray([
                                    "[react-dsfr] \"".concat(additionalComponent, "\" of"),
                                    "\"react-dsfr\".\"additionalComponents\" maps to no DSFR stylesheet,",
                                    "nothing was added."
                                ], __read((additionalComponent === "Chart"
                                    ? ["The Chart CSS comes from the @gouvfr/dsfr-chart package."]
                                    : [])), false).join(" "));
                                continue;
                            }
                            log === null || log === void 0 ? void 0 : log("Including ".concat(additionalComponent, " (from package.json additionalComponents)"));
                            dsfrComponents_1.forEach(function (componentName) { return usedDsfrComponents.add(componentName); });
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (additionalComponents_1_1 && !additionalComponents_1_1.done && (_d = additionalComponents_1.return)) _d.call(additionalComponents_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    _e.label = 5;
                case 5:
                    if (doIncludeAllComponents && commandContext.isStrict) {
                        console.error([
                            "[react-dsfr] Aborting because of --strict:",
                            "something could not be resolved (see the warning(s) above),",
                            "so this run would have shipped the untrimmed dsfr.min.css.",
                            "Fix the cause or add the component to \"react-dsfr\".\"additionalComponents\"",
                            "in your package.json."
                        ].join(" "));
                        process.exit(1);
                    }
                    dsfrComponents = doIncludeAllComponents
                        ? availableDsfrComponents
                        : availableDsfrComponents.filter(function (componentName) { return usedDsfrComponents.has(componentName); });
                    log === null || log === void 0 ? void 0 : log("Including the CSS of ".concat(dsfrComponents.length, " DSFR components (out of ").concat(availableDsfrComponents.length, ")."));
                    readDsfrFile = function (fileRelativePath) {
                        var filePath = path_1.join.apply(void 0, __spreadArray([commandContext.dsfrDirPath], __read(fileRelativePath.split("/")), false));
                        if (!fs.existsSync(filePath)) {
                            return undefined;
                        }
                        return fs.readFileSync(filePath).toString("utf8");
                    };
                    rawDsfrCssCodeBuffer = Buffer.from(generateDsfrCssCode({
                        dsfrComponents: dsfrComponents,
                        "isMinified": false,
                        readDsfrFile: readDsfrFile
                    }), "utf8");
                    rawDsfrMinCssCodeBuffer = Buffer.from(generateDsfrCssCode({
                        dsfrComponents: dsfrComponents,
                        "isMinified": true,
                        readDsfrFile: readDsfrFile
                    }), "utf8");
                    hasChanged = false;
                    return [4 /*yield*/, Promise.all(__spreadArray([
                            {
                                "dsfrDirPath": commandContext.dsfrDirPath,
                                "cssFileBasenames": ["dsfr.css", "dsfr.min.css"]
                            }
                        ], __read((commandContext.spaParams === undefined
                            ? []
                            : [
                                {
                                    "dsfrDirPath": commandContext.spaParams.dsfrDirPath_static,
                                    // copy-dsfr-to-public only keeps the minified variant.
                                    "cssFileBasenames": ["dsfr.min.css"]
                                }
                            ])), false).map(function (_a) {
                            var dsfrDirPath = _a.dsfrDirPath, cssFileBasenames = _a.cssFileBasenames;
                            return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_b) {
                                    return [2 /*return*/, Promise.all(cssFileBasenames.map(function (cssFileBasename) { return __awaiter(_this, void 0, void 0, function () {
                                            var cssFilePath, buffer, _a, _b;
                                            return __generator(this, function (_c) {
                                                switch (_c.label) {
                                                    case 0:
                                                        cssFilePath = (0, path_1.join)(dsfrDirPath, cssFileBasename);
                                                        return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)(cssFilePath)];
                                                    case 1:
                                                        if (!(_c.sent())) {
                                                            return [2 /*return*/];
                                                        }
                                                        buffer = cssFileBasename === "dsfr.min.css"
                                                            ? rawDsfrMinCssCodeBuffer
                                                            : rawDsfrCssCodeBuffer;
                                                        _b = (_a = Buffer).compare;
                                                        return [4 /*yield*/, (0, promises_1.readFile)(cssFilePath)];
                                                    case 2:
                                                        if (_b.apply(_a, [_c.sent(), buffer]) === 0) {
                                                            return [2 /*return*/];
                                                        }
                                                        hasChanged = true;
                                                        return [4 /*yield*/, (0, promises_1.writeFile)(cssFilePath, buffer)];
                                                    case 3:
                                                        _c.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }))];
                                });
                            });
                        }))];
                case 6:
                    _e.sent();
                    // NOTE: Deliberately outside of the `hasChanged` guard below.
                    // copy-dsfr-to-public builds its keep list from the url() of the dsfr.min.css it
                    // finds in node_modules, then early returns on every later run as long as
                    // public/dsfr/version.txt matches the @gouvfr/dsfr version. So once it has run
                    // against an already trimmed stylesheet, public/dsfr is frozen on that asset subset
                    // and growing the component set later can never bring the missing files back.
                    // Copying them ourselves also makes a purged public/dsfr repairable when the CSS
                    // itself did not change.
                    return [4 /*yield*/, (function copyUsedDsfrAssetsToStatic() {
                            return __awaiter(this, void 0, void 0, function () {
                                var dsfrDirPath_static;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (commandContext.spaParams === undefined) {
                                                return [2 /*return*/];
                                            }
                                            dsfrDirPath_static = commandContext.spaParams.dsfrDirPath_static;
                                            return [4 /*yield*/, Promise.all(getReferencedAssetRelativePaths({
                                                    "rawCssCode": rawDsfrMinCssCodeBuffer.toString("utf8")
                                                }).map(function (assetRelativePath) { return __awaiter(_this, void 0, void 0, function () {
                                                    var pathSegments, srcFilePath;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                pathSegments = assetRelativePath.split("/");
                                                                srcFilePath = path_1.join.apply(void 0, __spreadArray([commandContext.dsfrDirPath], __read(pathSegments), false));
                                                                return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)(srcFilePath)];
                                                            case 1:
                                                                if (!(_a.sent())) {
                                                                    return [2 /*return*/];
                                                                }
                                                                return [4 /*yield*/, (0, promises_1.cp)(srcFilePath, path_1.join.apply(void 0, __spreadArray([dsfrDirPath_static], __read(pathSegments), false)))];
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
                        })()];
                case 7:
                    // NOTE: Deliberately outside of the `hasChanged` guard below.
                    // copy-dsfr-to-public builds its keep list from the url() of the dsfr.min.css it
                    // finds in node_modules, then early returns on every later run as long as
                    // public/dsfr/version.txt matches the @gouvfr/dsfr version. So once it has run
                    // against an already trimmed stylesheet, public/dsfr is frozen on that asset subset
                    // and growing the component set later can never bring the missing files back.
                    // Copying them ourselves also makes a purged public/dsfr repairable when the CSS
                    // itself did not change.
                    _e.sent();
                    // NOTE: Deliberately outside of the `hasChanged` guard below. The rewrite is
                    // idempotent, and inside the guard a stale or hand reverted hash could never be
                    // repaired as long as dsfr.min.css itself did not change.
                    return [4 /*yield*/, (function addHashQueryParameterInIndexHtml() {
                            var _a;
                            return __awaiter(this, void 0, void 0, function () {
                                var htmlFilePath, html, modifiedHtml;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            htmlFilePath = (_a = commandContext.spaParams) === null || _a === void 0 ? void 0 : _a.htmlFilePath;
                                            if (htmlFilePath === undefined) {
                                                return [2 /*return*/];
                                            }
                                            return [4 /*yield*/, (0, promises_1.readFile)(htmlFilePath)];
                                        case 1:
                                            html = (_b.sent()).toString("utf8");
                                            modifiedHtml = (0, modifyHtmlHrefs_1.modifyHtmlHrefs)({
                                                "html": html,
                                                "getModifiedHref": function (href) {
                                                    if (!href.includes("dsfr.min.css")) {
                                                        return href;
                                                    }
                                                    var _a = __read(href.split("?"), 1), urlWithoutQuery = _a[0];
                                                    return "".concat(urlWithoutQuery, "?hash=").concat((0, fnv1aHashToHex_1.fnv1aHashToHex)(rawDsfrMinCssCodeBuffer.toString("utf8")));
                                                }
                                            }).modifiedHtml;
                                            if (modifiedHtml === html) {
                                                return [2 /*return*/];
                                            }
                                            return [4 /*yield*/, (0, promises_1.writeFile)(htmlFilePath, Buffer.from(modifiedHtml, "utf8"))];
                                        case 2:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })()];
                case 8:
                    // NOTE: Deliberately outside of the `hasChanged` guard below. The rewrite is
                    // idempotent, and inside the guard a stale or hand reverted hash could never be
                    // repaired as long as dsfr.min.css itself did not change.
                    _e.sent();
                    if (!hasChanged) {
                        log === null || log === void 0 ? void 0 : log("No change since last run");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Promise.all([
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
                case 9:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
if (require.main === module) {
    main(process.argv.slice(2));
}
//# sourceMappingURL=only-include-css-of-used-components.js.map