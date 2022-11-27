"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetCssVar = void 0;
exports.default = extendTheme;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _utils = require("@mui/utils");

var _system = require("@mui/system");

var _createTheme = _interopRequireDefault(require("./createTheme"));

var _Paper = require("../Paper/Paper");

const _excluded = ["colorSchemes", "cssVarPrefix"],
      _excluded2 = ["palette"];
const defaultDarkOverlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return undefined;
  }

  const overlay = (0, _Paper.getOverlayAlpha)(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});

function assignNode(obj, keys) {
  keys.forEach(k => {
    if (!obj[k]) {
      obj[k] = {};
    }
  });
}

function setColor(obj, key, defaultValue) {
  obj[key] = obj[key] || defaultValue;
}

const createGetCssVar = (cssVarPrefix = 'mui') => (0, _system.unstable_createGetCssVar)(cssVarPrefix);

exports.createGetCssVar = createGetCssVar;

function extendTheme(options = {}, ...args) {
  var _colorSchemesInput$li, _colorSchemesInput$da, _colorSchemesInput$li2, _colorSchemesInput$li3, _colorSchemesInput$da2, _colorSchemesInput$da3;

  const {
    colorSchemes: colorSchemesInput = {},
    cssVarPrefix = 'mui'
  } = options,
        input = (0, _objectWithoutPropertiesLoose2.default)(options, _excluded);
  const getCssVar = createGetCssVar(cssVarPrefix);

  const _createThemeWithoutVa = (0, _createTheme.default)((0, _extends2.default)({}, input, colorSchemesInput.light && {
    palette: (_colorSchemesInput$li = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li.palette
  })),
        {
    palette: lightPalette
  } = _createThemeWithoutVa,
        muiTheme = (0, _objectWithoutPropertiesLoose2.default)(_createThemeWithoutVa, _excluded2);

  const {
    palette: darkPalette
  } = (0, _createTheme.default)({
    palette: (0, _extends2.default)({
      mode: 'dark'
    }, (_colorSchemesInput$da = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da.palette)
  });
  let theme = (0, _extends2.default)({}, muiTheme, {
    cssVarPrefix,
    getCssVar,
    colorSchemes: (0, _extends2.default)({}, colorSchemesInput, {
      light: (0, _extends2.default)({}, colorSchemesInput.light, {
        palette: lightPalette,
        opacity: (0, _extends2.default)({
          inputPlaceholder: 0.42,
          inputUnderline: 0.42,
          switchTrackDisabled: 0.12,
          switchTrack: 0.38
        }, (_colorSchemesInput$li2 = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li2.opacity),
        overlays: ((_colorSchemesInput$li3 = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li3.overlays) || []
      }),
      dark: (0, _extends2.default)({}, colorSchemesInput.dark, {
        palette: darkPalette,
        opacity: (0, _extends2.default)({
          inputPlaceholder: 0.5,
          inputUnderline: 0.7,
          switchTrackDisabled: 0.2,
          switchTrack: 0.3
        }, (_colorSchemesInput$da2 = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da2.opacity),
        overlays: ((_colorSchemesInput$da3 = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da3.overlays) || defaultDarkOverlays
      })
    })
  });
  Object.keys(theme.colorSchemes).forEach(key => {
    const palette = theme.colorSchemes[key].palette; // attach black & white channels to common node

    if (key === 'light') {
      setColor(palette.common, 'background', '#fff');
      setColor(palette.common, 'onBackground', '#000');
    } else {
      setColor(palette.common, 'background', '#000');
      setColor(palette.common, 'onBackground', '#fff');
    } // assign component variables


    assignNode(palette, ['Alert', 'AppBar', 'Avatar', 'Chip', 'FilledInput', 'LinearProgress', 'Skeleton', 'Slider', 'SnackbarContent', 'SpeedDialAction', 'StepConnector', 'StepContent', 'Switch', 'TableCell', 'Tooltip']);

    if (key === 'light') {
      setColor(palette.Alert, 'errorColor', (0, _system.darken)(palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', (0, _system.darken)(palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', (0, _system.darken)(palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', (0, _system.darken)(palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', getCssVar('palette-error-main'));
      setColor(palette.Alert, 'infoFilledBg', getCssVar('palette-info-main'));
      setColor(palette.Alert, 'successFilledBg', getCssVar('palette-success-main'));
      setColor(palette.Alert, 'warningFilledBg', getCssVar('palette-warning-main'));
      setColor(palette.Alert, 'errorFilledColor', lightPalette.getContrastText(palette.error.main));
      setColor(palette.Alert, 'infoFilledColor', lightPalette.getContrastText(palette.info.main));
      setColor(palette.Alert, 'successFilledColor', lightPalette.getContrastText(palette.success.main));
      setColor(palette.Alert, 'warningFilledColor', lightPalette.getContrastText(palette.warning.main));
      setColor(palette.Alert, 'errorStandardBg', (0, _system.lighten)(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', (0, _system.lighten)(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', (0, _system.lighten)(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', (0, _system.lighten)(palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', getCssVar('palette-error-light'));
      setColor(palette.Alert, 'infoIconColor', getCssVar('palette-info-light'));
      setColor(palette.Alert, 'successIconColor', getCssVar('palette-success-light'));
      setColor(palette.Alert, 'warningIconColor', getCssVar('palette-warning-light'));
      setColor(palette.AppBar, 'defaultBg', getCssVar('palette-grey-100'));
      setColor(palette.Avatar, 'defaultBg', getCssVar('palette-grey-400'));
      setColor(palette.Chip, 'defaultBorder', getCssVar('palette-grey-400'));
      setColor(palette.Chip, 'defaultAvatarColor', getCssVar('palette-grey-700'));
      setColor(palette.Chip, 'defaultIconColor', getCssVar('palette-grey-700'));
      setColor(palette.FilledInput, 'bg', 'rgba(0, 0, 0, 0.06)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(0, 0, 0, 0.09)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(0, 0, 0, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', (0, _system.lighten)(palette.primary.main, 0.62));
      setColor(palette.LinearProgress, 'secondaryBg', (0, _system.lighten)(palette.secondary.main, 0.62));
      setColor(palette.LinearProgress, 'errorBg', (0, _system.lighten)(palette.error.main, 0.62));
      setColor(palette.LinearProgress, 'infoBg', (0, _system.lighten)(palette.info.main, 0.62));
      setColor(palette.LinearProgress, 'successBg', (0, _system.lighten)(palette.success.main, 0.62));
      setColor(palette.LinearProgress, 'warningBg', (0, _system.lighten)(palette.warning.main, 0.62));
      setColor(palette.Skeleton, 'bg', `rgba(${getCssVar('palette-text-primaryChannel')} / 0.11)`);
      setColor(palette.Slider, 'primaryTrack', (0, _system.lighten)(palette.primary.main, 0.62));
      setColor(palette.Slider, 'secondaryTrack', (0, _system.lighten)(palette.secondary.main, 0.62));
      setColor(palette.Slider, 'errorTrack', (0, _system.lighten)(palette.error.main, 0.62));
      setColor(palette.Slider, 'infoTrack', (0, _system.lighten)(palette.info.main, 0.62));
      setColor(palette.Slider, 'successTrack', (0, _system.lighten)(palette.success.main, 0.62));
      setColor(palette.Slider, 'warningTrack', (0, _system.lighten)(palette.warning.main, 0.62));
      const snackbarContentBackground = (0, _system.emphasize)(palette.background.default, 0.8);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(palette.SnackbarContent, 'color', lightPalette.getContrastText(snackbarContentBackground));
      setColor(palette.SpeedDialAction, 'fabHoverBg', (0, _system.emphasize)(palette.background.paper, 0.15));
      setColor(palette.StepConnector, 'border', getCssVar('palette-grey-400'));
      setColor(palette.StepContent, 'border', getCssVar('palette-grey-400'));
      setColor(palette.Switch, 'defaultColor', getCssVar('palette-common-white'));
      setColor(palette.Switch, 'defaultDisabledColor', getCssVar('palette-grey-100'));
      setColor(palette.Switch, 'primaryDisabledColor', (0, _system.lighten)(palette.primary.main, 0.62));
      setColor(palette.Switch, 'secondaryDisabledColor', (0, _system.lighten)(palette.secondary.main, 0.62));
      setColor(palette.Switch, 'errorDisabledColor', (0, _system.lighten)(palette.error.main, 0.62));
      setColor(palette.Switch, 'infoDisabledColor', (0, _system.lighten)(palette.info.main, 0.62));
      setColor(palette.Switch, 'successDisabledColor', (0, _system.lighten)(palette.success.main, 0.62));
      setColor(palette.Switch, 'warningDisabledColor', (0, _system.lighten)(palette.warning.main, 0.62));
      setColor(palette.TableCell, 'border', (0, _system.lighten)((0, _system.alpha)(palette.divider, 1), 0.88));
      setColor(palette.Tooltip, 'bg', (0, _system.alpha)(palette.grey[700], 0.92));
    } else {
      setColor(palette.Alert, 'errorColor', (0, _system.lighten)(palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', (0, _system.lighten)(palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', (0, _system.lighten)(palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', (0, _system.lighten)(palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', getCssVar('palette-error-dark'));
      setColor(palette.Alert, 'infoFilledBg', getCssVar('palette-info-dark'));
      setColor(palette.Alert, 'successFilledBg', getCssVar('palette-success-dark'));
      setColor(palette.Alert, 'warningFilledBg', getCssVar('palette-warning-dark'));
      setColor(palette.Alert, 'errorFilledColor', darkPalette.getContrastText(palette.error.dark));
      setColor(palette.Alert, 'infoFilledColor', darkPalette.getContrastText(palette.info.dark));
      setColor(palette.Alert, 'successFilledColor', darkPalette.getContrastText(palette.success.dark));
      setColor(palette.Alert, 'warningFilledColor', darkPalette.getContrastText(palette.warning.dark));
      setColor(palette.Alert, 'errorStandardBg', (0, _system.darken)(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', (0, _system.darken)(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', (0, _system.darken)(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', (0, _system.darken)(palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', getCssVar('palette-error-main'));
      setColor(palette.Alert, 'infoIconColor', getCssVar('palette-info-main'));
      setColor(palette.Alert, 'successIconColor', getCssVar('palette-success-main'));
      setColor(palette.Alert, 'warningIconColor', getCssVar('palette-warning-main'));
      setColor(palette.AppBar, 'defaultBg', getCssVar('palette-grey-900'));
      setColor(palette.AppBar, 'darkBg', getCssVar('palette-background-paper')); // specific for dark mode

      setColor(palette.AppBar, 'darkColor', getCssVar('palette-text-primary')); // specific for dark mode

      setColor(palette.Avatar, 'defaultBg', getCssVar('palette-grey-600'));
      setColor(palette.Chip, 'defaultBorder', getCssVar('palette-grey-700'));
      setColor(palette.Chip, 'defaultAvatarColor', getCssVar('palette-grey-300'));
      setColor(palette.Chip, 'defaultIconColor', getCssVar('palette-grey-300'));
      setColor(palette.FilledInput, 'bg', 'rgba(255, 255, 255, 0.09)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(255, 255, 255, 0.13)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(255, 255, 255, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', (0, _system.darken)(palette.primary.main, 0.5));
      setColor(palette.LinearProgress, 'secondaryBg', (0, _system.darken)(palette.secondary.main, 0.5));
      setColor(palette.LinearProgress, 'errorBg', (0, _system.darken)(palette.error.main, 0.5));
      setColor(palette.LinearProgress, 'infoBg', (0, _system.darken)(palette.info.main, 0.5));
      setColor(palette.LinearProgress, 'successBg', (0, _system.darken)(palette.success.main, 0.5));
      setColor(palette.LinearProgress, 'warningBg', (0, _system.darken)(palette.warning.main, 0.5));
      setColor(palette.Skeleton, 'bg', `rgba(${getCssVar('palette-text-primaryChannel')} / 0.13)`);
      setColor(palette.Slider, 'primaryTrack', (0, _system.darken)(palette.primary.main, 0.5));
      setColor(palette.Slider, 'secondaryTrack', (0, _system.darken)(palette.secondary.main, 0.5));
      setColor(palette.Slider, 'errorTrack', (0, _system.darken)(palette.error.main, 0.5));
      setColor(palette.Slider, 'infoTrack', (0, _system.darken)(palette.info.main, 0.5));
      setColor(palette.Slider, 'successTrack', (0, _system.darken)(palette.success.main, 0.5));
      setColor(palette.Slider, 'warningTrack', (0, _system.darken)(palette.warning.main, 0.5));
      const snackbarContentBackground = (0, _system.emphasize)(palette.background.default, 0.98);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(palette.SnackbarContent, 'color', darkPalette.getContrastText(snackbarContentBackground));
      setColor(palette.SpeedDialAction, 'fabHoverBg', (0, _system.emphasize)(palette.background.paper, 0.15));
      setColor(palette.StepConnector, 'border', getCssVar('palette-grey-600'));
      setColor(palette.StepContent, 'border', getCssVar('palette-grey-600'));
      setColor(palette.Switch, 'defaultColor', getCssVar('palette-grey-300'));
      setColor(palette.Switch, 'defaultDisabledColor', getCssVar('palette-grey-600'));
      setColor(palette.Switch, 'primaryDisabledColor', (0, _system.darken)(palette.primary.main, 0.55));
      setColor(palette.Switch, 'secondaryDisabledColor', (0, _system.darken)(palette.secondary.main, 0.55));
      setColor(palette.Switch, 'errorDisabledColor', (0, _system.darken)(palette.error.main, 0.55));
      setColor(palette.Switch, 'infoDisabledColor', (0, _system.darken)(palette.info.main, 0.55));
      setColor(palette.Switch, 'successDisabledColor', (0, _system.darken)(palette.success.main, 0.55));
      setColor(palette.Switch, 'warningDisabledColor', (0, _system.darken)(palette.warning.main, 0.55));
      setColor(palette.TableCell, 'border', (0, _system.darken)((0, _system.alpha)(palette.divider, 1), 0.68));
      setColor(palette.Tooltip, 'bg', (0, _system.alpha)(palette.grey[700], 0.92));
    }

    palette.common.backgroundChannel = (0, _system.colorChannel)(palette.common.background);
    palette.common.onBackgroundChannel = (0, _system.colorChannel)(palette.common.onBackground);
    palette.dividerChannel = (0, _system.colorChannel)(palette.divider);
    Object.keys(palette).forEach(color => {
      const colors = palette[color]; // Color palettes: primary, secondary, error, info, success, and warning

      if (colors.main) {
        palette[color].mainChannel = (0, _system.colorChannel)(colors.main);
      }

      if (colors.light) {
        palette[color].lightChannel = (0, _system.colorChannel)(colors.light);
      }

      if (colors.dark) {
        palette[color].darkChannel = (0, _system.colorChannel)(colors.dark);
      }

      if (colors.contrastText) {
        palette[color].contrastTextChannel = (0, _system.colorChannel)(colors.contrastText);
      } // Text colors: text.primary, text.secondary


      if (colors.primary) {
        palette[color].primaryChannel = (0, _system.colorChannel)(colors.primary);
      }

      if (colors.secondary) {
        palette[color].secondaryChannel = (0, _system.colorChannel)(colors.secondary);
      } // Action colors: action.active, action.selected


      if (colors.active) {
        palette[color].activeChannel = (0, _system.colorChannel)(colors.active);
      }

      if (colors.selected) {
        palette[color].selectedChannel = (0, _system.colorChannel)(colors.selected);
      }
    });
  });
  theme = args.reduce((acc, argument) => (0, _utils.deepmerge)(acc, argument), theme);
  return theme;
}