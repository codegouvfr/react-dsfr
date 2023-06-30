"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "./Header";
import { fr } from "../fr";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";
export function SearchButton(props) {
    const { searchInputId, onClick: onClick_props } = props;
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState("");
    const [resetInputValue, setResetInputValue] = useState(() => () => {
        /* do nothing */
    });
    const [focusInputElement, setFocusInputElement] = useState(() => () => {
        /* do nothing */
    });
    const [isInputFocused, setIsInputFocused] = useState(false);
    const onClick = useConstCallback(() => {
        if (inputValue === "") {
            focusInputElement();
            return;
        }
        onClick_props === null || onClick_props === void 0 ? void 0 : onClick_props(inputValue);
        resetInputValue();
    });
    useEffect(() => {
        const inputElement = document.getElementById(searchInputId);
        assert(inputElement !== null, `${searchInputId} should be mounted`);
        assert("value" in inputElement && typeof inputElement.value === "string", `${searchInputId} is not an HTML input`);
        assert(is(inputElement));
        setInputValue(inputElement.value);
        const cleanups = [];
        inputElement.addEventListener("input", (() => {
            const callback = () => setInputValue(inputElement.value);
            cleanups.push(() => inputElement.removeEventListener("input", callback));
            return callback;
        })());
        const resetInputValue = () => {
            inputElement.value = "";
            inputElement.dispatchEvent(new Event("input"));
        };
        setResetInputValue(() => resetInputValue);
        setFocusInputElement(() => () => inputElement.focus());
        inputElement.addEventListener("keydown", (() => {
            const callback = (event) => {
                if (event.key !== "Escape") {
                    return;
                }
                resetInputValue();
                inputElement.blur();
            };
            cleanups.push(() => inputElement.removeEventListener("keydown", callback));
            return callback;
        })());
        if (onClick_props === undefined) {
            inputElement.addEventListener("focus", (() => {
                const callback = () => setIsInputFocused(true);
                cleanups.push(() => inputElement.removeEventListener("focus", callback));
                return callback;
            })());
            inputElement.addEventListener("blur", (() => {
                const callback = () => setIsInputFocused(false);
                cleanups.push(() => inputElement.removeEventListener("blur", callback));
                return callback;
            })());
        }
        else {
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
        }
        return () => {
            cleanups.forEach(cleanup => cleanup());
        };
    }, [searchInputId, onClick_props]);
    if (onClick_props === undefined && (isInputFocused || inputValue !== "")) {
        return null;
    }
    return (React.createElement("button", { className: fr.cx("fr-btn"), title: t("search"), onClick: onClick }, t("search")));
}
//# sourceMappingURL=SearchButton.js.map