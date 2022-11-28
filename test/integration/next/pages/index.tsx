import { useState } from "react";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { useIsDark, fr } from "@codegouvfr/react-dsfr";
import { DarkModeSwitch } from "@codegouvfr/react-dsfr/DarkModeSwitch";
import { useStyles } from "tss-react/dsfr";

export default function App() {
    const { isDark, setIsDark } = useIsDark();

    return (
        <>
            <Alert
                isClosable={true}
                severity="success"
                title="Success: This is the title"
                description="This is the description"
            />
            <ControlledTabs />

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

            <DarkModeSwitch />

        </>
    );
}

function ControlledTabs() {

    const [selectedTabId, setSelectedTabId] = useState("tab1");

    const { css } = useStyles();

    return (
        <Tabs
            className={css({
                "margin": fr.spacing("3v")
            })}
            selectedTabId={selectedTabId}
            tabs={[
                { "tabId": "tab1", "label": "Tab 1", "iconId": "fr-icon-add-line" },
                { "tabId": "tab2", "label": "Tab 2", "iconId": "fr-icon-ball-pen-fill" },
                { "tabId": "tab3", "label": "Tab 3" },
            ]}
            onTabChange={setSelectedTabId}
        >
            <p>Content of {selectedTabId}</p>
        </Tabs>
    );

}
