import React from "react";
import { fr } from "../fr";

export function DisabledService() {
    return (
        <div className={fr.cx("fr-consent-placeholder")}>
            <p className={fr.cx("fr-h6", "fr-mb-2v")}>**Nom du service** est désactivé</p>
            <p className={fr.cx("fr-mb-6v")}>
                Autorisez le dépôt de cookies pour accéder à cette fonctionnalité.
            </p>
            <button
                className={fr.cx("fr-btn")}
                title="Autorisez le dépôt de cookies pour accéder au service **Nom du service**"
            >
                Autoriser
            </button>
        </div>
    );
}
