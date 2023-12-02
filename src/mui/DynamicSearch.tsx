import React, { useState, useMemo, type ReactNode } from "react";
import { useStyles } from "tss-react/dsfr";
import { assert } from "tsafe/assert";
import Autocomplete from "@mui/material/Autocomplete";
import { fr } from "../fr";
import Popper from "@mui/material/Popper";
import { useRerenderOnChange, createStatefulObservable } from "../tools/StatefulObservable";
import { useConst } from "../tools/powerhooks/useConst";

type DynamicSearchProps = {
    className?: string;
    classes?: Partial<Record<"root" | "overlay", string>>;
    id?: string;
    placeholder?: string;
    type?: "search";
    search: (searchString: string) => Promise<DynamicSearchProps.SearchResult[]>;
    debounceDelay?: number;
};

namespace DynamicSearchProps {
    export type SearchResult = {
        id: string;
        searchResult: string;
        group?: ReactNode;
        onClick: () => void;
    };
}

export function DynamicSearch(props: DynamicSearchProps) {
    const { className, classes, id, placeholder, type, search, debounceDelay = 500 } = props;

    const { css, cx } = useStyles();

    const [results, setResults] = useState<DynamicSearchProps.SearchResult[]>([]);

    const getResult = (id: string) => {
        const result = results.find(result => result.id === id);
        assert(result !== undefined);
        return result;
    };

    const [isOpen, setIsOpen] = useState(false);

    const { useDebounce, obsIsDebouncing } = useMemo(
        () => createUseDebounce({ "delay": debounceDelay }),
        [debounceDelay]
    );

    const { isLoading, setIsSearching } = (function useClosure() {
        useRerenderOnChange(obsIsDebouncing);

        const [isSearching, setIsSearching] = useState(false);

        return {
            "isLoading": isSearching || obsIsDebouncing.current,
            setIsSearching
        };
    })();

    const obsSearchString = useConst(() => createStatefulObservable(() => ""));

    useRerenderOnChange(obsSearchString);

    useDebounce(() => {
        const searchString = obsSearchString.current;

        if (searchString === "") {
            setResults([]);
            return;
        }

        let isActive = true;

        (async () => {
            setResults([]);
            setIsSearching(true);

            const result = await search(searchString);

            if (!isActive) {
                return;
            }

            setResults(result);
            setIsSearching(false);
        })();

        return () => {
            isActive = false;
        };
    }, [obsSearchString.current]);

    return (
        <Autocomplete
            id={id}
            freeSolo
            PopperComponent={props => (
                <Popper
                    {...props}
                    style={{
                        ...props.style,
                        "width": undefined
                    }}
                    className={cx(
                        props.className,
                        css({
                            "zIndex": 100000,
                            "width": "40em",
                            [fr.breakpoints.down("lg")]: {
                                "width": "calc(100vw - 3rem)"
                            }
                        }),
                        classes?.overlay
                    )}
                    placement="bottom-start"
                />
            )}
            fullWidth
            onInputChange={(...[, newValue]) => {
                obsSearchString.current = newValue;
                if (newValue === "") {
                    setIsOpen(false);
                }
            }}
            blurOnSelect
            onChange={(...[, id]) => {
                if (id === null) {
                    return;
                }
                getResult(id).onClick();
            }}
            value={null}
            options={results.map(result => result.id)}
            filterOptions={ids => ids} // No filtering
            getOptionLabel={() => ""}
            // @ts-expect-error: We return a ReactNode instead of a string
            // but it's okay as long as we always return the same object reference
            // for a given group.
            groupBy={id => {
                const index = results.findIndex(result => result.id === id);

                const getPrefix = (index: number): ReactNode => {
                    const result = results[index];

                    if (result.group !== undefined) {
                        return result.group;
                    }

                    if (index === 0) {
                        return "";
                    }

                    return getPrefix(index - 1);
                };

                return getPrefix(index);
            }}
            renderOption={(liProps, id) => (
                <li {...liProps} id={id} key={id}>
                    {getResult(id).children}
                    <div>
                        <span className={cx(fr.cx("fr-text--lead"), classes.resultTitle)}>
                            <HighlightMatches match={search} value={title} />
                        </span>
                        {content && (
                            <span className={classes.resultContent}>
                                <HighlightMatches match={search} value={content} bold />
                            </span>
                        )}
                    </div>
                </li>
            )}
            noOptionsText={"no result"}
            loadingText={"loading"}
            loading={isLoading}
            handleHomeEndKeys
            isOptionEqualToValue={() => false}
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
            open={isOpen}
            onOpen={() => {
                const searchString = obsSearchString.current;

                if (searchString === "") {
                    return;
                }

                setIsOpen(true);
            }}
            onClose={() => setIsOpen(false)}
        />
    );
}
