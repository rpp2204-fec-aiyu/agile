const path = require('path')

module.exports = {
<<<<<<< HEAD:webpack.config.js
  mode: 'production',
=======
>>>>>>> 744a293a5c050b997140c1db4641257141d93bf3:webpack.common.js
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname + '/client/dist'),
    filename: 'bundle.js'
  },
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