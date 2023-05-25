import React from "react";
export declare enum Service {
    AGENT_CONNECT = 0,
    FRANCE_CONNECT = 1,
    FRANCE_CONNECT_PLUS = 2,
    MON_COMPTE_PRO = 3
}
export type ConnectButtonProps = {
    classes?: Partial<Record<"root", string>>;
    className?: string;
    loginUrl: string;
    service: Service;
};
declare const ConnectButton: React.MemoExoticComponent<React.ForwardRefExoticComponent<ConnectButtonProps & React.RefAttributes<HTMLDivElement>>>;
export default ConnectButton;
