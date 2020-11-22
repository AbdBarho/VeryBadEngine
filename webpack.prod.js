const Webpack = require('webpack');
const { resolve } = require('path');
const { inlineSource } = require('inline-source');
const { writeFileSync } = require('fs');
const { sync: mkdirpSync } = require('mkdirp')

const devConfig = require('./webpack.dev.js');

/**@type {Webpack.Configuration} */
module.exports = {
  ...devConfig,
  context: resolve(__dirname),
  devtool: false,
  watch: false,
  mode: 'production',
  plugins: [{
    apply: function (compiler) {
      compiler.hooks.done.tap('Inline source', async function () {
        const html = await inlineSource(resolve('./index.html'), { compress: true });
        mkdirpSync('./build');
        writeFileSync('./build/index.html', html, { encoding: 'utf8' });
        console.log('source has been inlined');
      })
    }
  }]

}
