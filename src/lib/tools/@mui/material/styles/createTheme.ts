
import type { Theme as SystemTheme } from '@mui/system';
import type { Transitions } from '@mui/material/styles/createTransitions';
import type { ZIndex } from '@mui/material/styles/zIndex';
import type { Components } from '@mui/material/styles/components';

import type { Mixins } from "./createMixins";
import type { Palette } from "./createPalette";
import type { Shadows } from './shadows';
import type { Typography } from './createTypography';

export interface BaseTheme extends SystemTheme {
    mixins: Mixins;
    palette: Palette;
    shadows: Shadows;
    transitions: Transitions;
    typography: Typography;
    zIndex: ZIndex;
    unstable_strictMode?: boolean;
}

export interface Theme extends BaseTheme {
    components?: Components<BaseTheme>;
}