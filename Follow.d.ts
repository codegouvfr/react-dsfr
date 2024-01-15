import React, { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { RegisteredLinkProps } from "./link";
import { ButtonProps } from "./Button";
import { InputProps } from "./Input";
import { CxArg } from "tss-react";
export type FollowProps = {
    id?: string;
    className?: string;
    classes?: Partial<Record<"root" | "container" | "row" | "newsletter-col" | "newsletter" | "newsletter-title" | "newsletter-desc" | "newsletter-form-wrapper" | "newsletter-form-hint" | "social-col" | "social" | "social-title" | "social-buttons" | "social-buttons-each", CxArg>>;
    style?: CSSProperties;
    newsletter?: FollowProps.Newsletter;
    social?: FollowProps.Social;
} & (FollowProps.EitherNewsletter | FollowProps.EitherSocial | FollowProps.EitherBoth);
export declare namespace FollowProps {
    type EitherNewsletter = {
        newsletter: Newsletter;
        social?: Social;
    };
    type EitherSocial = {
        newsletter?: Newsletter;
        social: Social;
    };
    type EitherBoth = {
        newsletter: Newsletter;
        social: Social;
    };
    type TitleAs = {
        title?: ReactNode;
        /**
         * Display only. The tag will stay `h2`.
         *
         * @default "h5"
         */
        titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
    };
    type NewsletterForm = {
        /** Bound props to display success alert */
        success: boolean;
        successMessage?: NonNullable<ReactNode>;
        /**
         * @example
         * ```tsx
         * <Newsletter
         *    newsletter={{
         *       form: {
         *         formComponent: ({ children }) => <form action="">{children}</form>,
         *       },
         *   }}
         * />
         * ```
         */
        formComponent: <TProps extends PropsWithChildren>({ children }: TProps) => React.ReactNode;
        consentHint?: ReactNode;
        inputProps?: Partial<Omit<InputProps.RegularInput, "addon">>;
    };
    type NewsletterWithForm = {
        /** "Subscribe" button */
        buttonProps: ButtonProps.Common & ButtonProps.AsButton & Partial<ButtonProps.WithoutIcon>;
        /** When using a form */
        form: NewsletterForm;
    };
    type NewsletterWithoutForm = {
        /** "Subscribe" button */
        buttonProps: ButtonProps.Common & (ButtonProps.AsButton | ButtonProps.AsAnchor) & Partial<ButtonProps.WithoutIcon>;
        /** When using a form */
        form?: never;
    };
    type Newsletter = TitleAs & {
        desc?: ReactNode;
    } & (NewsletterWithForm | NewsletterWithoutForm);
    /**
     * From DSFR `$follow-icons` + `copy` and `mail`
     */
    type SocialType = "copy" | "dailymotion" | "facebook" | "github" | "instagram" | "linkedin" | "mail" | "mastodon" | "snapchat" | "telegram" | "threads" | "tiktok" | "twitch" | "twitter" | "twitter-x" | "vimeo" | "youtube";
    type SocialButton = {
        type: SocialType;
        linkProps: RegisteredLinkProps;
    };
    type Social = TitleAs & {
        buttons: [SocialButton, ...SocialButton[]];
    };
}
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-follow> */
export declare const Follow: React.MemoExoticComponent<React.ForwardRefExoticComponent<FollowProps & React.RefAttributes<HTMLDivElement>>>;
export default Follow;
