module.exports = {
  core: {
    builder: 'webpack5',
  },
  "stories": [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|png)',
    // '../src/**/*.stories.js',
    // '../src/**/*.stories.(ts|js|mdx)'
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react"
}