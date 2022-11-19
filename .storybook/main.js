module.exports = {
    "stories": [
        "../docs/*.stories.mdx",
        "../docs/*.stories.@(ts|tsx)",
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
