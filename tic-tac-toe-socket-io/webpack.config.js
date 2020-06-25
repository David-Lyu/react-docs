  
require('dotenv/config');
const webpack = require('webpack');
const path = require('path');

const clientPath = path.join(__dirname, 'client/');
const publicPath = path.join(__dirname, 'server/public/');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({ 'process.env.GOOGLE_MAP': JSON.stringify(process.env.GOOGLE_MAP) })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: clientPath,
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map'
}