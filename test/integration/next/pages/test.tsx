import React, { useState } from "react"
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { fr } from "@codegouvfr/react-dsfr";


export default function Test() {
  const [expanded, setExpanded] = useState<boolean>(true);
  return (
    <div className={fr.cx("fr-accordions-group")}>
      <Accordion label="Accordion Uncontrolled" content="Content of the Uncontrolled Accordion" />
      <Accordion label="Accordion Controlled" content="Content of the controlled Accordion" expanded={expanded} onChange={(expanded, e) => { console.log("event", e); setExpanded(!expanded); }} />
    </div>
  )
}