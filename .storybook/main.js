module.exports = {
    "stories": [
        "../test/stories/**/*.stories.mdx",
        "../test/stories/**/*.stories.@(ts|tsx)",
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-dark-mode",
    ],
    "core": {
        "builder": "webpack5",
    },
    "staticDirs": [
        "./static"
    ],
};
