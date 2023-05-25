import React from "react";
import { symToStr } from "tsafe/symToStr";
import ConnectButton from "./Connect/ConnectButton";

export type FranceConnectProps = {
    loginUrl: string;
};

const FranceConnect = ({ loginUrl }: FranceConnectProps) => (
    <ConnectButton
        loginUrl={loginUrl}
        serviceName="FranceConnect"
        serviceUrl="https://franceconnect.gouv.fr/"
    />
);

FranceConnect.displayName = symToStr({ FranceConnect });

export default FranceConnect;
