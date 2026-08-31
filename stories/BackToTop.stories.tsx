import { BackToTop, type BackToTopProps } from "../dist/BackToTop";
import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { BackToTop },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/lien#retour-en-haut-de-page)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/BackToTop.tsx)

By default the component renders an anchor pointing to \`#top\`. The DSFR expects the
matching \`id\` to be set on the topmost element of the page so that the navigation focus
moves back to the top along with the scroll:

\`\`\`html
<body id="top">
\`\`\`

When no \`id\` can be set on the top of the page, pass a \`targetRef\` instead. A
\`<button>\` is rendered, it scrolls the element into view and moves the focus onto it,
honouring \`prefers-reduced-motion\`:

\`\`\`tsx
function Page() {
    const topRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div ref={topRef} />
            {/* ... */}
            <BackToTop targetRef={topRef} right />
        </>
    );
}
\`\`\`

\`anchor\` and \`targetRef\` are mutually exclusive.
`,
    "argTypes": {
        "anchor": {
            "control": { "type": "text" },
            "description":
                'Anchor of the element to go back to. Default: `"#top"`. Mutually exclusive with `targetRef`.'
        },
        "targetRef": {
            "control": { "type": null },
            "description":
                "Element to scroll back to, as an alternative to `anchor`. Renders a `<button>` instead of a link."
        },
        "right": {
            "control": "boolean",
            "description": "Align the link on the right of the content. Default: `false`"
        }
    },
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({});

export const BackToTopOnRight = getStory(
    {
        "right": true
    },
    { "description": "Aligned on the right, wrapped in a `fr-grid-row fr-grid-row--right`." }
);

export const WithCustomAnchor = getStory(
    {
        "anchor": "#header"
    },
    { "description": "Pointing to an element other than the top of the page." }
);

{
    type ExpectedKeys = "id" | "className" | "style" | "classes" | "right" | "anchor" | "targetRef";

    assert<Equals<keyof BackToTopProps, ExpectedKeys>>();
}
