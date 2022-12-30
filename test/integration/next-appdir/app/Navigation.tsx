"use client";

import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { useSelectedLayoutSegment } from "next/navigation";

export function Navigation() {

	const segment = useSelectedLayoutSegment();

	return (
		<MainNavigation
			items={[
				{
					"text": "Home",
					"linkProps": {
						"href": "/"
					},
					"isActive": segment === null
				},
				{
					"text": "Mui playground",
					"linkProps": {
						"href": "/mui"
					},
					"isActive": segment === "mui"
				}
			]}
		/>
	);

}