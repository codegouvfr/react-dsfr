"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "./Header";
import { fr } from "../fr";
import { assert } from "tsafe/assert";
import { is } from "tsafe/is";

export type SearchButtonProps = {
    searchInputId: string;
    onClick: ((text: string) => void) | undefined;
};

export function SearchButton(props: SearchButtonProps) {
    const { searchInputId, onClick } = props;

    const { t } = useTranslation();

    const [inputValue, setInputValue] = useState("");

    const [resetInputValue, setResetInputValue] = useState<() => void>(() => () => {
        /* do nothing */
    });
    const [focusInputElement, setFocusInputElement] = useState<() => void>(() => () => {
        /* do nothing */
    });

    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        console.log({ searchInputId });

        const inputElement = document.getElementById(searchInputId);

        assert(inputElement !== null, `${searchInputId} should be mounted`);
        assert(
            "value" in inputElement && typeof inputElement.value === "string",
            `${searchInputId} is not an HTML input`
        );

        assert(is<HTMLInputElement>(inputElement));

        setInputValue(inputElement.value);

        inputElement.addEventListener("input", () => setInputValue(inputElement.value));

        setResetInputValue(() => () => {
            inputElement.value = "";
            inputElement.dispatchEvent(new Event("input"));
        });
        setFocusInputElement(() => () => inputElement.focus());

        if (onClick !== undefined) {
            return;
        }

        inputElement.addEventListener("focus", () => {
            setIsInputFocused(true);
        });

        inputElement.addEventListener("blur", () => {
            setIsInputFocused(false);
        });
    }, [searchInputId, onClick]);

    if (onClick === undefined && (isInputFocused || inputValue !== "")) {
        return null;
    }

    return (
        <button
            className={fr.cx("fr-btn")}
            title={t("search")}
            onClick={() => {
                if (inputValue === "") {
                    focusInputElement();
                    return;
                }

                onClick?.(inputValue);
                resetInputValue();
            }}
        >
            {t("search")}
        </button>
    );
}
