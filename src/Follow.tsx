import React, { CSSProperties, forwardRef, memo, PropsWithChildren, ReactNode } from "react";
import { assert, Equals } from "tsafe";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";
import { RegisteredLinkProps } from "./link";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import Button, { ButtonProps } from "./Button";
import { InputProps, Input } from "./Input";
import Alert from "./Alert";
import ButtonsGroup from "./ButtonsGroup";
import { CxArg } from "tss-react";

export type FollowProps = {
    id?: string;
    className?: string;
    classes?: Partial<
        Record<
            | "root"
            | "container"
            | "row"
            | "newsletter-col"
            | "newsletter"
            | "newsletter-title"
            | "newsletter-desc"
            | "newsletter-form-wrapper"
            | "social-col"
            | "social"
            | "social-title"
            | "social-buttons"
            | "social-buttons-each",
            CxArg
        >
    >;
    social?: FollowProps.Social;
    style?: CSSProperties;
    newsletter?: FollowProps.Newsletter;
};

//https://main--ds-gouv.netlify.app/example/component/follow/
export namespace FollowProps {
    /**
     * From DSFR `$follow-icons` + `copy` and `mail`
     */
    export type SocialType =
        | "copy"
        | "dailymotion"
        | "facebook"
        | "github"
        | "instagram"
        | "linkedin"
        | "mail"
        | "mastodon"
        | "snapchat"
        | "telegram"
        | "threads"
        | "tiktok"
        | "twitch"
        | "twitter"
        | "twitter-x"
        | "vimeo"
        | "youtube";

    type TitleAs = {
        title?: ReactNode;
        /**
         * Display only. The tag will stay `h2`.
         *
         * @default "h5"
         */
        titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
    };

    export type SocialButton = {
        type: SocialType;
        linkProps: RegisteredLinkProps;
    };

    export type Social = TitleAs & {
        buttons: [SocialButton, ...SocialButton[]];
    };

    export type NewsletterForm = {
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
        inputProps: Omit<InputProps.RegularInput, "addon">;
    };

    export type Newsletter = TitleAs & {
        desc?: ReactNode;
        /** "Subscribe" button */
        buttonProps: ButtonProps.Common &
            ButtonProps.AsButton &
            // optional children
            Partial<ButtonProps.WithoutIcon>;
        /** When using a form */
        form?: NewsletterForm;
    };
}

const FollowNewsletter = (
    props: FollowProps.Newsletter & { hasSocial: boolean; classes: FollowProps["classes"] }
) => {
    const { t } = useTranslation();

    const {
        title = t("subscribe to our newsletter"),
        desc,
        buttonProps,
        form,
        hasSocial,
        titleAs = "h5",
        classes = {},
        ...rest
    } = props;
    assert<Equals<keyof typeof rest, never>>();

    return (
        <div
            className={cx(
                fr.cx("fr-col-12", hasSocial && "fr-col-md-8"),
                classes["newsletter-col"]
            )}
        >
            <div className={cx(fr.cx("fr-follow__newsletter"), classes.newsletter)}>
                <div>
                    <h2 className={cx(fr.cx(`fr-${titleAs}`), classes["newsletter-title"])}>
                        {title}
                    </h2>
                    {desc !== undefined && (
                        <p className={cx(fr.cx("fr-text--sm"), classes["newsletter-desc"])}>
                            {desc}
                        </p>
                    )}
                </div>
            </div>
            {form !== undefined
                ? (() => {
                      const {
                          success,
                          consentHint,
                          formComponent,
                          inputProps,
                          successMessage = t("your registration has been processed"),
                          ...restForm
                      } = form;
                      assert<Equals<keyof typeof restForm, never>>();

                      if (success)
                          return (
                              <Alert
                                  severity="success"
                                  description={successMessage}
                                  title={
                                      // force default size without title
                                      undefined as unknown as string
                                  }
                              />
                          );

                      // prepare inputProps with default values
                      const {
                          label: inputLabel = t("your email address"),
                          hintText: inputHintText = consentHint ?? t("consent hint"),
                          nativeInputProps: {
                              title: inputTitle = t("your email address"),
                              placeholder: inputPlaceholder = t("your email address"),
                              autoComplete: inputAutoComplete = "email",
                              type: inputType = "email",
                              ...nativeInputProps
                          } = {},
                          ...restInputProps
                      } = inputProps;

                      // prepare buttonProps with default values
                      const {
                          children: buttonContent = t("subscribe"),
                          title: buttonTitle = t("subscribe to our newsletter (2)"),
                          type: buttonType = "button",
                          ...restButtonProps
                      } = buttonProps;

                      // use wrapper to add form
                      return formComponent({
                          children: (
                              <Input
                                  label={inputLabel}
                                  hintText={inputHintText}
                                  nativeInputProps={{
                                      title: inputTitle,
                                      placeholder: inputPlaceholder,
                                      autoComplete: inputAutoComplete,
                                      type: inputType,
                                      ...nativeInputProps
                                  }}
                                  {...restInputProps}
                                  addon={
                                      <Button
                                          {...restButtonProps}
                                          title={buttonTitle}
                                          type={buttonType}
                                      >
                                          {buttonContent}
                                      </Button>
                                  }
                              />
                          )
                      });
                  })()
                : (() => {
                      const {
                          children: buttonContent = t("subscribe"),
                          title: buttonTitle = t("subscribe to our newsletter (2)"),
                          ...restButtonProps
                      } = buttonProps;

                      return (
                          <ButtonsGroup
                              inlineLayoutWhen="md and up"
                              buttons={[
                                  {
                                      children: buttonContent,
                                      title: buttonTitle,
                                      ...restButtonProps
                                  }
                              ]}
                          />
                      );
                  })()}
        </div>
    );
};

