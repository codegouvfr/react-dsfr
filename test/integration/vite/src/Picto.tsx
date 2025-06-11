import { fr } from "@codegouvfr/react-dsfr";

import * as Pictogrammes from '@codegouvfr/react-dsfr/picto';
import { type PictoProps } from '@codegouvfr/react-dsfr/picto/utils/PictoWrapper';

const iconColors: PictoProps.Color[] = ["green-tilleul-verveine", "green-bourgeon", "green-emeraude", "green-menthe", "green-archipel", "blue-ecume", "blue-cumulus", "purple-glycine", "pink-macaron", "pink-tuile", "yellow-tournesol", "yellow-moutarde", "orange-terre-battue", "brown-cafe-creme", "brown-caramel", "brown-opera", "beige-gris-galet"];;

function getRandomColor() {
    return iconColors[Math.floor(Math.random() * iconColors.length)];
}

export function Picto() {
    return (
        <div className={fr.cx("fr-my-4w")}>
            {
                Object.entries(Pictogrammes).map(([name, Component]) => (
                    <Component
                        key={name}
                        fontSize="10em"
                        color={getRandomColor()}
                    />
                ))
            }
        </div>
    );
}