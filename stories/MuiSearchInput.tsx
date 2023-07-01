import React, { type ReactNode } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { cx } from "../dist/tools/cx";

export type SearchResult = {
    children: ReactNode;
    href: string;
};

export type MuiSearchInputProps = {
    className: string;
    id: string;
    placeholder: string;
    type: "search";

    value: string;
    onChange: (newValue: string) => void;
    results: SearchResult[];
};

const options = ["Option 1", "Option 2"];

export function MuiSearchInput(props: MuiSearchInputProps) {
    const {
        className,
        id,
        placeholder,
        type
        /*
        value,
        onChange,
        results,
        */
    } = props;

    return (
        <Autocomplete
            style={{ "width": "100%" }}
            id={id}
            options={options}
            renderInput={params => (
                <div ref={params.InputProps.ref}>
                    <input
                        {...params.inputProps}
                        className={cx(params.inputProps.className, className)}
                        placeholder={placeholder}
                        type={type}
                    />
                </div>
            )}
        />
    );
}
