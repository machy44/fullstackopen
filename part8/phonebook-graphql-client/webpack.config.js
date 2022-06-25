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
          // @preset-react -> compiles react code into ES5 code
          // @babel/core -> transform to target env (ES6 to ES5 for example)
          // @babel/preset-env ->which syntax transforms(and optionally, browser polyfills) are needed
          // by your target envs. You can setup what browsers to support
          // @babel/preset-typescript -> typescript compiler is capable of transpiling your code
          // but it is not as flexible, powerful and complete as Babel
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      // css-loader loads css files
      // style-loader Inject CSS into the DOM
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: { static: path.resolve(__dirname, 'build'), compress: true, port: 3000 },
  devtool: 'source-map'
};
module.exports = config;
