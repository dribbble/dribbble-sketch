require('dotenv').config()
const WebpackDefinePlugin = require('webpack').DefinePlugin
const prodMode = process.env.NODE_ENV === 'production'

module.exports = config => {
  config.resolve.extensions = ['.js', '.jsx']

  if (process.env.NODE_ENV === 'development') {
    config.devtool = 'source-map'
  }

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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      API_CLIENT_KEY: JSON.stringify(!prodMode
        ? process.env.API_CLIENT_KEY
        : '62deac8a106c866b6047c864a24cdab7f0d03b6330e0099bfeda45eac6a1b8b5'
      ),
      DOMAIN_NAME: JSON.stringify(!prodMode
        ? process.env.DOMAIN_NAME
        : 'dribbble.com'
      ),
      STAGING_AUTH: JSON.stringify(!prodMode
        ? process.env.STAGING_AUTH
        : null
      )
    })
  )
}
