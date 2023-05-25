import React from "react";
import { symToStr } from "tsafe/symToStr";
import ConnectButton from "./Connect/ConnectButton";

export type MonCompteProConnectProps = {
    loginUrl: string;
};

const MonCompteProConnect = ({ loginUrl }: MonCompteProConnectProps) => (
    <ConnectButton
        loginUrl={loginUrl}
        serviceName="MonComptePro"
        serviceUrl="https://moncomptepro.beta.gouv.fr/"
    />
);

MonCompteProConnect.displayName = symToStr({ MonCompteProConnect });

export default MonCompteProConnect;
