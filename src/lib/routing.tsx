import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

type HTMLAnchorProps = DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RegisterLink {
    // Link: typeof Link
}

export type RegisteredLinkProps = RegisterLink extends {
    Link: (props: infer LinkProps) => any;
}
    ? Omit<LinkProps, "children">
    : Omit<HTMLAnchorProps, "children">;

const context = createContext<CreateLinkProviderPrams["Link"]>(props => <a {...props} />);

type CreateLinkProviderPrams = {
    Link: (props: RegisteredLinkProps & { children: ReactNode }) => ReturnType<React.FC>;
};

export function createDsfrLinkProvider(params: CreateLinkProviderPrams) {
    const { Link } = params;

    type Props = {
        children: ReactNode;
    };

    function DsfrLinkProvider(props: Props) {
        const { children } = props;

        return <context.Provider value={Link}>{children}</context.Provider>;
    }

    return { DsfrLinkProvider };
}

export function useLink() {
    const Link = useContext(context);

    return { Link };
}
