// import { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
// function getAbsolutePath(value) {
//   return dirname(require.resolve(join(value, "package.json")));
// }

/** @type { import('@storybook/vue-vite').StorybookConfig } */
const config = {
  stories: [
    '../../../packages/mirinae/src/feedbacks/alert/**/*.stories.mdx',
    // '../../../packages/mirinae/src/**/*.stories.mdx',
    '../../../packages/mirinae/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-postcss',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/vue-vite',
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
