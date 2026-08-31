"use client";

import React, { memo, forwardRef, type CSSProperties, type ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { getLink, type RegisteredLinkProps } from "./link";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type ContentMediaProps = {
    id?: string;
    className?: string;
    style?: CSSProperties;
    classes?: Partial<Record<"root" | "img" | "caption", string>>;
    /**
     * aria-label for the `<figure>` element.
     * Defaults to the `caption` prop when it is a plain string.
     * Required for image and SVG media types when caption is not a string.
     */
    label?: string;
    /** Caption text shown below the media (description / source). */
    caption?: ReactNode;
    /**
     * Label and props of the optional link inside the figcaption.
     * Both properties are required together so the link always has an accessible
     * name (RGAA 6.1 / WCAG 2.4.4 – Link Purpose).
     */
    captionLink?: {
        label: ReactNode;
        linkProps: RegisteredLinkProps;
    };
    /**
     * Size variant of the media container.
     * - `"sm"` → `fr-content-media--sm`
     * - `"lg"` → `fr-content-media--lg`
     * - `"md"` (default) → no modifier class
     */
    size?: "sm" | "md" | "lg";
    /**
     * Aspect-ratio utility class applied to the image/SVG wrapper (`fr-ratio-*`).
     * Only applies to `type="img"` and `type="svg"`.
     * Example values: `"16x9"`, `"4x3"`, `"1x1"`, `"3x2"`, `"3x4"`, `"2x3"`.
     */
    ratio?: "16x9" | "3x2" | "4x3" | "1x1" | "3x4" | "2x3";
} & ContentMediaProps.Media;
export namespace ContentMediaProps {
    /** Image (`<img>`) media. */
    export type ImageMedia = {
        type: "img";
        /**
         * Props forwarded to the `<img>` element.
         * `src` and `alt` are required — `alt` can be an empty string when
         * the image is purely decorative.
         */
        imgProps: React.ImgHTMLAttributes<HTMLImageElement> & {
            src: string;
            /** Empty string is allowed for decorative images. */
            alt: string;
        };
    };
    /** SVG media — pass your `<svg>` element as the `svg` prop. */
    export type SvgMedia = {
        type: "svg";
        /**
         * The `<svg>` element to render.
         * • Decorative SVGs should carry `aria-hidden="true"`.
         * • Meaningful SVGs should carry `role="img"` and an `aria-label`.
         */
        svg: ReactNode;
    };
    /** Embedded video via `<iframe>` (e.g. YouTube). */
    export type IframeMedia = {
        type: "iframe";
        /**
         * Props forwarded to the `<iframe>` element.
         * `src` and `title` are required — `title` is the video's text alternative.
         */
        iframeProps: React.IframeHTMLAttributes<HTMLIFrameElement> & {
            src: string;
            /** Text alternative / accessibility title of the embedded video. */
            title: string;
        };
    };
    /** Native HTML5 `<video>`. */
    export type VideoMedia = {
        type: "video";
        /**
         * Text alternative for users who cannot view the video.
         * Displayed inside a `<p>` within the `<video>` element.
         */
        alternative?: string;
        /** Props forwarded to the `<video>` element. `controls` is always set. */
        videoProps: React.VideoHTMLAttributes<HTMLVideoElement> & { src: string };
    };
    /** Native HTML5 `<audio>`. */
    export type AudioMedia = {
        type: "audio";
        /**
         * Text alternative for users who cannot hear the audio.
         * Displayed inside a `<p>` within the `<audio>` element.
         */
        alternative?: string;
        /** Props forwarded to the `<audio>` element. `controls` is always set. */
        audioProps: React.AudioHTMLAttributes<HTMLAudioElement> & { src: string };
    };
    export type Media = ImageMedia | SvgMedia | IframeMedia | VideoMedia | AudioMedia;
}
/** @see <https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/contenu-medias> */
export const ContentMedia = memo(
    forwardRef<HTMLElement, ContentMediaProps>((props, ref) => {
        const {
            id: id_props,
            className,
            style,
            classes = {},
            label,
            caption,
            captionLink,
            size,
            ratio
        } = props;
        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-content-media",
            "explicitlyProvidedId": id_props
        });
        const { Link } = getLink();
        const ariaLabel = label ?? (typeof caption === "string" ? caption : undefined);
        const imgWrapperClassName = cx(
            fr.cx("fr-content-media__img"),
            ratio !== undefined ? (`fr-ratio-${ratio}` as string) : undefined,
            classes.img
        );
        const renderMedia = () => {
            switch (props.type) {
                case "img":
                    return (
                        <div className={imgWrapperClassName}>
                            <img
                                {...props.imgProps}
                                className={cx(fr.cx("fr-responsive-img"), props.imgProps.className)}
                            />
                        </div>
                    );
                case "svg":
                    // The DSFR reference implementation wraps SVGs in fr-content-media__img
                    // (example/component/content/index.html). The wrapper provides width:100%
                    // and serves as an anchor for the fr-ratio-* size utilities.
                    return <div className={imgWrapperClassName}>{props.svg}</div>;
                case "iframe":
                    return (
                        <iframe
                            {...props.iframeProps}
                            className={cx(fr.cx("fr-responsive-vid"), props.iframeProps.className)}
                        />
                    );
                case "video":
                    return (
                        <video
                            {...props.videoProps}
                            controls
                            className={cx(fr.cx("fr-responsive-vid"), props.videoProps.className)}
                        >
                            {props.alternative !== undefined && <p>{props.alternative}</p>}
                        </video>
                    );
                case "audio":
                    return (
                        <audio
                            {...props.audioProps}
                            controls
                            className={cx(fr.cx("fr-responsive-vid"), props.audioProps.className)}
                        >
                            {props.alternative !== undefined && <p>{props.alternative}</p>}
                        </audio>
                    );
            }
        };
        const hasCaption = caption !== undefined || captionLink !== undefined;
        return (
            <figure
                id={id}
                role="group"
                className={cx(
                    fr.cx("fr-content-media"),
                    size !== undefined && size !== "md"
                        ? (`fr-content-media--${size}` as string)
                        : undefined,
                    classes.root,
                    className
                )}
                style={style}
                {...(ariaLabel !== undefined ? { "aria-label": ariaLabel } : {})}
                ref={ref}
            >
                {renderMedia()}
                {hasCaption && (
                    <figcaption className={cx(fr.cx("fr-content-media__caption"), classes.caption)}>
                        {caption}
                        {captionLink !== undefined && (
                            <Link {...captionLink.linkProps} className={fr.cx("fr-link")}>
                                {captionLink.label}
                            </Link>
                        )}
                    </figcaption>
                )}
            </figure>
        );
    })
);
ContentMedia.displayName = symToStr({ ContentMedia });
export default ContentMedia;
