module.exports = {
    "framework": {
        name: "@storybook/nextjs",
        options: {}
    },

    "stories": [
        "../stories/*.mdx",
        "../stories/*.stories.@(ts|tsx)",
        "../stories/blocks/*.stories.@(ts|tsx)",
        "../stories/charts/*.stories.@(ts|tsx)",
        "../stories/picto/*.stories.@(ts|tsx)"
    ],

    "addons": [
        "@storybook/addon-links",
        "storybook-dark-mode",
        "@storybook/addon-a11y",
        "@storybook/addon-webpack5-compiler-swc",
        "@storybook/addon-docs"
    ],

    "staticDirs": ["../dist", "./static"]
};
