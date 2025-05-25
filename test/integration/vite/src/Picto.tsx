import { fr } from "@codegouvfr/react-dsfr";

import * as Pictogrammes from '@codegouvfr/react-dsfr/picto';

export function Picto() {
	return (
		<div className={fr.cx("fr-my-4w")}>
			{
				Object.entries(Pictogrammes).map(([name, Component]) => (
					<Component
					key={name}
					fontSize="10em"
					/>
				))
			}
		</div>
	)
}