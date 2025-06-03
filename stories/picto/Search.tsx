import { useState } from "react";
import { tss } from "tss-react";
import { SearchBar } from "../../dist/SearchBar";
import { fr } from "../../dist/fr";
import { NonPostableEvt } from "evt";
import { useEvt } from "evt/hooks";

export type Props = {
    className?: string;
    search: string;
    onSearchChange: (search: string) => void;
    evtAction: NonPostableEvt<"scroll to">;
};

export function Search(props: Props) {
    const {
        className,
        search,
        onSearchChange,
        evtAction,
    } = props;

    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
    const [searchBarWrapperElement, setSearchBarWrapperElement] = useState<HTMLDivElement | null>(
        null
    );
    const [filtersWrapperDivElement] = useState<HTMLDivElement | null>(
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

    const { classes, cx } = useStyles({
        "filterWrapperMaxHeight": filtersWrapperDivElement?.scrollHeight ?? 0
    });

    return (
        <>
            <div
                className={cx(classes.root, className)}
                ref={searchBarWrapperElement => setSearchBarWrapperElement(searchBarWrapperElement)}
            >
                <SearchBar
                    className={classes.searchBar}
                    label="Filter by name"
                    renderInput={({ className, id, placeholder, type }) => (
                        <input
                            ref={setInputElement}
                            value={search}
                            onChange={event => onSearchChange(event.target.value)}
                            className={className}
                            id={id}
                            placeholder={placeholder}
                            type={type}
                        />
                    )}
                />
            </div>
        </>
    );
}

const useStyles = tss
    .withName({ Search })
    .withParams<{ filterWrapperMaxHeight: number }>()
    .create(({ filterWrapperMaxHeight }) => ({
        "root": {
            "display": "flex",
            "paddingTop": fr.spacing("6v")
        },
        "searchBar": {
            "flex": 1
        },
        "filterButton": {
            "backgroundColor": fr.colors.decisions.background.actionLow.blueFrance.default,
            "&&&:hover": {
                "backgroundColor": fr.colors.decisions.background.actionLow.blueFrance.hover
            },
            "color": fr.colors.decisions.text.actionHigh.blueFrance.default,
            "marginLeft": fr.spacing("4v")
        },
        "filtersWrapper": {
            "transition": "max-height 0.2s ease-out",
            "maxHeight": filterWrapperMaxHeight,
            "overflow": "hidden",
            "display": "flex",
            "& > *": {
                "flex": 1,
                ...fr.spacing("padding", {
                    "rightLeft": "4v"
                })
            },
            ...fr.spacing("margin", {
                "topBottom": "9v"
            })
        }
    }));
