import { ContentMedia, type ContentMediaProps } from "../dist/ContentMedia";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { ContentMedia },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/contenu-medias)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/ContentMedia.tsx)

Supports **image**, **SVG**, **iframe**, **video** and **audio** media types  
via the \`type\` discriminator prop.

\`\`\`tsx
import { ContentMedia } from "@codegouvfr/react-dsfr/ContentMedia";

// Image
<ContentMedia
    type="img"
    label="Description / Source"
    imgProps={{ src: "image.png", alt: "Description de l'image" }}
    caption="Description / Source"
    captionLinkLabel="Libellé lien"
    captionLinkProps={{
        href: "https://www.systeme-de-design.gouv.fr",
        target: "_blank",
        rel: "noopener noreferrer"
    }}
/>

// Iframe vidéo (YouTube, etc.)
<ContentMedia
    type="iframe"
    iframeProps={{
        src: "https://www.youtube.com/embed/HyirpmPL43I",
        title: "Vidéo de présentation - voir transcription ci-dessous",
        allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
    }}
    caption="Description / Source"
    captionLinkLabel="Libellé lien"
    captionLinkProps={{
        href: "https://www.youtube.com/watch?v=HyirpmPL43I",
        target: "_blank",
        rel: "noopener noreferrer"
    }}
/>

// Vidéo native
<ContentMedia
    type="video"
    alternative="Alternative de la vidéo - voir transcription ci-dessous"
    videoProps={{ src: "video.mp4" }}
    caption="Description / Source"
    captionLinkLabel="Libellé lien"
    captionLinkProps={{
        href: "https://www.w3schools.com/html/html5_video.asp",
        target: "_blank",
        rel: "noopener noreferrer"
    }}
/>

// Audio natif
<ContentMedia
    type="audio"
    alternative="Alternative de l'audio - voir transcription ci-dessous"
    audioProps={{ src: "audio.mp3" }}
    caption="Description / Source"
    captionLinkLabel="Libellé lien"
    captionLinkProps={{
        href: "https://www.w3schools.com/html/html5_audio.asp",
        target: "_blank",
        rel: "noopener noreferrer"
    }}
/>
\`\`\`
`,
    "argTypes": {
        "type": {
            "options": (() => {
                const types = ["img", "svg", "iframe", "video", "audio"] as const;
                assert<Equals<typeof types[number], ContentMediaProps.Media["type"]>>();
                return types;
            })(),
            "control": { "type": "radio" }
        },
        "label": {
            "description":
                "`aria-label` of the `<figure>` element. Defaults to `caption` when it is a plain string."
        },
        "caption": {
            "description": "Caption / source text shown in the `<figcaption>`."
        },
        "captionLinkLabel": {
            "description": "Label of the link inside the `<figcaption>`."
        },
        "captionLinkProps": {
            "description": "Props of the link inside the `<figcaption>`.",
            "control": { "type": null }
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Image = getStory({
    "type": "img",
    "label": "Description / Source",
    "imgProps": {
        "src": "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png",
        "alt": "Description de l'image (texte alternatif)"
    },
    "caption": "Description / Source",
    "captionLinkLabel": "Libellé lien",
    "captionLinkProps": {
        "href": "https://www.systeme-de-design.gouv.fr",
        "target": "_blank",
        "rel": "noopener noreferrer"
    }
});

export const IframeVideo = getStory(
    {
        "type": "iframe",
        "iframeProps": {
            "src": "https://www.youtube.com/embed/HyirpmPL43I",
            "title":
                "Vidéo de présentation du Service National Universel - voir transcription ci-dessous",
            "allow": "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
            "allowFullScreen": true
        },
        "caption": "Description / Source",
        "captionLinkLabel": "Libellé lien",
        "captionLinkProps": {
            "href": "https://www.youtube.com/watch?v=HyirpmPL43I",
            "target": "_blank",
            "rel": "noopener noreferrer"
        }
    },
    { "description": "Vidéo intégrée via `<iframe>` (ex : YouTube)." }
);

export const VideoNative = getStory(
    {
        "type": "video",
        "alternative": "Alternative de la vidéo - voir transcription ci-dessous",
        "videoProps": {
            "src": "https://www.w3schools.com/html/mov_bbb.mp4"
        },
        "caption": "Description / Source",
        "captionLinkLabel": "Libellé lien",
        "captionLinkProps": {
            "href": "https://www.w3schools.com/html/html5_video.asp",
            "target": "_blank",
            "rel": "noopener noreferrer"
        }
    },
    { "description": "Vidéo native HTML5 avec `<video>`." }
);

export const AudioNative = getStory(
    {
        "type": "audio",
        "alternative": "Alternative de l'audio - voir transcription ci-dessous",
        "audioProps": {
            "src": "https://www.w3schools.com/html/horse.mp3"
        },
        "caption": "Description / Source",
        "captionLinkLabel": "Libellé lien",
        "captionLinkProps": {
            "href": "https://www.w3schools.com/html/html5_audio.asp",
            "target": "_blank",
            "rel": "noopener noreferrer"
        }
    },
    { "description": "Fichier audio natif HTML5 avec `<audio>`." }
);

export const ImageWithoutCaption = getStory(
    {
        "type": "img",
        "label": "Image illustrative",
        "imgProps": {
            "src": "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png",
            "alt": ""
        }
    },
    { "description": 'Image décorative (`alt=""`) sans légende.' }
);
