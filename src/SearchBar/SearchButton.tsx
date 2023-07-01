"use client";

import React, { useEffect, useState, useReducer } from "react";
import { useTranslation } from "./SearchBar";
import { fr } from "../fr";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
import { useConstCallback } from "../tools/powerhooks/useConstCallback";

export type SearchButtonProps = {
    searchInputId: string;
    onClick: ((text: string) => void) | undefined;
};

export function SearchButton(props: SearchButtonProps) {
    const { searchInputId, onClick: onClick_props } = props;

    const { t } = useTranslation();

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [getInputValue, setGetInputValue] = useState(() => () => "");

    const [resetInputValue, setResetInputValue] = useState<() => void>(() => () => {
        /* do nothing */
    });
    const [focusInputElement, setFocusInputElement] = useState<() => void>(() => () => {
        /* do nothing */
    });

    const [isInputFocused, setIsInputFocused] = useState(false);

    const onClick = useConstCallback(() => {
        const inputValue = getInputValue();

        if (inputValue === "") {
            focusInputElement();
            return;
        }

        onClick_props?.(inputValue);
        resetInputValue();
    });

    const isControlledByUser = onClick_props === undefined;

    useEffect(() => {
        const inputElement = document.getElementById(searchInputId);

        assert(inputElement !== null, `${searchInputId} should be mounted`);
        assert(
            "value" in inputElement && typeof inputElement.value === "string",
            `${searchInputId} is not an HTML input`
        );

        assert(is<HTMLInputElement>(inputElement));

        setGetInputValue(() => () => inputElement.value);

        const cleanups: (() => void)[] = [];

        inputElement.addEventListener(
            "input",
            (() => {
                const callback = () => {
                    forceUpdate();
                };

                cleanups.push(() => inputElement.removeEventListener("input", callback));

                return callback;
            })()
        );

        inputElement.addEventListener(
            "keydown",
            (() => {
                const callback = (event: KeyboardEvent) => {
                    if (event.key !== "Escape") {
                        return;
                    }

                    forceUpdate();
                };

                cleanups.push(() => inputElement.removeEventListener("keydown", callback));

                return callback;
            })()
        );

        const resetInputValue = () => {
            inputElement.value = "";
            inputElement.dispatchEvent(new Event("input"));
        };

        setResetInputValue(() => resetInputValue);

        setFocusInputElement(() => () => inputElement.focus());

        if (isControlledByUser) {
            inputElement.addEventListener(
                "focus",
                (() => {
                    const callback = () => setIsInputFocused(true);

                    cleanups.push(() => inputElement.removeEventListener("focus", callback));

                    return callback;
                })()
            );

            inputElement.addEventListener(
                "blur",
                (() => {
                    const callback = () => setIsInputFocused(false);

                    cleanups.push(() => inputElement.removeEventListener("blur", callback));

                    return callback;
                })()
            );
        }

        if (!isControlledByUser) {
            inputElement.addEventListener(
                "keydown",
                (() => {
                    const callback = (event: KeyboardEvent): void => {
                        if (event.key !== "Enter") {
                            return;
                        }

                        onClick();
                        inputElement.blur();
                    };

                    cleanups.push(() => inputElement.removeEventListener("keydown", callback));

                    return callback;
                })()
            );

            inputElement.addEventListener(
                "keydown",
                (() => {
                    const callback = (event: KeyboardEvent) => {
                        if (event.key !== "Escape") {
                            return;
                        }

                        resetInputValue();
                        inputElement.blur();
                    };

                    cleanups.push(() => inputElement.removeEventListener("keydown", callback));

                    return callback;
                })()
            );
        }

        return () => {
            cleanups.forEach(cleanup => cleanup());
        };
    }, [searchInputId, isControlledByUser]);

    if (onClick_props === undefined && (isInputFocused || getInputValue() !== "")) {
        return null;
    }

    return (
        <button className={fr.cx("fr-btn")} title={t("label")} onClick={onClick}>
            {t("label")}
        </button>
    );
}
