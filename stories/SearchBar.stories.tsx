import React, { useState } from "react";
import { SearchBar } from "../dist/SearchBar";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import Autocomplete from "@mui/material/Autocomplete";
import { cx } from "../dist/tools/cx";

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
        "clearInputOnSearch": {
            "description":
                "Default: false, if true the input value will be cleared when the user click on the search button or press enter",
            "control": { "type": "boolean" }
        },
        "allowEmptySearch": {
            "description":
                "Default: false, if true the user will be able to search with an empty input, otherwise clicking ont the search button or pressing enter will focus the input",
            "control": { "type": "boolean" }
        },
        "renderInput": {
            "description": `Optional: To control the input yourself`,
            "control": { "type": null }
        }
    }
});

export default meta;

export const DefaultUncontrolled = getStory(
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

export const BigUncontrolled = getStory({
    "label": undefined,
    "onButtonClick": text => alert(`TODO: implement search with text: ${text}`),
    "big": true
});

export const WithControlledInput = getStory(
    {
        "renderInput": ({ className, id, placeholder, type }) => {
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
                                inputElement?.blur();
                            }
                        }}
                    />
                    <p
                        style={{
                            "position": "absolute",
                            "top": 43
                        }}
                    >
                        Search results for: {search}
                    </p>
                </>
            );
        }
    },
    {
        "description": ` 

\`\`\`tsx
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
        
function Root(){
        
    const [search, onSearchChange] = useState("");

    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
        
    return (
        <>
            <SearchBar
                ...
                renderInput={({ className, id, placeholder, type }) => 
                    <input
                        ref={setInputElement}
                        className={className}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        value={search}
                        // Note: The default behavior for an input of type 'text' is to clear the input value when the escape key is pressed.
                        // However, due to a bug in @gouvfr/dsfr the escape key event is not propagated to the input element.
                        // As a result this onChange is not called when the escape key is pressed.
                        onChange={event => onSearchChange(event.currentTarget.value)}
                        // Same goes for the keydown event so this is useless but we hope the bug will be fixed soon.
                        onKeyDown={event => {
                            if (event.key === "Escape") {
                                assert(inputElement !== null);
                                inputElement.blur();
                            }
                        }}
                    />
                }
                ...
            />
            <p>Search results for: {search}</p>
        </>
        
    );
        
}
\`\`\`
`
    }
);

export const WithMuiAutocomplete = getStory(
    {
        "renderInput": ({ className, id, placeholder, type }) => (
            <MuiSearchInput className={className} id={id} placeholder={placeholder} type={type} />
        )
    },
    {
        "description": ` 
        
If you want to feature a modern search experience with realtime hinting you can omit providing a \`onSearchButtonClick\` callback and instead
make sure you provide an overlay with the search results in the the \`renderSearchInput\` function.  
        
As, to this day, the DSFR do not provide any component to help you with that, you are on your own for implementing the overlay.  
You can achieve great result by using [MUI's autocomplete](https://mui.com/material-ui/react-autocomplete/) component.  
[Implementation example](https://github.com/mui/material-ui/issues/37838).  
If you go with MUI make sure to use the [\`<MuiDsfrProvider />\`](https://react-dsfr.codegouv.studio/mui).  
        
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
            id={id}
            renderInput={params => 
                <div ref={params.InputProps.ref}>
                    <input 
                        {...params.inputProps} 
                        className={cx(params.inputProps.className, className)}
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

export type MuiSearchInputProps = {
    className: string;
    id: string;
    placeholder: string;
    type: "search";
};

const options = ["Option 1", "Option 2"];

export function MuiSearchInput(props: MuiSearchInputProps) {
    const { className, id, placeholder, type } = props;

    return (
        <Autocomplete
            style={{ "width": "100%" }}
            id={id}
            options={options}
            renderInput={params => (
                <div ref={params.InputProps.ref}>
                    <input
                        {...params.inputProps}
                        className={cx(params.inputProps.className, className)}
                        placeholder={placeholder}
                        type={type}
                    />
                </div>
            )}
        />
    );
}
