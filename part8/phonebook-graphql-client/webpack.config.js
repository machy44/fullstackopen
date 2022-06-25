const path = require('path');

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  resolve: {
    // Enable webpack find ts and tsx files without an extension
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // css-loader loads css files
      // style-loader Inject CSS into the DOM
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  devServer: { static: path.resolve(__dirname, 'build'), compress: true, port: 3000 },
  devtool: 'source-map',
};
module.exports = config;
