import { createSignal } from "../../tools/signal";
import { id } from "tsafe/id";
import type { FinalityConsent } from "./types";

export const { $finalityConsent, useFinalityConsent } = createSignal({
    "name": "finalityConsent",
    "initialValue": id<FinalityConsent | undefined>(undefined)
});
