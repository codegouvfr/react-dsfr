import { useState } from "react";
import { fr } from "../../dist/fr";
import { Search } from "./Search";
import { useConst } from "powerhooks/useConst";
import { Evt } from "evt";
import * as Picto from "../../dist/picto";

const pictogrameEntries = Object.entries(Picto);

export function Pictogrammes() {
    const [search, setSearch] = useState("");

    const filteredPictogrammes = pictogrameEntries.filter(([key]) =>
        key.toLowerCase().includes(search.toLowerCase())
    );

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
                            <div key={key} className="picto-tile" style={{ textAlign: "center", width: 150 }}>
                                {
                                    typeof PictoComponent === "function" && <PictoComponent fontSize="inherit" />
                                }
                                <div style={{ marginTop: 8, fontSize: 12 }}>{key}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}