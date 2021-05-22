const postcssPresetEnv = require('postcss-preset-env');
// const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 2,
      features: {
        'nesting-rules': true,
        'focus-within-pseudo-class': false
      },
    }),
    require('autoprefixer'),
  ],
};