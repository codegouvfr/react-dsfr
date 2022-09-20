import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@gouvfr/dsfr/dist/dsfr.css";
import { useColorScheme } from "react_dsfr/lib/colorScheme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

(window as any).dsfr = {
  "verbose": true,
  "mode": "manual"
};

// @ts-ignore
import("@gouvfr/dsfr/dist/dsfr.module").then(() => {
  console.log("starting");
  (window as any).dsfr.start();
});

function Root() {

  const { colorScheme } = useColorScheme();

  return (
    <>
      <h1>Color Scheme: {colorScheme}</h1>
      <header role="banner" className="fr-header">
        <div className="fr-header__body">
          <div className="fr-container">
            <div className="fr-header__body-row">
              <div className="fr-header__brand fr-enlarge-link">
                <div className="fr-header__brand-top">
                  <div className="fr-header__logo">
                    <a href="/" title="Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)">
                      <p className="fr-logo">
                        Intitulé
                        <br />officiel
                      </p>
                    </a>
                  </div>
                  <div className="fr-header__navbar">
                    <button className="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-491" aria-haspopup="menu" id="button-492" title="Menu">
                      Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-header__menu fr-modal" id="modal-491" aria-labelledby="button-492">
          <div className="fr-container">
            <button className="fr-btn--close fr-btn" aria-controls="modal-491" title="Fermer">
              Fermer
            </button>
            <div className="fr-header__menu-links">
            </div>
            <nav className="fr-nav" id="navigation-494" role="navigation" aria-label="Menu principal">
              <ul className="fr-nav__list">
                <li className="fr-nav__item">
                  <a className="fr-nav__link" href="#" target="_self">accès direct</a>
                </li>
                <li className="fr-nav__item">
                  <a className="fr-nav__link" href="#" target="_self">accès direct</a>
                </li>
                <li className="fr-nav__item">
                  <a className="fr-nav__link" href="#" target="_self">accès direct</a>
                </li>
                <li className="fr-nav__item">
                  <a className="fr-nav__link" href="#" target="_self">accès direct</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="fr-header__tools-links">
          <ul className="fr-links-group">
            <li>
              <button className="fr-link fr-fi-theme-fill fr-link--icon-left" aria-controls="fr-theme-modal" data-fr-opened="false">Paramètres d'affichage</button>
            </li>
          </ul>
        </div>
      </header>



      <dialog id="fr-theme-modal" className="fr-modal" role="dialog" aria-labelledby="fr-theme-modal-title">
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button className="fr-btn--close fr-btn" aria-controls="fr-theme-modal" title="Fermer">
                    Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1 id="fr-theme-modal-title" className="fr-modal__title">
                    Paramètres d’affichage
                  </h1>
                  <div id="fr-display" className="fr-display">
                    <div className="fr-form-group">
                      <fieldset className="fr-fieldset">
                        <legend className="fr-fieldset__legend fr-text--regular" id='-legend'>
                          Choisissez un thème pour personnaliser l’apparence du site.
                        </legend>
                        <div className="fr-fieldset__content">
                          <div className="fr-radio-group fr-radio-rich">
                            <input value="light" type="radio" id="fr-radios-theme-light" name="fr-radios-theme" />
                            <label className="fr-label" htmlFor="fr-radios-theme-light">
                              Thème clair
                            </label>
                            <div className="fr-radio-rich__img">
                              <svg xmlns="http://www.w3.org/2000/svg" className="fr-artwork" width="80px" height="80px" viewBox="0 0 80 80">
                                <use className="fr-artwork-decorative" xlinkHref="/gouvfr_dsfr_dist/artwork/light.svg#artwork-decorative"></use>
                                <use className="fr-artwork-minor" xlinkHref="/gouvfr_dsfr_dist/artwork/light.svg#artwork-minor"></use>
                                <use className="fr-artwork-major" xlinkHref="/gouvfr_dsfr_dist/artwork/light.svg#artwork-major"></use>
                              </svg>
                            </div>
                          </div>
                          <div className="fr-radio-group fr-radio-rich">
                            <input value="dark" type="radio" id="fr-radios-theme-dark" name="fr-radios-theme" />
                            <label className="fr-label" htmlFor="fr-radios-theme-dark">
                              Thème sombre
                            </label>
                            <div className="fr-radio-rich__img">
                              <svg xmlns="http://www.w3.org/2000/svg" className="fr-artwork" width="80px" height="80px" viewBox="0 0 80 80">
                                <use className="fr-artwork-decorative" xlinkHref="/gouvfr_dsfr_dist/artwork/dark.svg#artwork-decorative"></use>
                                <use className="fr-artwork-minor" xlinkHref="/gouvfr_dsfr_dist/artwork/dark.svg#artwork-minor"></use>
                                <use className="fr-artwork-major" xlinkHref="/gouvfr_dsfr_dist/artwork/dark.svg#artwork-major"></use>
                              </svg>
                            </div>
                          </div>
                          <div className="fr-radio-group fr-radio-rich">
                            <input value="system" type="radio" id="fr-radios-theme-system" name="fr-radios-theme" />
                            <label className="fr-label" htmlFor="fr-radios-theme-system">
                              Système
                              <span className="fr-hint-text">Utilise les paramètres système.</span>
                            </label>
                            <div className="fr-radio-rich__img">
                              <svg xmlns="http://www.w3.org/2000/svg" className="fr-artwork" width="80px" height="80px" viewBox="0 0 80 80">
                                <use className="fr-artwork-decorative" xlinkHref="/gouvfr_dsfr_dist/artwork/system.svg#artwork-decorative"></use>
                                <use className="fr-artwork-minor" xlinkHref="/gouvfr_dsfr_dist/artwork/system.svg#artwork-minor"></use>
                                <use className="fr-artwork-major" xlinkHref="/gouvfr_dsfr_dist/artwork/system.svg#artwork-major"></use>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );

}