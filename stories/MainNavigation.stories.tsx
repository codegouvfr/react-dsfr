import React from "react";
import { Header } from "../dist/Header";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import "./utils.css";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { "MainNavigation": Header },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/navigation-principale)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Header/MainNavigation.tsx)  
  
This component isn't meant to be used directly but via the [\\<Header \\/\\>](https://react-dsfr-components.etalab.studio/?path=/docs/components-header)`,
    "argTypes": {
        "brandTop": {
            "control": { "type": null }
        },
        "homeLinkProps": {
            "control": { "type": null }
        }
    },
    "disabledProps": ["lang"],
    "doHideImportInstruction": true
});

export default meta;

export const DirectLinks = getStory({
    "brandTop": (
        <>
            INTITULE
            <br />
            OFFICIEL
        </>
    ),
    "homeLinkProps": {
        "href": "/",
        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
    },
    "navItems": [
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            },
            "isActive": true
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        }
    ]
});

export const DropdownMenu = getStory({
    "className": "margin-bottom-300px",
    "brandTop": (
        <>
            INTITULE
            <br />
            OFFICIEL
        </>
    ),
    "homeLinkProps": {
        "href": "/",
        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
    },
    "navItems": [
        {
            "text": "Entrée menu active",
            "isActive": true,
            "menuLinks": [
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    },
                    "isActive": true
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                }
            ]
        },
        {
            "text": "accès direct",
            "menuLinks": [
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                },
                {
                    "text": "Lien de navigation",
                    "linkProps": {
                        "href": "#"
                    }
                }
            ]
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        }
    ]
});

export const MegaMenu = getStory({
    "className": "margin-bottom-600px",
    "brandTop": (
        <>
            INTITULE
            <br />
            OFFICIEL
        </>
    ),
    "homeLinkProps": {
        "href": "/",
        "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
    },
    "navItems": [
        {
            "text": "Entrée mega menu",
            "isActive": true,
            "megaMenu": {
                "leader": {
                    "title": "Titre éditorialisé",
                    "paragraph": "Lorem [...] elit ut.",
                    "link": {
                        "text": "Voir toute la rubrique",
                        "linkProps": {
                            "href": "#"
                        }
                    }
                },
                "categories": [
                    {
                        "categoryMainLink": {
                            "text": "Nom de catégorie",
                            "linkProps": {
                                "href": "#"
                            }
                        },
                        "links": [
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Page active",
                                "linkProps": {
                                    "href": "#"
                                },
                                "isActive": true
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            }
                        ]
                    },
                    {
                        "categoryMainLink": {
                            "text": "Nom de catégorie",
                            "linkProps": {
                                "href": "#"
                            }
                        },
                        "links": [
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            }
                        ]
                    },
                    {
                        "categoryMainLink": {
                            "text": "Nom de catégorie",
                            "linkProps": {
                                "href": "#"
                            }
                        },
                        "links": [
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                },
                                "isActive": true
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            }
                        ]
                    },
                    {
                        "categoryMainLink": {
                            "text": "Nom de catégorie",
                            "linkProps": {
                                "href": "#"
                            }
                        },
                        "links": [
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            "text": "Entrée mega menu",
            "megaMenu": {
                "leader": {
                    "title": "Titre éditorialisé",
                    "paragraph": "Lorem [...] elit ut.",
                    "link": {
                        "text": "Voir toute la rubrique",
                        "linkProps": {
                            "href": "#"
                        }
                    }
                },
                "categories": [
                    {
                        "categoryMainLink": {
                            "text": "Nom de catégorie",
                            "linkProps": {
                                "href": "#"
                            }
                        },
                        "links": [
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            }
                        ]
                    },
                    {
                        "categoryMainLink": {
                            "text": "Nom de catégorie",
                            "linkProps": {
                                "href": "#"
                            }
                        },
                        "links": [
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            }
                        ]
                    },
                    {
                        "categoryMainLink": {
                            "text": "Nom de catégorie",
                            "linkProps": {
                                "href": "#"
                            }
                        },
                        "links": [
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                },
                                "isActive": true
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            }
                        ]
                    },
                    {
                        "categoryMainLink": {
                            "text": "Nom de catégorie",
                            "linkProps": {
                                "href": "#"
                            }
                        },
                        "links": [
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            },
                            {
                                "text": "Lien de navigation",
                                "linkProps": {
                                    "href": "#"
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        },
        {
            "text": "accès direct",
            "linkProps": {
                "href": "#",
                "target": "_self"
            }
        }
    ]
});
