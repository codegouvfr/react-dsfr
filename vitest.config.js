import { defineConfig } from "vitest/config";

export default defineConfig({
    "test": {
        // ref: https://vitest.dev/config/
        "include": ["test/behavior/index.ts"],
        "watch": false,
        "outputFile": "./vitest-report.json",
        "testTimeout": 43600
    }
});
