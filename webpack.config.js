const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname + '/client/dist'),
    filename: 'bundle.js'

  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /.js$|.css$/,
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  }

}