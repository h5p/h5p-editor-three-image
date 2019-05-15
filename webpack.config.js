var path = require('path');
var webpack = require('webpack');

var config = {
  entry: {
    dist: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'editor-three-image.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader',
      },
      {
        test:/\.(s*)css$/,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  return config;
}
