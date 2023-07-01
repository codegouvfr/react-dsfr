import React, { useState } from "react";
import { SearchBar } from "../dist/SearchBar";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { SearchBar },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/barre-de-recherche)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/SearchBar.tsx)`,
    "argTypes": {
        "big": {
            "description": "Use the big variant if you have space to spare",
            "control": { "type": "boolean" }
        },
        "label": {
            "description": "Default: 'Rechercher' (or translation)",
            "control": { "type": "text" }
        },
        "renderInput": {
            "description": `Optional: To control the input yourself`,
            "control": { "type": null }
        }
    }
});

export default meta;

export const Default = getStory(
    {
        "label": undefined,
        "onButtonClick": text => alert(`TODO: implement search with text: ${text}`)
    },
    {
        "description": `

If you you do not plan to provide any realtime hinting to the user as he types the search query you can provide a \`onButtonClick\`
callback that will be called when the user click on the search button or press enter.

\`\`\`tsx
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";

<SearchBar
    ...
    onButtonClick={text=> alert(\`TODO: implement search with text: \${text}\`)}
/>
\`\`\`

`
    }
);

type MySearchInputProps = {
    className?: string;
    id: string;
    placeholder: string;
    type: "search";
};

function MySearchInput(props: MySearchInputProps) {
    const { className, id, placeholder, type } = props;

    const [search, onSearchChange] = useState("");

    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);

    return (
        <>
            <input
                ref={setInputElement}
                className={className}
                id={id}
                placeholder={placeholder}
                type={type}
                value={search}
                onChange={event => onSearchChange(event.currentTarget.value)}
                onKeyDown={event => {
                    if (event.key === "Escape") {
                        onSearchChange("");
                        inputElement?.blur();
                    }
                }}
            />
            <p
                style={{
                    "position": "absolute",
                    "top": 84
                }}
            >
                Search results for: {search}
            </p>
        </>
    );
}

export const WithControlledInput = getStory(
    {
        "renderInput": ({ className, id, placeholder, type }) => (
            <MySearchInput className={className} id={id} placeholder={placeholder} type={type} />
        )
    },
    {
        "description": ` 

\`\`\`tsx

import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";

type MySearchInputProps = {
    className?: string;
    id: string;
    placeholder: string;
    type: "search";
    search: string;
    onSearchChange: (search: string) => void;
};
        
function MySearchInput(props: MySearchInputProps) {
        
    const { className, id, placeholder, type, search, onSearchChange } = props;

    const [
        inputElement,
        setInputElement
    ] = useState<HTMLInputElement | null>(null);

    return (
        <input
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
            value={search}
            onChange={event => onSearchChange(event.currentTarget.value)}
            onKeyDown={event => {
                if (event.key === "Escape") {
                    onSearchChange("");
                    setInputElement?.blur();
                }
            }}
        />
    );
        
}

        
function Root(){
        
    const [search, onSearchChange] = useState("");
        
    return (
        <>
            <SearchBar
                ...
                renderInput={({
                    className,
                    id,
                    placeholder,
                    type
                })=>
                    <MySearchInput
                        className={className}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        search={search}
                        onSearchChange={onSearchChange}
                    />
                }
                ...
            />
            <p>Search results for: {search}</p>
        </>
        
    );
        
}
        
\`\`\`
        
If you want to feature a modern search experience with realtime hinting you can omit providing a \`onSearchButtonClick\` callback and instead
make sure you provide an overlay with the search results in the the \`renderSearchInput\` function.  
        
As, to this day, the DSFR do not provide any component to help you with that, you are on your own for implementing the overlay.  
You can achieve great result by using [MUI's autocomplete](https://mui.com/material-ui/react-autocomplete/) component.  
[Video demo](https://youtu.be/AT3CvmY_Y7M?t=64).  
If you go with MUI make sure to use the [\`<MuiDsfrProvider />\`](https://react-dsfr.etalab.studio/mui).  
        
\`\`\`tsx
        
import Autocomplete from "@mui/material/Autocomplete";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
        
type MySearchInputProps = {
    className?: string;
    id: string;
    placeholder: string;
    type: "search;
};
        
function MySearchInput(props: MySearchInputProps) {
        
    const { className, id, placeholder, type } = props;
        
    return (
        <Autocomplete 
            ...
            renderInput={params => 
                <div ref={params.InputProps.ref}>
                    <input 
                        {...params.inputProps} 
                        className={cx(params.inputProps.className, className)}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                    />
                </div>
            }
        />
    );
        
}
        
<SearchBar
    ...
    renderInput={({ className, id, placeholder, type }) => (
        <MySearchInput
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
        />
    )}
/>
\`\`\`


`
    }
);
