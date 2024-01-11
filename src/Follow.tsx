import { CSSProperties } from "@mui/styled-engine";
import { type } from "os";
import { forwardRef, memo } from "react";
import { fr } from "./fr";
import { RegisteredLinkProps } from "./link";

export type FollowProps = {
    id?: string;
    className?: string;
    classes?: Partial<Record<"root" | "content", string>>;
    socials?: FollowProps.SocialButton[];
    style?: CSSProperties;
};

export namespace FollowProps {
    export type SocialType =
        | "facebook"
        | "twitter"
        | "twitter-x"
        | "linkedin"
        | "mastodon"
        | "mail"
        | "copy"
        | "youtube"
        | "dailymotion"
        | "instagram"
        | "github"
        | "tiktok"
        | "snapchat"
        | "telegram"
        | "twitch"
        | "vimeo";
    export type SocialButton = {
        type: SocialType;
        linkProps: RegisteredLinkProps;
    };
}

export const Follow = memo(
    forwardRef<HTMLDivElement, FollowProps>((props, ref) => {
        const { id: props_id } = props;

        return null;
    })
);
