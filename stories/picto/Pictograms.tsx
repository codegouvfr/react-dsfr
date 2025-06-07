import { createElement, useState } from "react";
import { Source } from "@storybook/components";
import { Search } from "./Search";
import { useConst } from "powerhooks/useConst";
import { Evt } from "evt";
import { tss } from "tss-react";
import { fr } from "../../dist/fr";
import { cx } from "../../dist/tools/cx";
import * as Picto from "../../dist/picto";
import { createModal } from "../../dist/Modal";
import { Tooltip } from "../../dist/Tooltip";
import CallOut from "../../dist/CallOut";
import { getLink } from "../../dist/link";
import { useColors } from "../../dist/useColors";

const pictogrameEntries = Object.entries(Picto);

const modal = createModal({
    id: "foo-modal",
    isOpenedByDefault: false
});

export function Pictograms() {
    const [search, setSearch] = useState("");

    const { css, classes } = useStyles();

    const filteredPictograms = pictogrameEntries.filter(([key]) =>
        key.toLowerCase().includes(search.toLowerCase())
    );
    const [selectedPicto, setSelectedPicto] = useState<{ key: string } | null>(null);

    const evtSearchAction = useConst(() => Evt.create<"scroll to">());

    const { Link } = getLink();

    return (
        <div>
            <CallOut
                className={css({ "marginBottom": 0 })}
                title="Pictograms"
                iconId="fr-icon-search-line"
                buttonProps={{
                    "onClick": () => evtSearchAction.post("scroll to"),
                    "children": "Start searching"
                }}
            >
                This tool help you find the perfect DSFR compliant pictogram for your project.
                <br />
                <br />
                <Link
                    target="_blank"
                    href="https://www.systeme-de-design.gouv.fr/fondamentaux/pictogramme"
                >
                    Learn more about pictograms
                </Link>
            </CallOut>
            <Search evtAction={evtSearchAction} onSearchChange={setSearch} search={search} />
            <h3 style={{ marginTop: fr.spacing("6v") }}>
                {search === ""
                    ? `${filteredPictograms.length} pictograms`
                    : `Found ${filteredPictograms.length} pictogram${
                          filteredPictograms.length > 1 ? "s" : ""
                      }`}
            </h3>
            <div className={classes.pictogramsWrapper}>
                <div className={classes.pictogramsContainer}>
                    {filteredPictograms.map(([key, PictoComponent]) => (
                        <div
                            key={key}
                            className={classes.pictoTile}
                            onClick={() => {
                                setSelectedPicto({ key });
                                modal.open();
                            }}
                        >
                            {typeof PictoComponent === "function" && (
                                <PictoComponent fontSize="inherit" />
                            )}
                            <div className={classes.pictoTileLabel}>{key}</div>
                        </div>
                    ))}
                </div>
            </div>
            <PictogramsModal selectedPicto={selectedPicto} />
        </div>
    );
}

