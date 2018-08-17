const WebpackDefinePlugin = require('webpack').DefinePlugin

module.exports = config => {
  config.resolve.extensions = ['.js', '.jsx']

  config.module.rules.push({
    test: /\.(png|jpg|gif)$/,
    exclude: /node_modules/,
    loader: 'file-loader'
  })

  config.module.rules.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  })

  config.plugins.push(
    new WebpackDefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  )
}
