"use client";
import React, { memo, forwardRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { getLink } from "./link";
import { useAnalyticsId } from "./tools/useAnalyticsId";
/** @see <https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/contenu-medias> */
export const ContentMedia = memo(forwardRef((props, ref) => {
    const { id: id_props, className, style, classes = {}, label, caption, captionLink, size, ratio } = props;
    const id = useAnalyticsId({
        "defaultIdPrefix": "fr-content-media",
        "explicitlyProvidedId": id_props
    });
    const { Link } = getLink();
    const ariaLabel = label !== null && label !== void 0 ? label : (typeof caption === "string" ? caption : undefined);
    const imgWrapperClassName = cx(fr.cx("fr-content-media__img"), ratio !== undefined ? `fr-ratio-${ratio}` : undefined, classes.img);
    const renderMedia = () => {
        switch (props.type) {
            case "img":
                return (React.createElement("div", { className: imgWrapperClassName },
                    React.createElement("img", Object.assign({}, props.imgProps, { className: cx(fr.cx("fr-responsive-img"), props.imgProps.className) }))));
            case "svg":
                // The DSFR reference implementation wraps SVGs in fr-content-media__img
                // (example/component/content/index.html). The wrapper provides width:100%
                // and serves as an anchor for the fr-ratio-* size utilities.
                return React.createElement("div", { className: imgWrapperClassName }, props.svg);
            case "iframe":
                return (React.createElement("iframe", Object.assign({}, props.iframeProps, { className: cx(fr.cx("fr-responsive-vid"), props.iframeProps.className) })));
            case "video":
                return (React.createElement("video", Object.assign({}, props.videoProps, { controls: true, className: cx(fr.cx("fr-responsive-vid"), props.videoProps.className) }), props.alternative !== undefined && React.createElement("p", null, props.alternative)));
            case "audio":
                return (React.createElement("audio", Object.assign({}, props.audioProps, { controls: true, className: cx(fr.cx("fr-responsive-vid"), props.audioProps.className) }), props.alternative !== undefined && React.createElement("p", null, props.alternative)));
        }
    };
    const hasCaption = caption !== undefined || captionLink !== undefined;
    return (React.createElement("figure", Object.assign({ id: id, role: "group", className: cx(fr.cx("fr-content-media"), size !== undefined && size !== "md"
            ? `fr-content-media--${size}`
            : undefined, classes.root, className), style: style }, (ariaLabel !== undefined ? { "aria-label": ariaLabel } : {}), { ref: ref }),
        renderMedia(),
        hasCaption && (React.createElement("figcaption", { className: cx(fr.cx("fr-content-media__caption"), classes.caption) },
            caption,
            captionLink !== undefined && (React.createElement(Link, Object.assign({}, captionLink.linkProps, { className: fr.cx("fr-link") }), captionLink.label))))));
}));
ContentMedia.displayName = symToStr({ ContentMedia });
export default ContentMedia;
//# sourceMappingURL=ContentMedia.js.map