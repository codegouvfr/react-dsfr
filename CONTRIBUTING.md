Hello friends 👋,  

Would you help us implement the list of official components?  
Thank you so much to anyone that would!  

To get you started you can check out [the `<Alert />` component](https://react-dsfr-components.etalab.studio/?path=/docs/components-alert--default).  
- Here is its implementation [src/Alert.tsx](https://github.com/codegouvfr/react-dsfr/blob/main/src/Alert.tsx)
- Here is the file that generates its documentation: [stories/Alert.stories.tsx](https://github.com/codegouvfr/react-dsfr/blob/main/stories/Alert.stories.tsx)

[Here are the few commands](https://github.com/codegouvfr/react-dsfr#development) you need to run to set up your dev environment.  

*If you want to link your development version into your own project it's possible, just [ask me how](https://github.com/codegouvfr/react-dsfr/discussions).*  

A few things:  

- 🙏🏻 Don't be afraid to push even if you aren't 100% happy with your code or if it's still WIP, any contribution will be hugely helpful and appreciated.  
- 📣 Let everyone know in comments on what component you are working.  
- 📚 You can draw inspiration from [`dataesr/react-dsfr`](https://www.npmjs.com/package/@dataesr/react-dsfr) and the implementation of [france connect](https://github.com/france-connect/sources/tree/main/front/libs/dsfr). 
- 🔗 Use the component returned by `useLink()` instead of `<a />`. [Example in the `<Header />` component](https://github.com/codegouvfr/react-dsfr/blob/bbaf4a81d78de08d6fdcb059a9f4cb8a78ce4d5a/src/Header.tsx#L84-L87). We want to [play nice with all routing libraries](https://react-dsfr.etalab.studio/integration-with-routing-libraries).    
- 🕹️ When it's relevant, try to enable components to be used either in controlled or uncontrolled mode. [Example with <Tabs />](https://react-dsfr-components.etalab.studio/?path=/docs/components-tabs--default).  
- 🌎 Avoid hard coding text in JSX, use [the i18n mechanism](https://react-dsfr.etalab.studio/internationalization) instead. [Here is an example](https://github.com/codegouvfr/react-dsfr/blob/bbaf4a81d78de08d6fdcb059a9f4cb8a78ce4d5a/src/DarkModeSwitch.tsx#L162-L199).  (Don't worry about providing translations other than French.)  
- 🍳  If you have to arbitrate between ease of use and customisability I'd encourage you to favor ease of use.  People that would need a greater level of customizability can always fall back to making their own wrapper from the reference documentation using [`fr.cx()`](https://react-dsfr.etalab.studio/fr-utils/cx).   

Thank You Very Much ❤️

PS: If you want to contribute to the Doc website. You can edit [the source Markdown](https://github.com/codegouvfr/react-dsfr/tree/v1_docs) or ask me for access to our GitBook. (We'll migrate to Docusaurus once we have the DSFR theme for it ready.)  
