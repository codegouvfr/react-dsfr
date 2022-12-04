import React, { useState } from "react"
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";


export default function Test() {
  const [expanded, setExpanded] = useState<boolean>();
  return (
    <>
      <Accordion label="Accordion Uncontrolled" content="Content of the Uncontrolled Accordion" />
      <Accordion label="Accordion Controlled" content="Content of the controlled Accordion" defaultExpanded={true} expanded={expanded} onChange={(e, expanded) => { console.log(e); setExpanded(!expanded); }} />
    </>
  )
}