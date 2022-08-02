var path = require('path');
const nodeEnv = process.env.NODE_ENV || 'development';
const libraryName = process.env.npm_package_name;

module.exports = {
  mode: nodeEnv,
  context: path.resolve(__dirname, 'src'),
  entry: {
    dist: './app.js'
  },
  devtool: (nodeEnv === 'development') ? 'inline-source-map' : undefined,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${libraryName}.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test:/\.(s*)css$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    ]
  }
};
