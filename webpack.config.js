let path = require('path');

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  }
};
