/*
NOTE: We can't import between src/lib and src/bin
so when we copy declaration values we make sure they stay in sync here
*/

import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type {
    data_fr_theme as data_fr_theme_lib,
    ColorScheme as ColorScheme_lib
} from "../../lib/useColorScheme";
import type {
    data_fr_theme as data_fr_theme_bin,
    ColorScheme as ColorScheme_bin
} from "../../bin/css_to_ts/colorOptions";

assert<Equals<typeof data_fr_theme_bin, typeof data_fr_theme_lib>>();
assert<Equals<ColorScheme_lib, ColorScheme_bin>>();
