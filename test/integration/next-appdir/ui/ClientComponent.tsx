"use client";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useGdpr } from "../app/gdpr";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";

export function ClientComponent() {

  const { isDark } = useIsDark();

  const { finalityConsent } = useGdpr(
    async ({ finalityConsent, finalityConsent_prev }) => {


      console.log("Callback from hook", { finalityConsent, finalityConsent_prev });

      await new Promise(resolve => setTimeout(resolve, 500));

      console.log("done waiting");



    }
  );

  console.log("=========>", { finalityConsent });

  const isModalOpen = useIsModalOpen(modal);

  //console.log(`Modal ${modal.id} is currently: ${isModalOpen ? "open" : "closed"}`);

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