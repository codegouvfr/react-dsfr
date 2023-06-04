import React from "react";
import { fr } from "../fr";

export function DisabledMedia() {
    return (
        <div className={fr.cx("fr-content-media", "fr-content-media--sm")}>
            <div className={fr.cx("fr-responsive-vid")}>
                <div className={fr.cx("fr-consent-placeholder")}>
                    <p className={fr.cx("fr-h6")}>**Nom du service** est désactivé</p>
                    <p>Autorisez le dépôt de cookies pour accèder à cette fonctionnalité.</p>
                    <button className={fr.cx("fr-btn")}>Autoriser</button>
                </div>
            </div>
            <div className={fr.cx("fr-content-media__caption")}>© Légende de la vidéo</div>
            <div className={fr.cx("fr-content-media__transcription")}>
                <button className={fr.cx("fr-btn")}>Label du bouton de la transcription</button>
            </div>
        </div>
    );
}
