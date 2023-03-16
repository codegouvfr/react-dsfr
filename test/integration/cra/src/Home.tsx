import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { fr } from "@codegouvfr/react-dsfr";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { SideMenu } from "@codegouvfr/react-dsfr/SideMenu";

const sideMenuItems = [
    {
        text: "Niveau 1",
        items: [
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            }
        ]
    },
    {
        isActive: true,
        text: "Entrée menu active",
        items: [
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                isActive: true,
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
        ]
    },
    {
        text: "Accès direct",
        linkProps: { href: "#" }
    },
    {
        text: "Accès direct",
        linkProps: { href: "#" }
    },
    {
        text: "Niveau 1",
        items: [
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            },
            {
                text: "Accès direct niveau 2",
                linkProps: { href: "#" }
            }
        ]
    },
];

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

            <SideMenu
                items={sideMenuItems}
                title="Titre de rubrique"
                bugerMenuButtonText="Dans cette rubrique"
            />

        </>
    );
}
