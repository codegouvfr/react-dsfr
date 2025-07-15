"use client";
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
import React, { memo, forwardRef, useId, useState, useEffect } from "react";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import { useCallbackFactory } from "./tools/powerhooks/useCallbackFactory";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tabs> */
export const Tabs = memo(forwardRef((props, ref) => {
    const { id: id_props, className, label, classes = {}, tabs, selectedTabId, onTabChange, children, style } = props, rest = __rest(props, ["id", "className", "label", "classes", "tabs", "selectedTabId", "onTabChange", "children", "style"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-tabs",
        "explicitlyProvidedId": id_props
    });
    const getSelectedTabIndex = () => {
        const index = tabs.findIndex(tab => { var _a; return "content" in tab ? (_a = tab.isDefault) !== null && _a !== void 0 ? _a : false : tab.tabId === selectedTabId; });
        return index === -1 ? 0 : index;
    };
    const buttonRefs = React.useRef([]);
    const [selectedTabIndex, setSelectedTabIndex] = useState(getSelectedTabIndex);
    useEffect(() => {
        if (selectedTabId === undefined) {
            return;
        }
        setSelectedTabIndex(getSelectedTabIndex());
    }, [selectedTabId]);
    const onTabClickFactory = useCallbackFactory(([tabIndex]) => {
        if (selectedTabId === undefined) {
            onTabChange === null || onTabChange === void 0 ? void 0 : onTabChange({
                tabIndex,
                "tab": tabs[tabIndex]
            });
        }
        else {
            onTabChange(tabs[tabIndex].tabId);
        }
    });
    const onKeyboardNavigation = (event) => {
        var _a, _b;
        if (selectedTabId !== undefined) {
            let targetIndex = selectedTabIndex;
            switch (event.key) {
                case "ArrowRight":
                    targetIndex = selectedTabIndex < tabs.length - 1 ? selectedTabIndex + 1 : 0;
                    break;
                case "ArrowLeft":
                    targetIndex =
                        selectedTabIndex === 0 ? tabs.length - 1 : selectedTabIndex - 1;
                    break;
                case "Home":
                    targetIndex = 0;
                    break;
                case "End":
                    targetIndex = tabs.length - 1;
                    break;
            }
            (_a = buttonRefs.current[targetIndex]) === null || _a === void 0 ? void 0 : _a.click();
            (_b = buttonRefs.current[targetIndex]) === null || _b === void 0 ? void 0 : _b.focus();
        }
    };
    const { getPanelId, getTabId } = (function useClosure() {
        const id = useId();
        const getPanelId = (tabIndex) => `tabpanel-${id}-${tabIndex}-panel`;
        const getTabId = (tabIndex) => `tabpanel-${id}-${tabIndex}`;
        return {
            getPanelId,
            getTabId
        };
    })();
    return (React.createElement("div", Object.assign({ id: id, className: cx(fr.cx("fr-tabs"), className), ref: ref, style: style }, rest),
        React.createElement("ul", { className: fr.cx("fr-tabs__list"), role: "tablist", "aria-label": label, onKeyDownCapture: e => onKeyboardNavigation(e) }, tabs.map(({ label, iconId, disabled }, tabIndex) => (React.createElement("li", { key: tabIndex, role: "presentation" },
            React.createElement("button", { ref: button => (buttonRefs.current[tabIndex] = button), id: getTabId(tabIndex), type: "button", className: cx(fr.cx("fr-tabs__tab", iconId, "fr-tabs__tab--icon-left"), classes.tab), tabIndex: tabIndex === selectedTabIndex ? 0 : -1, role: "tab", "aria-selected": tabIndex === selectedTabIndex, "aria-controls": getPanelId(tabIndex), onClick: onTabClickFactory(tabIndex), disabled: disabled }, label))))),
        selectedTabId === undefined ? (tabs.map(({ content }, tabIndex) => (React.createElement("div", { key: tabIndex, id: getPanelId(tabIndex), className: cx(fr.cx("fr-tabs__panel", tabIndex === selectedTabIndex && "fr-tabs__panel--selected"), classes.panel), role: "tabpanel", "aria-labelledby": getTabId(tabIndex), tabIndex: 0 }, content)))) : (React.createElement("div", { id: getPanelId(selectedTabIndex), className: cx(fr.cx("fr-tabs__panel", "fr-tabs__panel--selected"), classes.panel), role: "tabpanel", "aria-labelledby": getTabId(selectedTabIndex), tabIndex: 0 }, children))));
}));
Tabs.displayName = symToStr({ Tabs });
export default Tabs;
//# sourceMappingURL=Tabs.js.map