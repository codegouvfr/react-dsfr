"use client";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useGdpr } from "../app/gdpr";

export function ClientComponent() {

  const { isDark } = useIsDark();

  const { finalityConsent } = useGdpr(
    ({ finalityConsent, finalityConsent_prev }) => {

      console.log("Callback from hook", { finalityConsent, finalityConsent_prev });

    }
  );

  console.log({ finalityConsent });

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mt: 5 }}>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <p>Is dark? {isDark ? "yes" : "no"}</p>
      <Button onClick={modal.open}>Open client modal</Button>
      <modal.Component title="Client modal">
        <p>Client modal content</p>
        <button onClick={modal.close}>Close</button>
      </modal.Component>
    </>
  );
}

const modal = createModal({
  "isOpenedByDefault": false,
  "id": "client-modal"
});