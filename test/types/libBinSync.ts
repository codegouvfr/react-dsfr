/*
NOTE: We can't import between src/lib and src/bin
so when we copy declaration values we make sure they stay in sync here
*/
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { ColorScheme as ColorScheme_lib } from "../../src/useIsDark";
import type { ColorScheme as ColorScheme_bin } from "../../src/scripts/build/cssToTs/colorOptions";

assert<Equals<ColorScheme_lib, ColorScheme_bin>>();