const PictogramsModal = ({ selectedPicto }: { selectedPicto: { key: string } | null }) => {
    const { isDark } = useColors();
    const { classes } = useStyles();

    if (selectedPicto === null) {
        return null;
    }

    return (
        <modal.Component title={selectedPicto?.key ?? "Pictogramme"}>
            <div style={{ textAlign: "center" }}>
                <Source
                    language="tsx"
                    code={`import ${selectedPicto.key} from "@codegouvfr/react-dsfr/picto/${selectedPicto.key}";`}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginTop: fr.spacing("2v")
                    }}
                >
                    <div>
                        {selectedPicto &&
                            createElement(Picto[selectedPicto.key] as React.ElementType, {
                                className: cx(
                                    classes.pictogramsPlaceholder,
                                    isDark
                                        ? classes.pictogramsPlaceholderDark
                                        : classes.pictogramsPlaceholderLight
                                ),
                                fontSize: 210
                            })}
                    </div>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                marginTop: fr.spacing("2v"),
                                fontSize: "1.5rem",
                                gap: fr.spacing("4v")
                            }}
                        >
                            <Tooltip kind="hover" title="fontSize small">
                                <div
                                    style={{
                                        padding: fr.spacing("1w")
                                    }}
                                >
                                    {createElement(Picto[selectedPicto.key] as React.ElementType, {
                                        fontSize: "small"
                                    })}
                                </div>
                            </Tooltip>
                            <Tooltip kind="hover" title="fontSize medium">
                                <div
                                    style={{
                                        padding: fr.spacing("1w")
                                    }}
                                >
                                    {createElement(Picto[selectedPicto.key] as React.ElementType, {
                                        fontSize: "medium"
                                    })}
                                </div>
                            </Tooltip>
                            <Tooltip kind="hover" title="fontSize large">
                                <div
                                    style={{
                                        padding: fr.spacing("1w")
                                    }}
                                >
                                    {createElement(Picto[selectedPicto.key] as React.ElementType, {
                                        fontSize: "large"
                                    })}
                                </div>
                            </Tooltip>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                marginTop: fr.spacing("2v"),
                                fontSize: "1.5rem",
                                gap: fr.spacing("4v")
                            }}
                        >
                            <Tooltip kind="hover" title="color green-emeraude">
                                <div
                                    style={{
                                        padding: fr.spacing("1w")
                                    }}
                                >
                                    {createElement(Picto[selectedPicto.key] as React.ElementType, {
                                        fontSize: "large",
                                        color: "green-emeraude"
                                    })}
                                </div>
                            </Tooltip>
                            <Tooltip kind="hover" title="color yellow-moutarde">
                                <div
                                    style={{
                                        padding: fr.spacing("1w")
                                    }}
                                >
                                    {createElement(Picto[selectedPicto.key] as React.ElementType, {
                                        fontSize: "large",
                                        color: "yellow-moutarde"
                                    })}
                                </div>
                            </Tooltip>
                            <Tooltip kind="hover" title="color blue-ecume">
                                <div
                                    style={{
                                        padding: fr.spacing("1w")
                                    }}
                                >
                                    {createElement(Picto[selectedPicto.key] as React.ElementType, {
                                        fontSize: "large",
                                        color: "blue-ecume"
                                    })}
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </modal.Component>
    );
};

const useStyles = tss.withName({ Pictograms }).create(() => ({
    pictoTile: {
        textAlign: "center",
        width: 150,
        cursor: "pointer",
        "&:hover": {
            borderRadius: 8,
            backgroundColor: "var(--background-default-grey-hover)"
        }
    },
    pictoTileLabel: {
        marginTop: 8,
        fontSize: 12,
        padding: "0 4px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    pictogramsContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: fr.spacing("4v"),
        fontSize: 72
    },
    pictogramsWrapper: {
        padding: fr.spacing("1w"),
        borderRadius: "8px",
        backgroundColor: "var(--background-default-grey)"
    },
    pictogramsPlaceholder: {
        backgroundSize: "30px 30px",
        backgroundColor: "transparent",
        backgroundPosition: "0px 0px, 0px 15px, 15px -15px, -15px 0px"
    },
    pictogramsPlaceholderLight: {
        backgroundImage:
            "linear-gradient(45deg, rgb(230, 230, 230) 25%, transparent 25%), " +
            "linear-gradient(-45deg, rgb(230, 230, 230) 25%, transparent 25%), " +
            "linear-gradient(45deg, transparent 75%, rgb(230, 230, 230) 75%), " +
            "linear-gradient(-45deg, transparent 75%, rgb(230, 230, 230) 75%)"
    },
    pictogramsPlaceholderDark: {
        backgroundImage:
            "linear-gradient(45deg, rgb(89, 89, 89) 25%, transparent 25%), " +
            "linear-gradient(-45deg, rgb(89, 89, 89) 25%, transparent 25%), " +
            "linear-gradient(45deg, transparent 75%, rgb(89, 89, 89) 75%), " +
            "linear-gradient(-45deg, transparent 75%, rgb(89, 89, 89) 75%)"
    }
}));
