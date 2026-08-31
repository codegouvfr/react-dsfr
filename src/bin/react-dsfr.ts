#!/usr/bin/env node

const [, , commandName, ...args] = process.argv;

(async () => {
    switch (commandName) {
        case "optimize-css":
            {
                const { main: updateIcons } = await import("./only-include-used-icons");

                await updateIcons(args);

                const { main: onlyIncludeCssOfUsedComponents } = await import(
                    "./only-include-css-of-used-components"
                );

                await onlyIncludeCssOfUsedComponents(args);
            }
            break;
        case "update-icons":
            {
                const { main } = await import("./only-include-used-icons");

                await main(args);
            }
            break;
        case "copy-static-assets":
            {
                const { main } = await import("./copy-dsfr-to-public");

                await main(args);
            }
            break;
        default:
            console.error(`Unknown command ${commandName}`);
            process.exit(-1);
    }
})();
