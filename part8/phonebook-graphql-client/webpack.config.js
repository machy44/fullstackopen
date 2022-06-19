const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      // css loader loads css files
      // style loader Inject CSS into the DOM
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: { static: path.resolve(__dirname, 'build'), compress: true, port: 3000 },
  devtool: 'source-map'
};
module.exports = config;
