#!/usr/bin/env node

const [, , commandName, ...args] = process.argv;

(async () => {
    switch (commandName) {
        case "include-used-icons":
            {
                const { main } = await import("./only-include-used-icons");

                await main(args);
            }
            break;
        case "copy-to-public":
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
