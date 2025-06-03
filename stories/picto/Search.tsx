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
    .create(() => ({
        "root": {
            "display": "flex",
            "paddingTop": fr.spacing("6v")
        },
        "searchBar": {
            "flex": 1
        },
    }));
