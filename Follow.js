var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef, memo } from "react";
import { assert } from "tsafe";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { useAnalyticsId } from "./tools/useAnalyticsId";
import Button from "./Button";
import { Input } from "./Input";
import Alert from "./Alert";
import ButtonsGroup from "./ButtonsGroup";
const FollowNewsletter = (props) => {
    const { t } = useTranslation();
    const { title = t("subscribe to our newsletter"), desc, buttonProps, form, hasSocial, titleAs = "h5", classes = {} } = props, rest = __rest(props, ["title", "desc", "buttonProps", "form", "hasSocial", "titleAs", "classes"]);
    assert();
    return (React.createElement("div", { className: cx(fr.cx("fr-col-12", hasSocial && "fr-col-md-8"), classes["newsletter-col"]) },
        React.createElement("div", { className: cx(fr.cx("fr-follow__newsletter"), classes.newsletter) },
            React.createElement("div", null,
                React.createElement("h2", { className: cx(fr.cx(`fr-${titleAs}`), classes["newsletter-title"]) }, title),
                desc !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-text--sm"), classes["newsletter-desc"]) }, desc))),
            React.createElement("div", null, form !== undefined
                ? (() => {
                    const { success, consentHint = t("consent hint"), formComponent, inputProps = {}, successMessage = t("your registration has been processed") } = form, restForm = __rest(form, ["success", "consentHint", "formComponent", "inputProps", "successMessage"]);
                    assert();
                    if (success)
                        return (React.createElement(Alert, { severity: "success", description: successMessage, title: 
                            // force default size without title
                            undefined }));
                    // prepare inputProps with default values
                    const { label: inputLabel = t("your email address"), hintText: inputHintText = consentHint } = inputProps, _a = inputProps.nativeInputProps, _b = _a === void 0 ? {} : _a, { title: inputTitle = t("your email address"), placeholder: inputPlaceholder = t("your email address"), autoComplete: inputAutoComplete = "email", type: inputType = "email" } = _b, nativeInputProps = __rest(_b, ["title", "placeholder", "autoComplete", "type"]), restInputProps = __rest(inputProps, ["label", "hintText", "nativeInputProps"]);
                    // prepare buttonProps with default values
                    const { children: buttonContent = t("subscribe"), title: buttonTitle = t("subscribe to our newsletter (2)"), type: buttonType = "button" } = buttonProps, restButtonProps = __rest(buttonProps, ["children", "title", "type"]);
                    // use wrapper to add form
                    return formComponent({
                        children: (React.createElement(React.Fragment, null,
                            React.createElement(Input, Object.assign({ label: inputLabel, nativeInputProps: Object.assign({ title: inputTitle, placeholder: inputPlaceholder, autoComplete: inputAutoComplete, type: inputType }, nativeInputProps) }, restInputProps, { addon: React.createElement(Button, Object.assign({}, restButtonProps, { title: buttonTitle, type: buttonType }), buttonContent) })),
                            inputHintText !== undefined && (React.createElement("p", { className: cx(fr.cx("fr-hint-text"), classes["newsletter-form-hint"]) }, inputHintText))))
                    });
                })()
                : (() => {
                    const { children: buttonContent = t("subscribe"), title: buttonTitle = t("subscribe to our newsletter (2)") } = buttonProps, restButtonProps = __rest(buttonProps, ["children", "title"]);
                    return (React.createElement(ButtonsGroup, { inlineLayoutWhen: "md and up", buttons: [
                            Object.assign({ children: buttonContent, title: buttonTitle }, restButtonProps)
                        ] }));
                })()))));
};
const FollowSocial = (props) => {
    const { t } = useTranslation();
    const { buttons, title = t("follow us on social medias"), titleAs = "h5", hasNewsletter, classes = {} } = props, rest = __rest(props, ["buttons", "title", "titleAs", "hasNewsletter", "classes"]);
    assert();
    return (React.createElement("div", { className: cx(fr.cx("fr-col-12", hasNewsletter && "fr-col-md-4"), classes["social-col"]) },
        React.createElement("div", { className: cx(fr.cx("fr-follow__social"), classes.social) },
            React.createElement("h2", { className: cx(fr.cx(`fr-${titleAs}`), classes["social-title"]) }, title),
            React.createElement(ButtonsGroup, { className: cx(classes["social-buttons"]), buttons: buttons.map(button => {
                    const _a = button.linkProps, { target = "_blank", rel = "noopener external", title = `${t(button.type)} - ${t("new window")}` } = _a, restLinkProps = __rest(_a, ["target", "rel", "title"]);
                    return {
                        className: cx(fr.cx(`fr-btn--${button.type}`), classes["social-buttons-each"]),
                        children: t(button.type),
                        linkProps: Object.assign(Object.assign({}, restLinkProps), { target,
                            rel,
                            title })
                    };
                }) }))));
};
/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-follow> */
export const Follow = memo(forwardRef((props, ref) => {
    const { id: props_id, className, classes = {}, social, style, newsletter } = props, rest = __rest(props, ["id", "className", "classes", "social", "style", "newsletter"]);
    assert();
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-follow",
        "explicitlyProvidedId": props_id
    });
    const hasSocial = social !== undefined;
    const hasNewsletter = newsletter !== undefined;
    return (React.createElement("div", Object.assign({ id: id, className: cx(fr.cx("fr-follow"), classes.root, className), ref: ref, style: style }, rest),
        React.createElement("div", { className: cx(fr.cx("fr-container"), classes.container) },
            React.createElement("div", { className: cx(fr.cx("fr-grid-row"), classes.row) },
                hasNewsletter && (React.createElement(FollowNewsletter, Object.assign({}, newsletter, { hasSocial: hasSocial, classes: classes }))),
                hasSocial && (React.createElement(FollowSocial, Object.assign({}, social, { hasNewsletter: hasNewsletter, classes: classes })))))));
}));
Follow.displayName = symToStr({ Follow });
export default Follow;
const { useTranslation, addFollowTranslations } = createComponentI18nApi({
    componentName: symToStr({ Follow }),
    frMessages: {
        /* spell-checker: disable */
        "follow us on social medias": (React.createElement(React.Fragment, null,
            "Suivez-nous",
            React.createElement("br", null),
            " sur les r\u00E9seaux sociaux")),
        "subscribe to our newsletter": "Abonnez-vous à notre lettre d'information",
        "subscribe to our newsletter (2)": "S'abonner à notre lettre d'information",
        "subscribe": "S'abonner",
        "your registration has been processed": "Votre inscription a bien été prise en compte",
        "your email address": "Votre adresse électronique (ex. : nom@domaine.fr)",
        "consent hint": "En renseignant votre adresse électronique, vous acceptez de recevoir nos actualités par courriel. Vous pouvez vous désinscrire à tout moment à l’aide des liens de désinscription ou en nous contactant.",
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
        "follow us on social medias": (React.createElement(React.Fragment, null,
            "Follow us",
            React.createElement("br", null),
            " on social medias")),
        "subscribe to our newsletter": "Subscribe to our newsletter",
        "subscribe to our newsletter (2)": "Subscribe to our newsletter",
        "subscribe": "Subscribe",
        "your registration has been processed": "Your registration has been processed",
        "your email address": "Your email address (e.g. name@domain.fr)",
        "consent hint": "By entering your email address, you agree to receive our news by email. You can unsubscribe at any time using the unsubscribe links or by contacting us.",
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
//# sourceMappingURL=Follow.js.map