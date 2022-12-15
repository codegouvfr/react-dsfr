import { createComponentI18nApi } from "../../src/lib/i18n";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

const { useTranslation, addSomeDsfrComponentTranslations } = createComponentI18nApi({
    "componentName": "SomeDsfrComponent",
    "frMessages": {
        /* spell-checker: disable */

        "do something": ({ what }: { what: string }) => `Faire ${what}`,
        "the good": "le bien",
        "bar": "bar"
        /* spell-checker: enable */
    }
});

addSomeDsfrComponentTranslations({
    "lang": "en",
    "messages": {
        "do something": ({ what }) => {
            assert<Equals<typeof what, string>>();
            return `Do ${what}`;
        },
        "the good": "the good"
    }
});

const { t } = useTranslation();

t("do something", { "what": t("the good") });