const FollowSocial = (
    props: FollowProps.Social & { hasNewsletter: boolean; classes: FollowProps["classes"] }
) => {
    const { t } = useTranslation();

    const {
        buttons,
        title = t("follow us on social medias"),
        titleAs = "h5",
        hasNewsletter,
        classes = {},
        ...rest
    } = props;
    assert<Equals<keyof typeof rest, never>>();

    return (
        <div
            className={cx(
                fr.cx("fr-col-12", hasNewsletter && "fr-col-md-4"),
                classes["social-col"]
            )}
        >
            <div className={cx(fr.cx("fr-follow__social"), classes.social)}>
                <h2 className={cx(fr.cx(`fr-${titleAs}`), classes["social-title"])}>{title}</h2>
                <ButtonsGroup
                    className={cx(classes["social-buttons"])}
                    buttons={
                        buttons.map(button => {
                            const {
                                target = "_blank",
                                rel = "noopener external",
                                title = `${t(button.type)} - ${t("new window")}`,
                                ...restLinkProps
                            } = button.linkProps;

                            return {
                                className: cx(
                                    fr.cx(`fr-btn--${button.type}`),
                                    classes["social-buttons-each"]
                                ),
                                children: t(button.type),
                                linkProps: {
                                    ...restLinkProps,
                                    target,
                                    rel,
                                    title
                                }
                            };
                        }) as [ButtonProps, ...ButtonProps[]]
                    }
                />
            </div>
        </div>
    );
};

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-follow> */
export const Follow = memo(
    forwardRef<HTMLDivElement, FollowProps>((props, ref) => {
        const { id: props_id, className, classes = {}, social, style, newsletter, ...rest } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-follow",
            "explicitlyProvidedId": props_id
        });

        const hasSocial = social !== undefined;
        const hasNewsletter = newsletter !== undefined;

        return (
            <div
                id={id}
                className={cx(fr.cx("fr-follow"), classes.root, className)}
                ref={ref}
                style={style}
                {...rest}
            >
                <div className={cx(fr.cx("fr-container"), classes.container)}>
                    <div className={cx(fr.cx("fr-grid-row"), classes.row)}>
                        {hasNewsletter && (
                            <FollowNewsletter
                                {...newsletter}
                                hasSocial={hasSocial}
                                classes={classes}
                            />
                        )}
                        {hasSocial && (
                            <FollowSocial
                                {...social}
                                hasNewsletter={hasNewsletter}
                                classes={classes}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    })
);

Follow.displayName = symToStr({ Follow });

export default Follow;

const { useTranslation, addFollowTranslations } = createComponentI18nApi({
    componentName: symToStr({ Follow }),
    frMessages: {
        /* spell-checker: disable */
        "follow us on social medias": (
            <>
                Suivez-nous
                <br /> sur les réseaux sociaux
            </>
        ),
        "subscribe to our newsletter": "Abonnez-vous à notre lettre d'information",
        "subscribe to our newsletter (2)": "S'abonner à notre lettre d'information",
        "subscribe": "S'abonner",
        "your registration has been processed": "Votre inscription a bien été prise en compte",
        "your email address": "Votre adresse électronique (ex. : nom@domaine.fr)",
        "consent hint":
            "En renseignant votre adresse électronique, vous acceptez de recevoir nos actualités par courriel. Vous pouvez vous désinscrire à tout moment à l’aide des liens de désinscription ou en nous contactant.",
        "new window": "nouvelle fenêtre",
        "copy": "copier",
        "dailymotion": "Dailymotion",
        "facebook": "Facebook",
        "github": "Github",
        "instagram": "Instagram",
        "linkedin": "LinkedIn",
        "mail": "Email",
        "mastodon": "Mastodon",
        "snapchat": "Snapchat",
        "telegram": "Telegram",
        "threads": "Threads (Instagram)",
        "tiktok": "TikTok",
        "twitch": "Twitch",
        "twitter": "Twitter",
        "twitter-x": "X (anciennement Twitter)",
        "vimeo": "Vimeo",
        "youtube": "Youtube"
        /* spell-checker: enable */
    }
});

addFollowTranslations({
    lang: "en",
    messages: {
        /* spell-checker: disable */
        "follow us on social medias": (
            <>
                Follow us
                <br /> on social medias
            </>
        ),
        "subscribe to our newsletter": "Subscribe to our newsletter",
        "subscribe to our newsletter (2)": "Subscribe to our newsletter",
        "subscribe": "Subscribe",
        "your registration has been processed": "Your registration has been processed",
        "your email address": "Your email address (e.g. name@domain.fr)",
        "consent hint":
            "By entering your email address, you agree to receive our news by email. You can unsubscribe at any time using the unsubscribe links or by contacting us.",
        "new window": "new window",
        "copy": "copy",
        "dailymotion": "Dailymotion",
        "facebook": "Facebook",
        "github": "Github",
        "instagram": "Instagram",
        "linkedin": "LinkedIn",
        "mail": "Email",
        "mastodon": "Mastodon",
        "snapchat": "Snapchat",
        "telegram": "Telegram",
        "threads": "Threads (Instagram)",
        "tiktok": "TikTok",
        "twitch": "Twitch",
        "twitter": "Twitter",
        "twitter-x": "X (formerly Twitter)",
        "vimeo": "Vimeo",
        "youtube": "Youtube"
        /* spell-checker: enable */
    }
});
