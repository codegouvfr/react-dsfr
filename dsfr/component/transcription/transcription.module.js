/*! DSFR v1.14.2 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.14.2'
};

const api = window[config.namespace];

const TRANSCRIPTION = api.internals.ns.selector('transcription');

const TranscriptionSelector = {
  TRANSCRIPTION: TRANSCRIPTION,
  BUTTON: `${TRANSCRIPTION}__btn`
};

class Transcription extends api.core.Instance {
  static get instanceClassName () {
    return 'Transcription';
  }

  get collapsePrimary () {
    const buttons = this.element.children.map(child => child.getInstance('CollapseButton')).filter(button => button !== null && button.hasClass(TranscriptionSelector.BUTTON));
    return buttons[0];
  }
}

api.transcription = {
  Transcription: Transcription,
  TranscriptionSelector: TranscriptionSelector
};

api.internals.register(api.transcription.TranscriptionSelector.TRANSCRIPTION, api.transcription.Transcription);
//# sourceMappingURL=transcription.module.js.map
