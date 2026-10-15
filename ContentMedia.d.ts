import React, { type CSSProperties, type ReactNode } from "react";
import { type RegisteredLinkProps } from "./link";
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
export declare namespace ContentMediaProps {
    /** Image (`<img>`) media. */
    type ImageMedia = {
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
    type SvgMedia = {
        type: "svg";
        /**
         * The `<svg>` element to render.
         * • Decorative SVGs should carry `aria-hidden="true"`.
         * • Meaningful SVGs should carry `role="img"` and an `aria-label`.
         */
        svg: ReactNode;
    };
    /** Embedded video via `<iframe>` (e.g. YouTube). */
    type IframeMedia = {
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
    type VideoMedia = {
        type: "video";
        /**
         * Text alternative for users who cannot view the video.
         * Displayed inside a `<p>` within the `<video>` element.
         */
        alternative?: string;
        /** Props forwarded to the `<video>` element. `controls` is always set. */
        videoProps: React.VideoHTMLAttributes<HTMLVideoElement> & {
            src: string;
        };
    };
    /** Native HTML5 `<audio>`. */
    type AudioMedia = {
        type: "audio";
        /**
         * Text alternative for users who cannot hear the audio.
         * Displayed inside a `<p>` within the `<audio>` element.
         */
        alternative?: string;
        /** Props forwarded to the `<audio>` element. `controls` is always set. */
        audioProps: React.AudioHTMLAttributes<HTMLAudioElement> & {
            src: string;
        };
    };
    type Media = ImageMedia | SvgMedia | IframeMedia | VideoMedia | AudioMedia;
}
/** @see <https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/contenu-medias> */
export declare const ContentMedia: React.MemoExoticComponent<React.ForwardRefExoticComponent<ContentMediaProps & React.RefAttributes<HTMLElement>>>;
export default ContentMedia;
