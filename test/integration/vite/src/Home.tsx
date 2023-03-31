import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { fr } from "@codegouvfr/react-dsfr";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { Table } from "@codegouvfr/react-dsfr/Table";

export function Home() {
    const { isDark, setIsDark } = useIsDark();

    return (
        <>
            <Alert
                closable
                severity="success"
                title="Success: This is the title"
                description="This is the description"
            />

            <button className={fr.cx("fr-btn", "fr-icon-checkbox-circle-line", "fr-btn--icon-left")}>
                Label bouton MD
            </button>
            <span className="fr-icon-ancient-gate-fill" aria-hidden="true"></span>
            <i className="fr-icon-ancient-gate-fill" aria-hidden="true" />

            <button className={fr.cx("fr-btn", "ri-24-hours-fill", "fr-btn--icon-left")}>
                Download
            </button>

            <h1>Color Scheme: {isDark ? "dark" : "light"}</h1>
            <button onClick={() => setIsDark(true)}>Set color scheme to dark</button>
            <button onClick={() => setIsDark(false)}>Set color scheme to light</button>
            <button onClick={() => setIsDark("system")}>Set color scheme to system</button>

            <TableExample />
        </>
    );
}

function TableExample() {
    return (
        <Table
            caption = "Titre du tableau"
            colorVariant = "green-emeraude"
            headers = {["Titre", "Titre", "Titre", "Titre", "Titre"]}
            data = {[
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"],
                ["Donnée", "Donnée", "Donnée", "Donnée", "Donnée"]
            ]}
        />
    );
}
