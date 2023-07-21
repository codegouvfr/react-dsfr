/*! DSFR v1.10.0 | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */

const config = {
  prefix: 'fr',
  namespace: 'dsfr',
  organisation: '@gouvfr',
  version: '1.10.0'
};

const api = window[config.namespace];

class TileDownload extends api.core.Instance {
  static get instanceClassName () {
    return 'TileDownload';
  }

  init () {
    this.addAscent(api.core.AssessEmission.UPDATE, details => {
      this.descend(api.core.AssessEmission.UPDATE, details);
    });
    this.addAscent(api.core.AssessEmission.ADDED, () => {
      this.descend(api.core.AssessEmission.ADDED);
    });
  }
}

const TileSelector = {
  DOWNLOAD: api.internals.ns.selector('tile--download'),
  DOWNLOAD_DETAIL: `${api.internals.ns.selector('tile--download')} ${api.internals.ns.selector('tile__detail')}`
};

api.tile = {
  TileSelector: TileSelector,
  TileDownload: TileDownload
};

api.internals.register(api.tile.TileSelector.DOWNLOAD, api.tile.TileDownload);
api.internals.register(api.tile.TileSelector.DOWNLOAD_DETAIL, api.core.AssessDetail);
//# sourceMappingURL=tile.module.js.map
