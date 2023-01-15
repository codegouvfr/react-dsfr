import React, { useState } from "react";
import { makeStyles } from "./makeStyles";
import { SearchBar } from "../../dist/SearchBar";
import { Button } from "../../dist/Button";
import { fr } from "../../dist/fr";
import { NonPostableEvt } from "evt";
import { useEvt } from "evt/hooks";

type Props = {
    className?: string;
    search: string;
    onSearchChange: (search: string) => void;
    evtAction: NonPostableEvt<"scroll to">;
};

export function Search(props: Props) {
    const { className, search, onSearchChange, evtAction } = props;

    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
    const [searchBarWrapperElement, setSearchBarWrapperElement] = useState<HTMLDivElement | null>(
        null
    );

    useEvt(
        ctx => {
            evtAction.attach(
                action => action === "scroll to",
                ctx,
                () => {
                    inputElement?.focus();
                    searchBarWrapperElement?.scrollIntoView({
                        "behavior": "smooth",
                        "block": "start"
                    });
                }
            );
        },
        [evtAction, inputElement, searchBarWrapperElement]
    );

    const { classes, cx } = useStyles();

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    return (
        <div
            className={cx(classes.root, className)}
            ref={searchBarWrapperElement => setSearchBarWrapperElement(searchBarWrapperElement)}
        >
            <SearchBar
                className={classes.searchBar}
                label="Filter by color code (e.g. #c9191e), CSS variable name (e.g. --text-active-red-marianne) or something else (e.g. marianne)..."
                nativeInputProps={{
                    "ref": inputElement => setInputElement(inputElement),
                    "value": search,
                    "onChange": event => onSearchChange(event.target.value)
                }}
            />
            <Button
                className={classes.filterButton}
                iconId={isFiltersOpen ? "ri-arrow-up-s-fill" : "ri-arrow-down-s-fill"}
                iconPosition="right"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
                Filters
            </Button>
        </div>
    );
}

const useStyles = makeStyles({ "name": { Search } })(theme => ({
    "root": {
        "display": "flex",
        "paddingTop": fr.spacing("6v")
    },
    "searchBar": {
        "flex": 1
    },
    "filterButton": {
        "backgroundColor": theme.decisions.background.actionLow.blueFrance.default,
        "&&&:hover": {
            "backgroundColor": theme.decisions.background.actionLow.blueFrance.hover
        },
        "color": theme.decisions.text.actionHigh.blueFrance.default,
        "marginLeft": fr.spacing("4v")
    }
}));
