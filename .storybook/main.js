module.exports = {
    "stories": [
        "../stories/*.stories.mdx",
        "../stories/*.stories.@(ts|tsx)",
        "../stories/blocks/*.stories.@(ts|tsx)",
        "../stories/charts/*.stories.@(ts|tsx)",
		"../stories/picto/*.stories.@(ts|tsx)",
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-dark-mode",
        "@storybook/addon-a11y"
    ],
    "core": {
        "builder": "webpack5"
    },
    "staticDirs": ["../dist", "./static"]
};
