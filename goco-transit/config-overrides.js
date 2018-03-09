var paths = require('react-scripts-ts/config/paths')

/**
 * This file is necessary for modifying the project's config file
 * (which is usually hidden by create react app)
 * to allow the project to use regular javascript as well as typescript
 * 
 * @param {*} config 
 */
module.exports = function override(config) {
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
      babelrc: false,
      presets: [require.resolve('babel-preset-react-app')],
      cacheDirectory: true,
    },
  })

  return config
}