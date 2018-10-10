let path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: './index.ts',
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
      cwd: process.cwd(),
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },{
        test: /\.worker\.(j|t)s$/,
        use: {
          loader: 'worker-loader',
          options: {
            inline: true
          }
        }
      }
    ]
  }
};