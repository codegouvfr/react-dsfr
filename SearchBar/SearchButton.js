"use client";
import React, { useEffect, useState, useReducer } from "react";
import { useTranslation } from "./SearchBar";
import { fr } from "../fr";
import { assert, is } from "tsafe/assert";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
import { observeInputValue } from "../tools/observeInputValue";
import { id } from "tsafe/id";
export function SearchButton(props) {
    const { searchInputId, clearInputOnSearch, allowEmptySearch, onClick: onClick_props, id: id_props } = props;
    const { t } = useTranslation();
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [{ focusInputElement, getInputValue, resetInputValue, getIsInputFocused }, setInputApi] = useState(() => ({
        "getInputValue": id(() => ""),
        "resetInputValue": id(() => {
            /* do nothing */
        }),
        "focusInputElement": id(() => {
            /* do nothing */
        }),
        "getIsInputFocused": id(() => false)
    }));
    const onClick = useConstCallback(() => {
        const inputValue = getInputValue();
        if (!allowEmptySearch && inputValue === "") {
            focusInputElement();
            return;
        }
        onClick_props === null || onClick_props === void 0 ? void 0 : onClick_props(inputValue);
        if (clearInputOnSearch) {
            resetInputValue();
        }
    });
    const isControlledByUser = onClick_props === undefined;
    useEffect(() => {
        const inputElement = document.getElementById(searchInputId);
        assert(inputElement !== null, `${searchInputId} should be mounted`);
        assert("value" in inputElement && typeof inputElement.value === "string", `${searchInputId} is not an HTML input`);
        assert(is(inputElement));
        setInputApi({
            "focusInputElement": () => inputElement.focus(),
            "getInputValue": () => inputElement.value,
            "resetInputValue": () => (inputElement.value = ""),
            "getIsInputFocused": () => document.activeElement === inputElement
        });
        const cleanups = [];
        {
            const { cleanup } = observeInputValue({
                inputElement,
                "callback": () => forceUpdate()
            });
            cleanups.push(cleanup);
        }
        if (isControlledByUser) {
            inputElement.addEventListener("focus", (() => {
                const callback = () => forceUpdate();
                cleanups.push(() => inputElement.removeEventListener("focus", callback));
                return callback;
            })());
            inputElement.addEventListener("blur", (() => {
                const callback = () => forceUpdate();
                cleanups.push(() => inputElement.removeEventListener("blur", callback));
                return callback;
            })());
        }
        if (!isControlledByUser) {
            inputElement.addEventListener("keydown", (() => {
                const callback = (event) => {
                    if (event.key !== "Enter") {
                        return;
                    }
                    onClick();
                    inputElement.blur();
                };
                cleanups.push(() => inputElement.removeEventListener("keydown", callback));
                return callback;
            })());
            inputElement.addEventListener("keydown", (() => {
                const callback = (event) => {
                    if (event.key !== "Escape") {
                        return;
                    }
                    inputElement.blur();
                };
                cleanups.push(() => inputElement.removeEventListener("keydown", callback));
                return callback;
            })());
        }
        return () => {
            cleanups.forEach(cleanup => cleanup());
        };
    }, [searchInputId, isControlledByUser]);
    if (onClick_props === undefined && (getIsInputFocused() || getInputValue() !== "")) {
        return null;
    }
    return (React.createElement("button", { id: id_props, className: fr.cx("fr-btn"), title: t("label"), onClick: onClick, style: onClick_props !== undefined
            ? undefined
            : {
                "position": "absolute",
                "right": 0
            } }, t("label")));
}
//# sourceMappingURL=SearchButton.js.map