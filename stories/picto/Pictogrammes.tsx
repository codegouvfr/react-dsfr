import { createElement, useState } from "react";
import { Source } from "@storybook/components";
import { fr } from "../../dist/fr";
import { Search } from "./Search";
import { useConst } from "powerhooks/useConst";
import { Evt } from "evt";
import { createModal } from "../../dist/Modal";
import { Tooltip } from "../../dist/Tooltip";
import * as Picto from "../../dist/picto";

const pictogrameEntries = Object.entries(Picto);

const modal = createModal({
    id: "foo-modal", 
    isOpenedByDefault: false
});

export function Pictogrammes() {
    const [search, setSearch] = useState("");

    const filteredPictogrammes = pictogrameEntries.filter(([key]) =>
        key.toLowerCase().includes(search.toLowerCase())
    );
    const [selectedPicto, setSelectedPicto] = useState<{key: string} | null>(null);

    const evtSearchAction = useConst(() => Evt.create<"scroll to">());

    return (
        <div>
            <Search
                evtAction={evtSearchAction}
                onSearchChange={setSearch}
                search={search}
            />
            <h3 style={{ marginTop: fr.spacing("6v") }}>
                {
                    search === ""
                    ? `${filteredPictogrammes.length} pictogrammes`
                    : `Found ${filteredPictogrammes.length} pictogrammes matching your query`
                }
            </h3>
            <div style={{
                padding: fr.spacing("1w"),
                borderRadius: "8px",
                backgroundColor: "var(--background-default-grey)",
            }}>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: fr.spacing("4v"),
                    fontSize: 72,
                }}>
                    {
                        filteredPictogrammes.map(([key, PictoComponent]) => (
                            <div key={key} className="picto-tile" style={{ textAlign: "center", width: 150 }} onClick={() => {
                                    setSelectedPicto({key});
                                    modal.open();
                                }}
                            >
                                {
                                    typeof PictoComponent === "function" && <PictoComponent fontSize="inherit" />
                                }
                                <div style={{ marginTop: 8, fontSize: 12 }}>{key}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <modal.Component title={selectedPicto?.key ?? "Pictogramme"}>
                {
                    selectedPicto !== null &&
                    <>
                    <div style={{ textAlign: "center" }}>
                        <Source
                            language="tsx"
                            code={`import { ${selectedPicto.key} } from "@codegouvfr/react-dsfr/picto";`}
                        />
                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: fr.spacing("2v")
                        }}>
                            <div>
                                {
                                    selectedPicto && createElement(
                                        Picto[selectedPicto.key] as React.ElementType,
                                        {
                                            style: {
                                                backgroundSize: "30px 30px",
                                                backgroundColor: "transparent",
                                                backgroundPosition: "0px 0px, 0px 15px, 15px -15px, -15px 0px",
                                                backgroundImage: "linear-gradient(45deg, rgb(230, 230, 230) 25%, transparent 25%), linear-gradient(-45deg, rgb(230, 230, 230) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(230, 230, 230) 75%), linear-gradient(-45deg, transparent 75%, rgb(230, 230, 230) 75%)"
                                            },
                                            fontSize: 210
                                        }
                                    )
                                }
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                marginTop: fr.spacing("2v"),
                                fontSize: "1.5rem",
                                gap: fr.spacing("4v"),
                            }}>
                                <Tooltip
                                kind="hover"
                                title="small"
                                >
                                    <div style={{
                                        padding: fr.spacing("1w"),
                                    }}>
                                        {
                                            createElement(
                                                Picto[selectedPicto.key] as React.ElementType,
                                                {
                                                    fontSize: "small",
                                                }
                                            )
                                        }
                                    </div>
                                </Tooltip>
                                <Tooltip
                                kind="hover"
                                title="medium"
                                >
                                    <div style={{
                                        padding: fr.spacing("1w"),
                                    }}>
                                        {
                                            createElement(
                                                Picto[selectedPicto.key] as React.ElementType,
                                                {
                                                    fontSize: "medium"
                                                }
                                            )
                                        }
                                    </div>
                                </Tooltip>
                                <Tooltip
                                kind="hover"
                                title="large"
                                >
                                    <div style={{
                                        padding: fr.spacing("1w"),
                                    }}>
                                        {
                                            createElement(
                                                Picto[selectedPicto.key] as React.ElementType,
                                                {
                                                    fontSize: "large",
                                                }
                                            )
                                        }
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    </>
            }
            </modal.Component>
        </div>
    )
}