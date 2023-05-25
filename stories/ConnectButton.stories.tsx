import ConnectButton, { Service } from "../dist/ConnectButton";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { ConnectButton },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-franceconnect/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/FranceConnect.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    "loginUrl": "https://dummy",
    service: Service.FRANCE_CONNECT
});

export const FranceConnect = getStory({
    "loginUrl": "https://dummy",
    service: Service.FRANCE_CONNECT
});

export const FranceConnectPlus = getStory({
    "loginUrl": "https://dummy",
    service: Service.FRANCE_CONNECT_PLUS
});

export const AgentConnect = getStory({
    "loginUrl": "https://dummy",
    service: Service.AGENT_CONNECT
});

export const MonComptePro = getStory({
    "loginUrl": "https://dummy",
    service: Service.MON_COMPTE_PRO
});
