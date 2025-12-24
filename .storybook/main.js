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
        "@storybook/addon-essentials",
        "storybook-dark-mode",
        "@storybook/addon-a11y",
        "@storybook/addon-mdx-gfm",
        "@storybook/addon-webpack5-compiler-swc"
    ],

    "staticDirs": ["../dist", "./static"],

    docs: {
        autodocs: true
    }
};
